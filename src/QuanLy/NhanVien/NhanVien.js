const ACCOUNT_API = 'http://localhost:3000/account'

const getStaff = async () => {
  const tbody = document.querySelector('tbody')
  const accountResponse = await fetch(ACCOUNT_API);
  const accounts = await accountResponse.json();
  var i = 0;
  accounts.map(account => {
    i++
    tbody.innerHTML += `<tr>
                <td>${i}</td>
                <td>${account.id}</td>
                <td>${account.HoTen}</td>
                <td>${account.GioiTinh}</td>
                <td>${account.email}</td>
                <td>${account.SoDienThoai}</td>
                <td>${account.ChucVu}</td>
                <td><i class="fa-solid fa-pen-to-square"></i></td>
                <td><i class="fa-solid fa-trash-can"></i></td>
              </tr>`

  })
}

getStaff()