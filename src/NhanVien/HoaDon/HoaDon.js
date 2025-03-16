const TYPE_FOOD_API = 'http://localhost:3000/typeFood';
const FOOD_API = 'http://localhost:3000/food';
const ORDER_API = 'http://localhost:3000/order';
const TABLE_API = 'http://localhost:3000/table';

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

// Hàm cộng dồn số lượng món ăn vào object
const getTotalFoods = (foods_before, foods_after) => {
  const totalFoods = {}; // Tạo object mới để reset mỗi lần gọi hàm

  const addToTotal = (foods) => {
    foods.forEach(item => {
      if (totalFoods[item.id_food]) {
        totalFoods[item.id_food] += item.quantity;
      } else {
        totalFoods[item.id_food] = item.quantity;
      }
    });
  };

  // Gộp số lượng từ cả 2 danh sách
  addToTotal(foods_before);
  addToTotal(foods_after);

  // Chuyển object về dạng mảng [{id_food, quantity}]
  return Object.entries(totalFoods).map(([id_food, quantity]) => ({
    id_food,
    quantity
  }));
};


let sumTotal = 0;
// Hiển thị Hóa đơn của bàn
async function setBill(getTable) {
  const foodResponse = await fetch(FOOD_API);
  const foods = await foodResponse.json();

  const billPayItems = document.querySelector('.bill-pay_items');
  billPayItems.innerHTML = ''; // Xóa nội dung hiện tại

  // Lấy danh sách món ăn đã gộp tổng số lượng
  const mergedFoods = getTotalFoods(getTable.foods_before, getTable.foods_after);

  mergedFoods.forEach((e) => {
    const foodUse = foods.find((element) => element.id === e.id_food);

    if (foodUse) {
      // Tạo phần tử DOM mới
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

  // Cập nhật tổng tiền
  const total = document.querySelector('.total');
  total.innerText = formatNumber(sumTotal);
}


async function setBillFirst() {
  const tableResponse = await fetch(TABLE_API);
  const tables = await tableResponse.json();

  localStorage.removeItem('cached_table');

  const orderResponse = await fetch(ORDER_API);
  const orders = await orderResponse.json();

  const objectID = JSON.parse(localStorage.getItem('id_table'))
  
  if (objectID.type == 'table') {
    getTable = tables.find(table => {
      return table.id == objectID.id
    })
    setBill(getTable)
  }
  else {
    getOrder = orders.find(order => {
      return order.id == objectID.id
    })
    setBill(getOrder)
  }
}
setBillFirst()

// Cộng hoặc trừ món ăn trong bill
async function reduceIncrease(foodId, calculation) {
  const objectID = JSON.parse(localStorage.getItem('id_table'))
  
  const cachedTable = localStorage.getItem('cached_table');
  if (cachedTable) {
    getTable = JSON.parse(cachedTable);
  } else if(objectID.type == 'table'){
    const tableResponse = await fetch(TABLE_API);
    const tables = await tableResponse.json();
    getTable = tables.find(table => table.id == objectID.id);
  } else {
    const orderResponse = await fetch(ORDER_API);
    const orders = await orderResponse.json();
    getOrder = orders.find(order => order.id == objectID.id);
  }

  getTable.foods_before.forEach((e) => {
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

  localStorage.setItem("cached_table", JSON.stringify(getTable))
  // updateTable(idTable, getTable);
  setBill(getTable );
}

// Click nút Lưu để lưu dữ liệu
const saveButton = document.querySelector('.save-button')
saveButton.addEventListener('click', () => {
  const objectID = JSON.parse(localStorage.getItem('id_table'))

  if (objectID.type == 'table') {
    const cachedTable = localStorage.getItem('cached_table');
    if (cachedTable) {
      const getTable = JSON.parse(cachedTable);
      const dataTable = {
        ...getTable,
        "time_create": getTable.time_create != 0 ? getTable.time_create : Date.now(),
      }
      updateData(objectID.id, dataTable, TABLE_API);
    }
    window.location.href = "/src/NhanVien/Ban"
  }
  else {
    const cachedTable = localStorage.getItem('cached_table');
    if (cachedTable) {
      const getTable = JSON.parse(cachedTable);
      const checkFood = getTable.foods_after.length > 0 || getTable.foods_before.length > 0
      const dataOrder = {
        ...getTable,
        "time_create": getTable.time_create != 0 ? getTable.time_create : Date.now(),
        "status": checkFood,
        "success": checkFood
      }
      
      updateData(objectID.id, dataOrder, ORDER_API);
    }
    window.location.href = "/src/NhanVien/DonDatHang"
  }
})

// Thêm món ăn vào bill
async function addFoodToBill(id) {
  const objectID = JSON.parse(localStorage.getItem('id_table'))
  var getTable = {}
  const cachedTable = localStorage.getItem('cached_table');

  if (objectID.type == 'table') {
    if (cachedTable) {
      getTable = JSON.parse(cachedTable);
    } else {
      const tableResponse = await fetch(TABLE_API);
      const tables = await tableResponse.json();
      getTable = tables.find(table => table.id == objectID.id);
    }
  }
  else {
    var getTable = {}
    const cachedTable = localStorage.getItem('cached_table');
    if (cachedTable) {
      getTable = JSON.parse(cachedTable);
    } else {
      const orderResponse = await fetch(ORDER_API);
      const orders = await orderResponse.json();
      getTable = orders.find(order => order.id == objectID.id);
    }
  }

   var check = false
    getTable.foods_before.map((e) => {
      if (e.id_food === id) {
        e.quantity += 1;
        check = true;
      }
    });

    if (!check) {
      getTable.foods_before.push({
        id_food: id,
        quantity: 1
      });
    }
    localStorage.setItem("cached_table", JSON.stringify(getTable))
    setBill(getTable);
}

// Xử lý nút thanh toán
const payEnd = document.querySelector('.pay-end')
payEnd.addEventListener('click', async () => {
  const objectID = JSON.parse(localStorage.getItem('id_table'))
  const cachedTable = localStorage.getItem('cached_table');

  const date = new Date()
  if (cachedTable) {
    getTable = JSON.parse(cachedTable);
    localStorage.removeItem('cached_table');
  }
  else {
    if (objectID.type == 'table') {
      const tableResponse = await fetch(TABLE_API);
      const tables = await tableResponse.json();
      getTable = tables.find(table => table.id == objectID.id);
      createHistory({
        "id": generateUniqueID,
        "time_start": getTable.time_create,
        "time_end": Date.now(),
        "total": sumTotal,
        "type": "table",
        "id_type": getTable.id
      })
      getTable.foods_before = [];
      getTable.foods_after = [];
      getTable.time_create = 0;
      updateData(objectID.id, getTable, TABLE_API);
      window.location.href = "/src/NhanVien/Ban"
    }
    else {
      const orderResponse = await fetch(ORDER_API);
      const orders = await orderResponse.json();
      getOrder = orders.find(order => order.id == objectID.id);
      createHistory({
        "id": generateUniqueID,
        "time_start": getOrder.time_create,
        "time_end": Date.now(),
        "total": sumTotal,
        "type": "order",
        "id_type": getOrder.id
      })
      getOrder.foods_before = [];
      getOrder.foods_after = [];
      getOrder.time_create = 0;
      getOrder.status = false
      
      updateData(objectID.id, getOrder, ORDER_API);
      window.location.href = "/src/NhanVien/DonDatHang"
    }
  }
})

// Xử lý navbar select css
const navbar = document.querySelectorAll('.menu nav li');
const objectID = JSON.parse(localStorage.getItem('id_table'))
if (objectID.type == 'table') {
  navbar[0].style = 'background-color: rgb(68, 68, 160);'
  const aElement = navbar[0].querySelector("a");
  aElement.style = 'color: white;'
}
else {
  navbar[1].style = 'background-color: rgb(68, 68, 160);'
  const aElement = navbar[1].querySelector("a");
  aElement.style = 'color: white;'
}
