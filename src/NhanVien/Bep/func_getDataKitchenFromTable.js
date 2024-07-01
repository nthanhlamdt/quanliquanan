var data = []

function getDataKitchenFromTable() {
  var TABLE_AFTER = JSON.parse(localStorage.getItem('TABLE_AFTER'))
  var TABLE_INIT = JSON.parse(localStorage.getItem('TABLE_INIT'))
  var GOODS_AFTER = JSON.parse(localStorage.getItem('GOODS_AFTER'))
  var GOODS_INIT = JSON.parse(localStorage.getItem('GOODS_INIT'))
   const idTablePersen = JSON.parse(localStorage.getItem('idTablePersen'))
   const idGoodsPersen = JSON.parse(localStorage.getItem('idGoodsPersen'))
  // localStorage.removeItem('KITCHEN')
  // var jsonKitchen = JSON.stringify(data)
  // localStorage.setItem('KITCHEN', jsonKitchen)
  data = JSON.parse(localStorage.getItem('KITCHEN'))
  checkMoreKitchenFromBill(TABLE, TABLE_AFTER, TABLE_INIT, idTablePersen, 'TABLE_AFTER')
  checkMoreKitchenFromBill(GOODS, GOODS_AFTER, GOODS_INIT, idGoodsPersen, 'GOODS_AFTER')

  var jsonKitchen = JSON.stringify(data)
  localStorage.setItem('KITCHEN', jsonKitchen)
}

function checkMoreKitchenFromBill(TABLE, TABLE_AFTER, TABLE_INIT, idPersen, nameAFTER) {
  TABLE.map((t) => {
    if (t.food.length > 0) {
      var check = false
      if (data.length !== 0 && data !== null) {
        check = data.find((dt) => {
          return t.id === dt.table_id
        })
      }

      if (t.food.length > 0 && !check) {
        var dataKitchen = {
          table_id: t.id,
          foodBefor: t.food,
          foodAfter: []
        }
        data.push(dataKitchen)
        TABLE_AFTER = TABLE_INIT
        var jsonTableAfter = JSON.stringify(TABLE_AFTER)
        localStorage.setItem('TABLE_AFTER', jsonTableAfter)
      }

      else if (t.food.length > 0 && check != false) {
        if (!deepEqual(TABLE_AFTER, TABLE_INIT)) {
          const getChangeDataTable = getOtherDataTable(TABLE_INIT.food, TABLE_AFTER.food)
          data.map((item) => {
            if (item.table_id === idPersen.getId) {
              if (!getChangeDataTable.includes("underfile")) {
                getChangeDataTable.map((dt) => {
                  var check = true
                  if (item.foodBefor.length !== 0) {
                    item.foodBefor.map((i) => {
                      if (dt.id_food == i.id_food) {
                        i.quantity += dt.quantity
                        check = false
                        TABLE_AFTER = TABLE_INIT
                        var jsonTableAfter = JSON.stringify(TABLE_AFTER)
                        localStorage.setItem(nameAFTER, jsonTableAfter)
                      }
                    })
                    if (check) {
                      item.foodBefor.push(dt)
                    }
                  }
                })
              }
            }
            return item
          })
          TABLE_AFTER = TABLE_INIT
          var jsonTableAfter = JSON.stringify(TABLE_AFTER)
          localStorage.setItem(nameAFTER, jsonTableAfter)
        }
      }
    }
  })
}

function moreKitchenDataOnServer(updatedKitchen) {
  fetch(KITCHEN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedKitchen)
  })
    .then((response) => response.json())
    .then((data) => console.log('Dữ liệu đã được cập nhật trên server:', data))
    .catch((error) => console.error('Đã xảy ra lỗi:', error));
}

function deleteAllDataFromServer(kitchen_id) {
  fetch(KITCHEN_API + '/' + kitchen_id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Đã xảy ra lỗi khi xóa dữ liệu từ server.');
      }
      console.log('Tất cả dữ liệu đã được xóa khỏi server.');
    })
    .catch((error) => console.error('Đã xảy ra lỗi:', error));
}

function deepEqual(obj1, obj2) {
  // Kiểm tra kiểu dữ liệu của obj1 và obj2
  if (typeof obj1 !== typeof obj2) {
    return false;
  }
  if (typeof obj1 === 'object' && obj1 !== null && obj2 !== null) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (!deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  } else {
    return obj1 === obj2;
  }
}

function getOtherDataObject(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  var check = true
  if (obj1[keys1[0]] === obj2[keys2[0]]) {
    if (obj1[keys1[1]] !== obj2[keys2[1]]) {
      var kq = {
        [keys1[0]]: obj1[keys1[0]],
        [keys1[1]]: obj2[keys2[1]] - obj1[keys1[1]]
      };
      return kq
    }
  }
}


function getOtherDataTable(tableInitFood, tableAfterFood) {
  var OtherObject = []
  if (tableInitFood.length !== tableAfterFood.length) {
    let i = 0
    for (i; i < Math.min(tableInitFood.length, tableAfterFood.length); i++) {
      if (getOtherDataObject(tableInitFood[i], tableAfterFood[i])) {
        OtherObject.push(getOtherDataObject(tableInitFood[i], tableAfterFood[i]))
      }

    }

    for (i; i < Math.max(tableInitFood.length, tableAfterFood.length); i++) {
      OtherObject.push(tableAfterFood[i])
    }
  }
  else if (tableInitFood.length === tableAfterFood.length) {
    for (let i = 0; i < tableAfterFood.length; i++) {
      if (getOtherDataObject(tableInitFood[i], tableAfterFood[i])) {
        OtherObject.push(getOtherDataObject(tableInitFood[i], tableAfterFood[i]))
      }
    }
  }
  return OtherObject
}

getDataKitchenFromTable()




