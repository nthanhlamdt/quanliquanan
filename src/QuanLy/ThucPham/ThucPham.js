const tbody = document.querySelector('tbody')
var i = 1;
INGREDIENTS.map(thucPham => {
  tbody.innerHTML += `<tr>
              <td>${i++}</td>
              <td>${thucPham.MaThucPham}</td>
              <td>${thucPham.TenThucPham}</td>
              <td>${thucPham.DonViTinh}</td>
              <td>${thucPham.TonKho}</td>
                <td>${thucPham.NgayNhap}</td>
                <td>${thucPham.NCC}</td>
              <td><i class="fa-solid fa-pen-to-square"></i></td>
              <td><i class="fa-solid fa-trash-can"></i></td>
            </tr>`
})