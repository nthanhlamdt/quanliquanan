const tbody = document.querySelector('tbody')
var i = 0;
ACCOUNT.map(account => {
  const staff = STAFF.find((st) => {
    return st.id === account.id_staff
  })
  i++
  tbody.innerHTML += `<tr>
              <td>${i}</td>
              <td>F${account.id}</td>
              <td>${account.email}</td>
              <td>${account.password}</td>
              <td>${staff.ChucVu === 'Quản Lí' ? 'Quản Lí' : 'Nhân Viên'}</td>
              <td><i class="fa-solid fa-trash-can"></i></td>
            </tr>`

})