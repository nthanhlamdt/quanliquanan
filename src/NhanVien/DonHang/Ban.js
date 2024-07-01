const contentMain = document.querySelector('.content-main');


function updateTableDataOnServer(updatedTable) {
  fetch('http://localhost:3000/table/' + updatedTable.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedTable)
  })
    .then((response) => response.json())
    .then((data) => console.log('Dữ liệu đã được cập nhật trên server:', data))
    .catch((error) => console.error('Đã xảy ra lỗi:', error));
}

function checkStatusTable() {
  TABLE.map(element => {
    if (element.food.length !== 0 && element.status !== true) {
      element.status = true
      updateTableDataOnServer(element)
    }
    else if (element.food.length === 0 && element.status !== false) {
      element.status = false
      updateTableDataOnServer(element)
    }
  });
}

function getTableData() {
  contentMain.innerHTML = ''; // Xóa nội dung hiện tại của contentMain trước khi thêm mới
  TABLE.map(tb => {
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

const tableList = document.querySelector('.table-list');
const order = document.querySelector('.order');

function searchIdTable(id) {
  var tableBefor = TABLE.find(item => {
    return item.id == id
  })
  var jsonTableInit = JSON.stringify(tableBefor)
  localStorage.setItem('TABLE_INIT', jsonTableInit)

  var jsonIdTablePersen = JSON.stringify({ getId: id })
  localStorage.setItem('idTablePersen', jsonIdTablePersen)
  tableList.classList.add('hide');
  order.classList.remove('hide');
  setBill()

  localStorage.setItem('TABLE_AFTER', jsonTableInit)
}

function startTable() {
  checkStatusTable()
  getTableData()
}

startTable()


// Hàm kiểm tra xem mảng sau có thêm phần tử mới hay không
function objectsAreEqual(obj1, obj2) {
  // Chuyển đối tượng JSON thành chuỗi để so sánh
  let str1 = JSON.stringify(obj1);
  let str2 = JSON.stringify(obj2);
  // So sánh chuỗi kết quả
  return str1 === str2;
}
