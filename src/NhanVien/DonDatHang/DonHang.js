const ORDER_API = "http://localhost:3000/order";

const getOrder = async () => {
  try {
    const orderResponse = await fetch(ORDER_API);
    const orders = await orderResponse.json();

    const contentMainOrder = document.querySelector(".content-main");

    if (orders.length > 0) {
      let htmlContent = ""; // Tạo một chuỗi HTML

      orders.forEach(order => {
        if (order.status) {
          htmlContent += `
          <div class="table table-empty" onclick="handleSelectOrder('${order.id}')">
            <i class="fa-solid fa-bell-concierge"></i>
            <span>${order.nameTable}</span>
          </div>`;
        }
      });

      contentMainOrder.innerHTML += htmlContent; // Chỉ cập nhật DOM một lần
    }
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error);
  }
};

getOrder()

// Hàm xử lý click
const handleSelectOrder = (orderId) => {
  window.location.href = "/src/NhanVien/HoaDon"
  localStorage.setItem("id_table", JSON.stringify({id: orderId, type: "order"}))
};

// Xử lý tạo đơn mới
document.addEventListener("click", async (event) => {
  // Xử lý click trên nút tạo đơn mới
  if (event.target.closest(".create-bill")) {
    const orderResponse = await fetch(ORDER_API);
    const orders = await orderResponse.json();
    const idNewOrder = generateUniqueID()

    createOrder({
      id: idNewOrder,
      nameTable: `Đơn #${(filterOrderByToday(orders).length+1).toString().padStart(3, "0")}`,
      status: false,
      foods_before: [],
      foods_after: [],
      quantitative: [],
      time_create: Date.now(),
      time_update: 0,
      success: false
    })
    localStorage.setItem("id_table", JSON.stringify({id: idNewOrder, type: "order"}))
    window.location.href = "/src/NhanVien/HoaDon";
  }
});


// Hàm đếm đơn hàng hiện tại trong ngày
function filterOrderByToday(orders) {
  return orders.filter(order => {
    const inputDate = new Date(order.time_create);
    const currentDate = new Date();

    return (
      inputDate.getFullYear() === currentDate.getFullYear() &&
      inputDate.getMonth() === currentDate.getMonth() &&
      inputDate.getDate() === currentDate.getDate() &&
      order.success == true
    );
  });
}

