const buttonLogin = document.querySelector('.button-login');
const username = document.querySelector('.username');
const password = document.querySelector('.password');

function login(account) {
  const user = account.find((acc) => {
    return acc.email === username.value && acc.password === password.value
  });
  console.log(user)
  if (user != undefined) {
    window.location.href = '/NhanVien/DonHang/index.html';
  }

  else if (username.value === '' && password.value === '') {

    alert('Vui lòng nhập email và password');

  } else if (username.value === '') {
    alert('Vui lòng nhập email!!');
  } else if (password.value === '') {
    alert('Vui lòng nhập password!!');
  } else {
    alert('Tài Khoản hoặc mật khẩu không chính xác')
  }
}

const ACCOUNT_API = 'http://localhost:3000/account'
function getDataAccount(callback) {
  return fetch(ACCOUNT_API)
    .then(response => response.json())
    .then(callback)
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}

function startAccount() {
  getDataAccount((account) => {
    buttonLogin.addEventListener('click', () => {
      login(account)
    })
  })
}

startAccount()

