function getKitchenData() {
  var KITCHEN = JSON.parse(localStorage.getItem('KITCHEN'))
  const listOrder = document.querySelector('.list-order')
  if (listOrder && KITCHEN.length !== 0) {
    listOrder.innerHTML = ''
    KITCHEN.forEach(kc => {

      // Tạo phần tử li đại diện cho đơn hàng
      const orderElement = document.createElement("li");

      // Tạo phần tử span chứa thông tin về bàn
      const tableSpan = document.createElement("span");
      tableSpan.classList.add("name-order");
      var nameTable
      nameTable = TABLE.find((tb) => {
        return kc.table_id === tb.id
      })

      if (!nameTable) {
        nameTable = GOODS.find((tb) => {
          return kc.table_id === tb.id
        })
      }
      
      tableSpan.textContent = `${nameTable.nameTable}`;

      // Tạo phần tử ul chứa danh sách món ăn chưa giao
      const foodListUl = document.createElement("ul");
      foodListUl.classList.add("list-food");

      // Tạo các phần tử li chứa thông tin món ăn chưa giao
      if (kc.foodBefor.length !== 0) {
        kc.foodBefor.forEach(element => {
          if (element != null) {
            const foodItem = document.createElement("li");
            const nameFood = FOOD.find((f) => {
              return element.id_food === f.id
            })
            foodItem.innerHTML =
              `<span class="name-food">${element.quantity}x K${element.id_food} -<span> </span>${nameFood.nameFood}</span>
          <span class="quantity-food" onclick="deliverFood('${kc.table_id}', '${element.id_food}')">${element.quantity} giao</span>`;
            foodListUl.appendChild(foodItem);
          }
        });
      }

      // Tạo phần tử div chứa nút và danh sách món đã giao
      const deliveredFoodDiv = document.createElement("div");
      deliveredFoodDiv.classList.add("delivered-food");

      // Tạo phần tử span hiển thị thông báo "Món đã giao"
      const deliveredSpan = document.createElement("span");
      deliveredSpan.textContent = "Món đã giao";

      // Tạo phần tử i cho biểu tượng caret
      const caretIcon = document.createElement("i");
      caretIcon.classList.add("fa-solid", "fa-caret-down");
      caretIcon.onclick = function () {
        ClickIconUpDown(caretIcon);
      };
      // Tạo ul chứa danh sách món đã giao
      const deliveredFoodUl = document.createElement("ul");
      deliveredFoodUl.classList.add("list-delivered-food", "hide");


      if (kc.foodAfter.length !== 0) {
        kc.foodAfter.forEach(element => {
          const deliveredFoodItem = document.createElement("li");
          const nameF = FOOD.find((f) => {
            return element.id_food == f.id
          })
          if (nameF !== undefined) {
            deliveredFoodItem.textContent = `${element.quantity}x K${element.id_food} - ${nameF.nameFood}`;
            deliveredFoodUl.appendChild(deliveredFoodItem);
          }
        });
      }


      // Thêm các phần tử vào phần tử div chứa danh sách món đã giao
      deliveredFoodDiv.appendChild(deliveredSpan);
      deliveredFoodDiv.appendChild(caretIcon);


      // Thêm các phần tử vào phần tử li đại diện cho đơn hàng
      orderElement.appendChild(tableSpan);
      orderElement.appendChild(foodListUl);
      orderElement.appendChild(deliveredFoodDiv);
      orderElement.appendChild(deliveredFoodUl);

      // Thêm phần tử li đại diện cho đơn hàng vào vị trí mong muốn trong DOM
      listOrder.appendChild(orderElement);
    })
  }
}

function ClickIconUpDown(icon) {
  var listItem = icon.closest('li');
  var listDeliveredFood = listItem.querySelector('.list-delivered-food');
  icon.classList.toggle('fa-caret-up')
  icon.classList.toggle('fa-caret-down')
  listDeliveredFood.classList.toggle('hide')
}

function startKitchen() {
  // getDataKitchenFromTable()
  getKitchenData()
}

startKitchen()


const quantityFood = document.querySelector('.quantity-food')
function deliverFood(idTable, idFood) {
  console.log(idFood)
  data = JSON.parse(localStorage.getItem('KITCHEN'))
  const dataGetIdTable = data.find((e) => {
    return e.table_id == idTable
  })
  const getFoodApter = dataGetIdTable.foodBefor.find((f) => {
    return f.id_food == idFood
  })

  if (dataGetIdTable.foodAfter) {
    const checkFoodApter = dataGetIdTable.foodAfter.find((f) => {
      return f.id_food === getFoodApter.id_food
    })
    if (checkFoodApter) {
      checkFoodApter.quantity += 1
    }
    else {
      dataGetIdTable.foodAfter.push({ id_food: getFoodApter.id_food, quantity: 1 })
    }
  }
  else {
    dataGetIdTable.foodAfter.push({ id_food: getFoodApter.id_food, quantity: 1 })
  }



  if (getFoodApter.quantity > 1) {
    getFoodApter.quantity -= 1
  }
  else {
    data = data.map((item) => {
      if (item.table_id === dataGetIdTable.table_id) {
        item.foodBefor = item.foodBefor.filter((i) => {
          return i.id_food !== getFoodApter.id_food;
        });
      }
      return item;
    });
  }
  var jsonKitchen = JSON.stringify(data)
  localStorage.setItem('KITCHEN', jsonKitchen)
  startKitchen()
}