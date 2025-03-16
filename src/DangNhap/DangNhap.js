const buttonLogin = document.querySelector('.button-login')
const username = document.querySelector('.username')
const password = document.querySelector('.password')
const usernameError = document.getElementById('username-error')
const passwordError = document.getElementById('password-error')

const ACCOUNT_API = 'http://localhost:3000/account'
const STAFF_API = 'http://localhost:3000/staff'

// Thực hiện khi click button Đăng Nhập
async function login() {
  usernameError.textContent = ''
  passwordError.textContent = ''

  try {
    // Gọi API lấy danh sách tài khoản
    const accounts = await fetch(ACCOUNT_API)
      .then(response => response.json())
      .catch(error => console.error('Có lỗi xảy ra:', error))

    // Tìm user trong danh sách account
    const account = accounts.find(acc => acc.email === username.value && acc.password === password.value)

    if (account) {
      localStorage.setItem('user', JSON.stringify(account))
      
      // Điều hướng dựa trên chức vụ
      if (account.ChucVu === 'Quản Lí') {
        window.location.href = '/src/QuanLy/BaoCaoThongKe/BaoCao.html'
      } else if (account.ChucVu === 'Nhân Viên Bếp') {
        window.location.href = '/src/NhanVienBep/Bep/index.html'
      } else {
        window.location.href = '/src/NhanVien/Ban/index.html'
      }

      alert('Đăng nhập thành công!')
      alert('Chào mừng ' + account.HoTen + ' đến với hệ thống quản lý cửa hàng!')
    } else {
      // Xử lý lỗi nhập sai
      if (!username.value && !password.value) {
        alert('Vui lòng nhập đầy đủ thông tin!')
      } else if (!username.value) {
        alert('Vui lòng nhập email!')
      } else if (!password.value) {
        alert('Vui lòng nhập mật khẩu!')
      } else {
        // Kiểm tra xem email có tồn tại không
        if (accounts.some(acc => acc.email === username.value)) {
          passwordError.textContent = 'Mật khẩu không chính xác!'
        } else {
          alert('Email không tồn tại!')
        }
      }
    }
  } catch (error) {
    console.error('Có lỗi xảy ra:', error)
  }
}

// Bắt sự kiện click nút đăng nhập
buttonLogin.addEventListener('click', login)

// Bắt sự kiện nhấn Enter trong input
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    buttonLogin.click()
  }
}

username.addEventListener('keypress', handleKeyPress)
password.addEventListener('keypress', handleKeyPress)

document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"))
  if (user) {
    if (user.ChucVu === "Nhân Viên Phục Vụ") window.location.href = "/src/NhanVien/Ban/index.html";
    else if(user.ChucVu === "Nhân Viên Bếp") window.location.href = "/src/NhanVien/NhanVienBep/index.html"; 
    else window.location.href = "/src/QuanLy/BaoCaoThongKe/BaoCao.html"; 
  }
});

