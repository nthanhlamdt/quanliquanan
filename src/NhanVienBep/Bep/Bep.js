// const KITCHEN_API = "http://localhost:3000/kitchen"
const TABLE_API = "http://localhost:3000/table"
const FOOD_API = "http://localhost:3000/food"
const ORDER_API = "http://localhost:3000/order"

const kitchenItem = async (kitchen) => {
  const listOrder = document.querySelector('.list-order')
  listOrder.innerHTML = ''
  const foodResponse = await fetch(FOOD_API);
  const foods = await foodResponse.json();

  const orderElement = document.createElement("li");
  const tableSpan = document.createElement("span");
  tableSpan.classList.add("name-order");
  tableSpan.textContent = `${kitchen.nameTable}`;
  const foodListUl = document.createElement("ul");
  foodListUl.classList.add("list-food");
  if (kitchen.foods_before.length !== 0) {
    kitchen.foods_before.map(element => {
      if (element != null) {
        const foodItem = document.createElement("li");
        const nameFood = foods.find((f) => {
          return element.id_food === f.id
        })
        foodItem.innerHTML =
          `<span class="name-food">${element.quantity}x K${element.id_food} -<span> </span>${nameFood.nameFood}</span>
          <span class="quantity-food" onclick="deliverFood('${kitchen.id}', '${element.id_food}', '${kitchen.type}')">${element.quantity}giao</span>`;
        foodListUl.appendChild(foodItem);
      }
    });
  }

  // Tạo phần tử div chứa nút và danh sách món đã giao
  const deliveredFoodDiv = document.createElement("div");
  deliveredFoodDiv.classList.add("delivered-food");
  const deliveredSpan = document.createElement("span");
  deliveredSpan.textContent = "Món đã giao";

  // Tạo phần tử i cho biểu tượng caret
  const caretIcon = document.createElement("i");
  caretIcon.classList.add("fa-solid", "fa-caret-down");
  caretIcon.onclick = function () {
    ClickIconUpDown(caretIcon);
  };

  const deliveredFoodUl = document.createElement("ul");
  deliveredFoodUl.classList.add("list-delivered-food", "hide");

  if (kitchen.foods_after.length !== 0) {
    kitchen.foods_after.map(e => {
      
      const deliveredFoodItem = document.createElement("li");
      const nameFood = foods.find((food) => {
        return e.id_food == food.id
      })

      if (nameFood !== undefined) {
        deliveredFoodItem.textContent = `${e.quantity}x K${e.id_food} - ${nameFood.nameFood}`;
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
}

const getTableData = async () => {
  const tableResponse = await fetch(TABLE_API);
  const tables = await tableResponse.json();

  const orderResponse = await fetch(ORDER_API);
  const orders = await orderResponse.json();
  
  const kitchens = [
    ...orders.map(order => ({ ...order, type: "order" })),
    ...tables.map(table => ({ ...table, type: "table" }))
  ];

  const sortedKitchens = kitchens.sort((a, b) => {
    if (a.time_create === 0) return -1;
    if (b.time_create === 0) return 1;
    return a.time_create - b.time_create;
  });

  if (sortedKitchens.length !== 0) {
    sortedKitchens.map(kitchen => {
      if (kitchen.foods_before.length > 0 || kitchen.foods_after.length > 0) {
        kitchenItem(kitchen)
      }
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

getTableData()

const quantityFood = document.querySelector('.quantity-food')
const deliverFood = async (idKitchen, idFood, type) => {
  const tableResponse = await fetch(TABLE_API);
  const tables = await tableResponse.json();

  const orderResponse = await fetch(ORDER_API);
  const orders = await orderResponse.json();
  
  var getKitchen
  if (type == 'table') {
    // Tìm đơn hàng trong kitchen
    getKitchen = tables.find((table) => table.id == idKitchen);
  }
  else {
    getKitchen = orders.find((order) => order.id == idKitchen);
  }
  
  
  // Tìm món ăn trong foods_before
  const foodIndex = getKitchen.foods_before.findIndex(food => food.id_food == idFood);
  if (foodIndex === -1) {
    console.error("Không tìm thấy món ăn trong danh sách chờ");
    return;
  }

  // Lấy thông tin món ăn
  let foodItem = getKitchen.foods_before[foodIndex];

  // Nếu còn 1 phần -> Xóa khỏi foods_before và chuyển sang foods_after
  if (foodItem.quantity === 1) {
    getKitchen.foods_before.splice(foodIndex, 1);
  } else {
    foodItem.quantity--;
  }

  // Kiểm tra xem món đã từng được giao chưa
  const deliveredFoodIndex =getKitchen.foods_after.findIndex(f => f.id_food == idFood);
  if (deliveredFoodIndex !== -1) {
    // Nếu đã có trong foods_after, tăng số lượng lên 1
   getKitchen.foods_after[deliveredFoodIndex].quantity++;
  } else {
    // Nếu chưa có, thêm vào foods_after
   getKitchen.foods_after.push({ id_food: idFood, quantity: 1 });
  }

  if (type === 'table') {
    await updateKitchenDelivered (getKitchen, idKitchen, TABLE_API);
  }
  else {
    await updateKitchenDelivered (getKitchen, idKitchen, ORDER_API);
  }
}
