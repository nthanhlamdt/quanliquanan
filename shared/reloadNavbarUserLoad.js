document.addEventListener("DOMContentLoaded", function () {
  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Kiểm tra nếu không có user, chuyển hướng về trang đăng nhập
  if (!user) {
    window.location.href = "/src/DangNhap/DangNhap.html";
    return;
  }

  // Lấy phần tử menu
  let menuContainer = document.querySelector(".menu");

  // Kiểm tra nếu trang hiện tại là Lịch sử đơn
  let TrangLichSuDon = window.location.pathname.includes("/src/NhanVien/LichSuDon/");
  let TrangChamCong = window.location.pathname.includes("/src/NhanVien/ChamCong/");
  // Cập nhật menu theo chức vụ
  if (user.ChucVu === "Nhân Viên Bếp") {
    menuContainer.innerHTML = `
      <nav>
        <li>
          <a href="/src/NhanVienBep/Bep">
            <i class="fa-solid fa-kitchen-set"></i>
            Bếp
          </a>
        </li>
        <li>
          <a href="/src/NhanVienBep/Kho">
            <i class="fa-solid fa-boxes-stacked"></i>
            Kho
          </a>
        </li>
        <li style="background-color: ${TrangLichSuDon ? 'rgb(68, 68, 160)' : 'transparent'};">
          <a style="color: ${TrangLichSuDon ? 'white' : 'rgb(68, 68, 160)'};" href="/src/NhanVien/LichSuDon">
            <i class="fa-solid fa-clock-rotate-left"></i>
            Lịch sử đơn
          </a>
        </li>
        <li style="background-color: ${TrangChamCong ? 'rgb(68, 68, 160)' : 'transparent'};">
          <a style="color: ${TrangChamCong ? 'white' : 'rgb(68, 68, 160)'};" href="/src/NhanVien/ChamCong/">
            <i class="fa-solid fa-money-check-dollar"></i>
            Chấm công
          </a>
        </li>
      </nav>
    `;
  } else if (user.ChucVu === "Nhân Viên Phục Vụ") {
    menuContainer.innerHTML = `
      <nav>
        <li>
          <a href="/src/NhanVien/Ban">
            <i class="fa-solid fa-table"></i>
            Bàn
          </a>
        </li>
        <li>
          <a href="/src/NhanVien/DonDatHang">
            <i class="fa-solid fa-bag-shopping"></i>
            Đơn hàng
          </a>
        </li>
        <li style="background-color: ${TrangLichSuDon ? 'rgb(68, 68, 160)' : 'transparent'};">
          <a style="color: ${TrangLichSuDon ? 'white' : 'rgb(68, 68, 160)'};" href="/src/NhanVien/LichSuDon">
            <i class="fa-solid fa-clock-rotate-left"></i>
            Lịch sử đơn
          </a>
        </li>
        <li style="background-color: ${TrangChamCong ? 'rgb(68, 68, 160)' : 'transparent'};">
          <a style="color: ${TrangChamCong ? 'white' : 'rgb(68, 68, 160)'};" href="/src/NhanVien/ChamCong/">
            <i class="fa-solid fa-money-check-dollar"></i>
            Chấm công
          </a>
        </li>
      </nav>
    `;
  }
});
