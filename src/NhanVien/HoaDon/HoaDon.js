const TYPE_FOOD_API = 'http://localhost:3000/typeFood';
const FOOD_API = 'http://localhost:3000/food';

// Lấy danh sách loại món ăn
async function getTypeFoodData() {
  const typeFoodResponse = await fetch(TYPE_FOOD_API)
  const typeFood = await typeFoodResponse.json()

  const style = "background-color: rgb(68, 68, 160); color: white; cursor: pointer;"
  const unStyle = "backround-color: white; cursor: pointer; margin: 0 5px"

  const menuItem = document.querySelector('.bill-menu');
  menuItem.innerHTML = '';
  typeFood.map((type, index) => {
    const item = document.createElement('li');
    item.textContent = type.nameType;
    item.style = index == 0 ? style : unStyle;
    menuItem.appendChild(item);
  })

  showFood(typeFood[0].id)

  const menuItemLi = document.querySelectorAll('.bill-menu li')
  menuItemLi.forEach((item, index) => {
    item.addEventListener('click', () => {
      showFood(typeFood[index].id);

      menuItemLi.forEach((e) => {
        e.style = e === item ? style : unStyle;
      });
    });
  });
}

getTypeFoodData()

// Hiển thị danh sách món ăn lên menu
async function showFood(typeFoodId) {
  const foodResponse = await fetch(FOOD_API)
  const foods = await foodResponse.json()
  const typeFoodArray = foods.filter((e) => e.type === typeFoodId);

  const menuList = document.querySelector('.bill-menu_list');
  menuList.innerHTML = ''; // Clear the menu list

  typeFoodArray.forEach((e) => {
    const listItem = document.createElement('li');
    listItem.className = 'bill-menu_iteam';

    listItem.setAttribute('onclick', `addFoodToBill('${e.id}')`);

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

// Hiển thị Hóa đơn của bàn
async function setBill(getTable) {
  const foodResponse = await fetch(FOOD_API)
  const foods = await foodResponse.json()

  const billPayItems = document.querySelector('.bill-pay_items')
  billPayItems.innerHTML = ''; // Xóa nội dung hiện tại

  var sumTotal = 0;
  getTable.food.map((e) => {
    const foodUse = foods.find((element) => {
      return e.id_food == element.id
    });
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

  const total = document.querySelector('.total')
  total.innerText = String(formatNumber(sumTotal));
}

async function setBillFirst() {
  const tableResponse = await fetch(TABLE_API);
  const tables = await tableResponse.json();

  const idTable = localStorage.getItem('id_table');
  const idTablePersen = JSON.parse(idTable);
  

  getTable = tables.find((t) => {
    return t.id == idTablePersen
  })

  setBill(getTable)
}
setBillFirst()

// Hàm thêm .000 vào số tiền
function formatNumber(number) {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '');
}

// function addFoodToBill(id) {
//   getBill.food.forEach((e) => {
//     if (e.id_food === id) {
//       e.quantity += 1;
//       check = false;
//     }
//   });

//   if (check) {
//     getBill.food.push({
//       id_food: id,
//       quantity: 1
//     });
//   }

//   setBill();
// }

async function reduceIncrease(foodId, calculation) {
  const tableResponse = await fetch(TABLE_API);
  const tables = await tableResponse.json();

  const idTable = localStorage.getItem('id_table');
  const idTablePersen = JSON.parse(idTable);
  
  getTable = tables.find((t) => {
    return t.id == idTablePersen
  })

  getTable.food.forEach((e) => {
    if (e.id_food === foodId) {
      if (calculation === 'reduce') {
        if (e.quantity > 1) {
          e.quantity -= 1
        }
        else {
          getTable.food = getTable.food.filter(function (item) {
            return item.id_food.localeCompare(foodId) !== 0;
          });
        }
      }
      else {
        e.quantity += 1
      }
    }
  })

  console.log(getTable)
  // updateTable(idTablePersen, getTable);
  setBill(getTable );
}





// const payEnd = document.querySelector('.pay-end')

// payEnd.addEventListener('click', () => {
//   getBill.food = []
//   TABLE.map((TB) => {
//     if (TB.id === idTablePersen.getId) {
//       TB = getBill
//     }
//   })
//   var KITCHEN = JSON.parse(localStorage.getItem('KITCHEN'))
//   KITCHEN = KITCHEN.filter(i => {
//     return i.table_id !== idTablePersen.getId
//   })
//   var jsonKitchen = JSON.stringify(KITCHEN)
//   localStorage.setItem('KITCHEN', jsonKitchen)
//   var TABLE_INIT = JSON.parse(localStorage.getItem('TABLE_INIT'))
//   var jsonTableAfter = JSON.stringify(TABLE_INIT)
//   localStorage.setItem('TABLE_AFTER', jsonTableAfter)
//   var jsonTable = JSON.stringify(TABLE)
//   localStorage.setItem('TABLE', jsonTable)
//   updateTableDataOnServer(getBill)
// })

// const saveButton = document.querySelector('.save-button')
// saveButton.addEventListener('click', () => {
//   TABLE.map((TB) => {
//     if (TB.id === idTablePersen.getId) {
//       TB = getBill
//     }
//   })
//   var jsonTable = JSON.stringify(TABLE)
//   localStorage.setItem('TABLE', jsonTable)

//   var table = JSON.parse(localStorage.getItem('TABLE'))
//   const tableAfter = table.find(t => {
//     return t.id == idTablePersen.getId
//   })

//   var jsonTableAfter = JSON.stringify(tableAfter)
//   localStorage.setItem('TABLE_AFTER', jsonTableAfter)

//   updateTableDataOnServer(getBill);
// })

// function startBill() {
//   getFoodData()
// }

// startBill()


