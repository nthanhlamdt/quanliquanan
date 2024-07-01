const GOODS_API = 'http://localhost:3000/goods'
const ACCOUNT_API = 'http://localhost:3000/account'
const STAFF_API = 'http://localhost:3000/staff'
const FOOD_API = 'http://localhost:3000/food'
const TABLE_API = 'http://localhost:3000/table'
const SALARY_API = 'http://localhost:3000/salary'
const INGREDIENTS_API = 'http://localhost:3000/ingredients'
const WAREHOUSE_API = 'http://localhost:3000/warehouse'

// GOODS
function getDataGoods(callback) {
  return fetch(GOODS_API)
    .then(response => response.json())
    .then(callback)
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}

function getDataAccount(callback) {
  return fetch(ACCOUNT_API)
    .then(response => response.json())
    .then(callback)
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}

function getDataStaff(callback) {
  return fetch(STAFF_API)
    .then(response => response.json())
    .then(callback)
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}

function getDataFood(callback) {
  return fetch(FOOD_API)
    .then(response => response.json())
    .then(callback)
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}

function getDataTable(callback) {
  return fetch(TABLE_API)
    .then(response => response.json())
    .then(callback)
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}

function getDataSalary(callback) {
  return fetch(SALARY_API)
    .then(response => response.json())
    .then(callback)
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}

function getDataIngredients(callback) {
  return fetch(INGREDIENTS_API)
    .then(response => response.json())
    .then(callback)
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}

function getDataWarehouse(callback) {
  return fetch(WAREHOUSE_API)
    .then(response => response.json())
    .then(callback)
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}



function startGetAccount() {
  getDataAccount((account) => {
    var jsonAccount = JSON.stringify(account)
    localStorage.setItem('ACCOUNT', jsonAccount)
  })
}

function startGetStaff() {
  getDataStaff((staff) => {
    var jsonStaff = JSON.stringify(staff)
    localStorage.setItem('STAFF', jsonStaff)
  })
}

function startGetFood() {
  getDataFood((food) => {
    var jsonFood = JSON.stringify(food)
    localStorage.setItem('FOOD', jsonFood)
  })
}

function startGetTable() {
  getDataTable((table) => {
    var jsonTable = JSON.stringify(table)
    localStorage.setItem('TABLE', jsonTable)
  })
}

function startGetSalary() {
  getDataSalary((salary) => {
    var jsonSalary = JSON.stringify(salary)
    localStorage.setItem('SALARY', jsonSalary)
  })
}

function startGetIngredients() {
  getDataIngredients((ingredients) => {
    var jsonIngredients = JSON.stringify(ingredients)
    localStorage.setItem('INGREDIENTS', jsonIngredients)
  })
}

function startGetWarehouse() {
  getDataWarehouse((warehouse) => {
    var jsonWarehouse = JSON.stringify(warehouse)
    localStorage.setItem('WAREHOUSE', jsonWarehouse)
  })
}

function startGetGoods() {
  getDataGoods((goods) => {
    var jsonGoods = JSON.stringify(goods)
    localStorage.setItem('GOODS', jsonGoods)
  })
}

startGetAccount()
startGetStaff()
startGetFood()
startGetTable()
startGetSalary()
startGetIngredients()
startGetWarehouse()
startGetGoods()

function checkStatusTable(table) {
  table.forEach(element => {
    if (element.food.length !== 0 && element.status !== true) {
      element.status = true
      updateTableDataOnServer(element)
    }
    else if (element.food.length === 0 && element.status !== false) {
      element.status = false
      updateTableDataOnServer(element)
    }
  });
}
