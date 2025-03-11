const tbody = document.querySelector('tbody')
var i = 1;
WAREHOUSE.map(kho => {
  tbody.innerHTML += `<tr>
              <td>${i++}</td>
              <td>${kho.MaHang}</td>
              <td>${kho.TenHang}</td>
              <td>${kho.DonViTinh}</td>
              <td>${kho.TonKho}</td>
                <td>${kho.NgayNhap}</td>
                <td>${kho.NCC}</td>
              <td><i class="fa-solid fa-pen-to-square"></i></td>
              <td><i class="fa-solid fa-trash-can"></i></td>
            </tr>`
})