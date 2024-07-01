const menuList = document.querySelector('.bill-menu_list');
const billPayItems = document.querySelector('.bill-pay_items')
const total = document.querySelector('.total')

const style = "background-color: rgb(68, 68, 160); color: white;"
const unStyle = "backround-color: white;"
var idTablePersen
var getBill

function getFoodData() {
  const typeFood = ["Ốc", "Lẩu", "Nướng", "Đồ Uống", "Combo"];
  showFood(typeFood, 0);

  const menuItem = document.querySelectorAll('.bill-menu li');
  menuItem.forEach((item, index) => {
    item.addEventListener('click', () => {
      showFood(typeFood, index);

      menuItem.forEach((e) => {
        e.style = e === item ? style : unStyle;
      });
    });
  });
}


function showFood(typeFood, index,) {
  const typeFoodArray = FOOD.filter((e) => e.type === typeFood[index]);
  menuList.innerHTML = ''; // Clear the menu list

  typeFoodArray.forEach((e) => {
    const listItem = document.createElement('li');
    listItem.className = 'bill-menu_iteam';

    listItem.setAttribute('onclick', `getIdFood('${e.id}')`);

    const img = document.createElement('img');
    img.src = e.illustration;
    img.alt = '';
    listItem.appendChild(img);

    const span = document.createElement('span');
    span.textContent = e.nameFood;
    listItem.appendChild(span);

    menuList.appendChild(listItem);
  });
}

function getIdFood(id) {
  var check = true
  getBill.food.forEach((e) => {
    if (e.id_food === id) {
      e.quantity += 1;
      check = false;
    }
  });

  if (check) {
    getBill.food.push({
      id_food: id,
      quantity: 1
    });
  }

  setBill();
}

function reduceIncrease(foodId, calculation) {
  getBill.food.forEach((e) => {
    if (e.id_food === foodId) {
      if (calculation === 'reduce') {
        if (e.quantity > 1) {
          e.quantity -= 1
        }
        else {
          getBill.food = getBill.food.filter(function (item) {
            return item.id_food.localeCompare(foodId) !== 0;
          });
        }
      }
      else {
        e.quantity += 1
      }
    }
  })
  setBill()
}


function setBill() {
  billPayItems.innerHTML = ''; // Xóa nội dung hiện tại
  var sumTotal = 0;
  idTablePersen = JSON.parse(localStorage.getItem('idTablePersen'))
  getBill = TABLE.find((t) => {
    return t.id === idTablePersen.getId
  })
  getBill.food.forEach((e) => {

    const foodUse = FOOD.find((element) => e.id_food === element.id);
    // Tạo các phần tử DOM mới
    if (foodUse) {
      const billItemDiv = document.createElement('div');
      billItemDiv.className = 'bill-item';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'name-food';
      nameSpan.textContent = foodUse.nameFood;
      billItemDiv.appendChild(nameSpan);

      const quantityDiv = document.createElement('div');
      quantityDiv.className = 'quantity';

      const reduceButton = document.createElement('button');
      reduceButton.onclick = () => reduceIncrease(e.id_food, 'reduce');
      reduceButton.className = 'reduce';
      reduceButton.textContent = '-';
      quantityDiv.appendChild(reduceButton);

      const quantitySpan = document.createElement('span');
      quantitySpan.textContent = e.quantity;
      quantityDiv.appendChild(quantitySpan);

      const increaseButton = document.createElement('button');
      increaseButton.onclick = () => reduceIncrease(e.id_food, 'increase');
      increaseButton.className = 'increase';
      increaseButton.textContent = '+';
      quantityDiv.appendChild(increaseButton);
      billItemDiv.appendChild(quantityDiv);

      const priceSpan = document.createElement('span');
      priceSpan.className = 'price';
      priceSpan.textContent = formatNumber(e.quantity * foodUse.price);
      billItemDiv.appendChild(priceSpan);

      billPayItems.appendChild(billItemDiv);
      sumTotal += e.quantity * foodUse.price;
    }
  });

  total.innerText = String(formatNumber(sumTotal));

}

function formatNumber(number) {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '');
}





const payEnd = document.querySelector('.pay-end')

payEnd.addEventListener('click', () => {
  getBill.food = []
  TABLE.map((TB) => {
    if (TB.id === idTablePersen.getId) {
      TB = getBill
    }
  })
  var KITCHEN = JSON.parse(localStorage.getItem('KITCHEN'))
  KITCHEN = KITCHEN.filter(i => {
    return i.table_id !== idTablePersen.getId
  })
  var jsonKitchen = JSON.stringify(KITCHEN)
  localStorage.setItem('KITCHEN', jsonKitchen)
  var TABLE_INIT = JSON.parse(localStorage.getItem('TABLE_INIT'))
  var jsonTableAfter = JSON.stringify(TABLE_INIT)
  localStorage.setItem('TABLE_AFTER', jsonTableAfter)
  var jsonTable = JSON.stringify(TABLE)
  localStorage.setItem('TABLE', jsonTable)
  updateTableDataOnServer(getBill)
})

const saveButton = document.querySelector('.save-button')
saveButton.addEventListener('click', () => {
  TABLE.map((TB) => {
    if (TB.id === idTablePersen.getId) {
      TB = getBill
    }
  })
  var jsonTable = JSON.stringify(TABLE)
  localStorage.setItem('TABLE', jsonTable)

  var table = JSON.parse(localStorage.getItem('TABLE'))
  const tableAfter = table.find(t => {
    return t.id == idTablePersen.getId
  })

  var jsonTableAfter = JSON.stringify(tableAfter)
  localStorage.setItem('TABLE_AFTER', jsonTableAfter)

  updateTableDataOnServer(getBill);
})


function startBill() {
  getFoodData()
}

startBill()


