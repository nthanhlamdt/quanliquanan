const TABLE_API = 'http://localhost:3000/table';

const contentMain = document.querySelector('.content-main');

const tableList = document.querySelector('.table-list');
const order = document.querySelector('.order');

// function updateTableDataOnServer(updatedTable) {
//   fetch(TABLE_API + updatedTable.id, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(updatedTable)
//   })
//     .then((response) => response.json())
//     .then((data) => console.log('Dữ liệu đã được cập nhật trên server:', data))
//     .catch((error) => console.error('Đã xảy ra lỗi:', error));
// }

// function checkStatusTable() {
//   TABLE.map(element => {
//     if (element.food.length !== 0 && element.status !== true) {
//       element.status = true
//       updateTableDataOnServer(element)
//     }
//     else if (element.food.length === 0 && element.status !== false) {
//       element.status = false
//       updateTableDataOnServer(element)
//     }
//   });
// }

// Hàm lấy dữ liệu danh sách bàn
async function getTableData() {
  const tableResponse = await fetch(TABLE_API);
  const tables = await tableResponse.json();

  contentMain.innerHTML = ''; // Xóa nội dung hiện tại của contentMain trước khi thêm mới
  tables.map(tb => {
    const tableDiv = document.createElement('div');
    tableDiv.className = tb.status ? 'table table-using' : 'table table-empty';
    tableDiv.setAttribute('onclick', `searchIdTable('${tb.id}')`);

    const tableNameSpan = document.createElement('span');
    tableNameSpan.className = 'table-number';
    tableNameSpan.textContent = tb.nameTable;
    tableDiv.appendChild(tableNameSpan);

    const hr = document.createElement('hr');
    tableDiv.appendChild(hr);

    const tableStatusSpan = document.createElement('span');
    tableStatusSpan.className = 'table-status';
    tableStatusSpan.textContent = tb.status ? 'Đang hoạt động' : 'Bàn Trống';
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

// function startTable() {
//   checkStatusTable()
//   getTableData()
// }

// startTable()


// // Hàm kiểm tra xem mảng sau có thêm phần tử mới hay không
// function objectsAreEqual(obj1, obj2) {
//   // Chuyển đối tượng JSON thành chuỗi để so sánh
//   let str1 = JSON.stringify(obj1);
//   let str2 = JSON.stringify(obj2);
//   // So sánh chuỗi kết quả
//   return str1 === str2;
// }
