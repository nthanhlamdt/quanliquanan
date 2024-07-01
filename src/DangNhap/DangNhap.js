const buttonLogin = document.querySelector('.button-login');
const username = document.querySelector('.username');
const password = document.querySelector('.password');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');

function login(account, staff) {
  // Clear previous error messages
  usernameError.textContent = '';
  passwordError.textContent = '';

  const user = account.find((acc) => acc.email === username.value && acc.password === password.value);

  if (user) {
    const typeStaff = staff.find((sf) => sf.id === user.id_staff);
    const jsonIdStaff = JSON.stringify(typeStaff);
    localStorage.setItem('StaffId', jsonIdStaff);

    if (typeStaff.ChucVu === 'Quản Lí') {
      window.location.href = '/src/QuanLy/BaoCaoThongKe/BaoCao.html';
    } else {
      window.location.href = '/src/NhanVien/DonHang/index.html';
    }
  } else {
    if (!username.value && !password.value) {
      usernameError.textContent = 'Vui lòng nhập email!';
      passwordError.textContent = 'Vui lòng nhập mật khẩu!';
    } else if (!username.value) {
      usernameError.textContent = 'Vui lòng nhập email!';
    } else if (!password.value) {
      passwordError.textContent = 'Vui lòng nhập mật khẩu!';
    } else {
      if (account.some((acc) => acc.email === username.value)) {
        passwordError.textContent = 'Mật khẩu không chính xác!';
      } else {
        usernameError.textContent = 'Email không tồn tại!';
      }
    }
  }
}

buttonLogin.addEventListener('click', () => {
  login(ACCOUNT, STAFF);
});

const loginButton = document.querySelector('.button-login');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Function to handle the Enter key press event
    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        // Trigger the click event of the login button
        loginButton.click();
      }
    }

    // Add event listeners to input fields
    usernameInput.addEventListener('keypress', handleKeyPress);
    passwordInput.addEventListener('keypress', handleKeyPress);