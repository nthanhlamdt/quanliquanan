var accountStaff = JSON.parse(localStorage.getItem('user'))
const headerInforName = document.querySelector('.header-infor_name')

headerInforName.textContent = accountStaff.HoTen

const headerInforAvataSpan = document.querySelector('.header-infor_avata span')
headerInforAvataSpan.textContent = charFirstName(accountStaff.HoTen).trim()
function charFirstName(name) {
  for (var i = name.length - 1; i >= 0; i--) {
    if (name[i] === ' ') {
      return name[i + 1]
    }
  }
}
const headerInforAvata = document.querySelector('.header-infor_avata')
const logOut = document.querySelector('.log-out')
headerInforAvata.addEventListener('click', () => {
  logOut.classList.toggle('hide')
})


const selectLogout = document.querySelector('.select-logout')

selectLogout.addEventListener('click', () => {
  localStorage.removeItem('user')
  alert('Đăng xuất thành công!')
  window.location.href = '/src/DangNhap/DangNhap.html';
})

const generateUniqueID = (length = 10) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

// Ẩn hiện menu
const openMenu = document.querySelector(".fa-bars")
const menu = document.querySelector(".menu")
openMenu.addEventListener('click', () => {
  menu.classList.toggle('menu-open')
})

// Xóa class khi màn hình rộng hơn 1026px
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1026) {
    menu.classList.remove("menu-open");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Kiểm tra nếu không có user, chuyển hướng về trang đăng nhập
  if (!user) {
    window.location.href = "/src/DangNhap/DangNhap.html";
    return;
  }
  else {
    if (user.ChucVu == 'Quản Lí' && !window.location.pathname.includes("/src/QuanLy/")) {
      window.location.href = "/src/QuanLy/BaoCaoThongKe/BaoCao.html";
    }
    else if (user.ChucVu == 'Nhân Viên Phục Vụ'
      && !window.location.pathname.includes("/src/NhanVien/")
    ) {
      window.location.href = "/src/NhanVien/Ban";
    }
    else if (
      user.ChucVu == 'Nhân Viên Bếp'
      && !window.location.pathname.includes("/src/NhanVienBep/")
      && !window.location.pathname.includes("/src/NhanVien/LichSuDon")
      && !window.location.pathname.includes("/src/NhanVien/ChamCong")
      && window.location.pathname.includes("/src/QuanLy/")
    ) {
      window.location.href = "/src/NhanVienBep/Bep";
    }
  }
})

// Hàm thêm .000 vào số tiền
function formatNumber(number) {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '');
}
