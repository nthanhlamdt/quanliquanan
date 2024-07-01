const tbody = document.querySelector('tbody')

var i = 0;
STAFF.map(staff => {
  i++
  tbody.innerHTML += `<tr>
              <td>${i}</td>
              <td>${staff.id}</td>
              <td>${staff.HoTen}</td>
              <td>${staff.GioiTinh}</td>
              <td>${staff.Email}</td>
              <td>${staff.SoDienThoai}</td>
              <td>${staff.ChucVu}</td>
              <td><i class="fa-solid fa-pen-to-square"></i></td>
              <td><i class="fa-solid fa-trash-can"></i></td>
            </tr>`

})