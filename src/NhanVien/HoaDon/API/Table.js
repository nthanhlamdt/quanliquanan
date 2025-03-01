const TABLE_API = 'http://localhost:3000/table';

const updateTable = async (tableId, tableData) => {
  await fetch(TABLE_API+ '/' + tableId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tableData)
  })
    .then((response) => response.json())
    .then((data) => console.log('Dữ liệu đã được cập nhật trên server:', data))
    .catch((error) => console.error('Đã xảy ra lỗi:', error));
}