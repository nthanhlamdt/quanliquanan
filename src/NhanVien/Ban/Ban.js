const TABLE_API = 'http://localhost:3000/table';

const contentMain = document.querySelector('.content-main');

const tableList = document.querySelector('.table-list');
const order = document.querySelector('.order');

// Hàm lấy dữ liệu danh sách bàn
async function getTableData() {
  localStorage.removeItem("cached_table")
  const tableResponse = await fetch(TABLE_API);
  const tables = await tableResponse.json();

  contentMain.innerHTML = ''; // Xóa nội dung hiện tại của contentMain trước khi thêm mới
  tables.map(tb => {
    const tableDiv = document.createElement('div');
    tableDiv.className = tb.foods_before.length + tb.foods_after.length > 0  ? 'table table-using' : 'table table-empty';
    tableDiv.setAttribute('onclick', `searchIdTable('${tb.id}')`);

    const tableNameSpan = document.createElement('span');
    tableNameSpan.className = 'table-number';
    tableNameSpan.textContent = tb.nameTable;
    tableDiv.appendChild(tableNameSpan);

    const hr = document.createElement('hr');
    tableDiv.appendChild(hr);

    const tableStatusSpan = document.createElement('span');
    tableStatusSpan.className = 'table-status';
    tableStatusSpan.textContent = tb.foods_before.length + tb.foods_after.length > 0 ? 'Đang hoạt động' : 'Bàn Trống';
    tableDiv.appendChild(tableStatusSpan);

    contentMain.appendChild(tableDiv);
  });
}
getTableData()

// Hàm tìm kiếm bàn theo id
async function searchIdTable(id) {
  localStorage.setItem("id_table", id)
  window.location.href = "/src/NhanVien/HoaDon/index.html"
}
