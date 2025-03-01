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