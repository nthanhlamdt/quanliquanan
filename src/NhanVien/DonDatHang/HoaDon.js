const menuList = document.querySelector('.bill-menu_list');
const billPayItems = document.querySelector('.bill-pay_items')
const total = document.querySelector('.total')

const style = "background-color: rgb(68, 68, 160); color: white;"
const unStyle = "backround-color: white;"
var idGoodsPersen
var getBill
const newDate = new Date()
var idPastGoods = JSON.parse(localStorage.getItem('idPastGood'))
console.log(idPastGoods)
if (idPastGoods.dayPresent != newDate.getDay() || idPastGoods.monthPresent != newDate.getMonth()) {
  var idPastGoods = { id: TABLE.length + GOODS.length + 1, dayPresent: newDate.getDay(), monthPresent: newDate.getMonth() }
  var jsonidPastGoods = JSON.stringify(idPastGoods);
  localStorage.setItem('idPastGood', jsonidPastGoods);
}


function padToThreeDigits(number) {
  let numStr = number.toString();
  while (numStr.length < 3) {
    numStr = '0' + numStr;
  }
  return numStr;
}

function addBill() {
  var idPastGoods = JSON.parse(localStorage.getItem('idPastGood'))
  const date = new Date()
  getBill = {
    id: `${idPastGoods.id}`,
    nameTable: `Đơn #${padToThreeDigits(parseInt(idPastGoods.id) - TABLE.length)}`,
    time_start: `${date.getHours()}:${date.getMinutes()}`,
    food: [],
    quantitative: []
  }

  tableList.classList.add('hide');
  order.classList.remove('hide');
  var jsonIdGoodsPersen = JSON.stringify({ getId: getBill.id});
  localStorage.setItem('idGoodsPersen', jsonIdGoodsPersen);
  setBill()
  console.log(getBill)
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
  if (getBill) {
    getBill.food.forEach((e) => {
    if (e.id_food === id) {
      e.quantity += 1;
      check = false;
    }
    });
  }

  if (check) {
    getBill.food.push({
      id_food: id,
      quantity: 1
    });
  }
  
  setBill();
}

function setBill() {
  
  billPayItems.innerHTML = ''; // Xóa nội dung hiện tại
  var sumTotal = 0;
  var idPastGoods = JSON.parse(localStorage.getItem('idPastGood'))
  idGoodsPersen = JSON.parse(localStorage.getItem('idGoodsPersen'))
  if (idGoodsPersen.getId < idPastGoods.id) {
    getBill = GOODS.find((t) => {
      return t.id == idGoodsPersen.getId
    })
  }
  
  if (getBill) {
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

  }
  total.innerText = String(formatNumber(sumTotal));

}

function formatNumber(number) {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '');
}

const payEnd = document.querySelector('.pay-end')

payEnd.addEventListener('click', () => {
  var KITCHEN = JSON.parse(localStorage.getItem('KITCHEN'))
  KitchenFind = KITCHEN.filter(i => {
    return i.table_id != idGoodsPersen.getId
  })
  var jsonKitchen = JSON.stringify(KitchenFind)
  localStorage.setItem('KITCHEN', jsonKitchen)
  var GOODS_INIT = JSON.parse(localStorage.getItem('GOODS_INIT'))
  var jsonGoodsAfter = JSON.stringify(GOODS_INIT)
  localStorage.setItem('GOODS_AFTER', jsonGoodsAfter)
  var GOODS = JSON.parse(localStorage.getItem('GOODS'))
  var goodsFind = GOODS.filter(i => {
    return i.id != idGoodsPersen.getId
  })
  var jsonGoods = JSON.stringify(goodsFind)
  localStorage.setItem('GOODS', jsonGoods)
  console.log(getBill)
  // deleteGoodsDataOnServer(getBill)
})

const saveButton = document.querySelector('.save-button')
saveButton.addEventListener('click', () => {
  var idPastGoods = JSON.parse(localStorage.getItem('idPastGood'))
  const checkGoodsCreate = GOODS.find((g) => {
    return g.id == idGoodsPersen.getId
  })

  if (checkGoodsCreate) {
    GOODS.map((TB) => {
      if (TB.id === idGoodsPersen.getId) {
        TB = getBill
      }
    })
  }

  else {
    GOODS.push(getBill)
  }
  var jsonGoods = JSON.stringify(GOODS)
  localStorage.setItem('GOODS', jsonGoods)

  var goods = JSON.parse(localStorage.getItem('GOODS'))
  var goodsAfter = getBill
  
  goodsAfter = goods.find(t => {
    return t.id == idGoodsPersen.getId
  })

  var jsonGoodsAfter = JSON.stringify(goodsAfter)
  localStorage.setItem('GOODS_AFTER', jsonGoodsAfter)

  if (idGoodsPersen.getId < idPastGoods.id) {
    updateGoodsDataOnServer(getBill);
  }
  else {
    var idPastGoods = { id: idPastGoods.id + 1, dayPresent: newDate.getDay(), monthPresent: newDate.getMonth() }
    var jsonidPastGoods = JSON.stringify(idPastGoods);
    localStorage.setItem('idPastGood', jsonidPastGoods);
    addGoodsDataOnServer(getBill)
  }
  
})

function startBill() {
  getFoodData()
}

startBill()
