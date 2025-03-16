const HISTORY_API = 'http://localhost:3000/history'
const createHistory = async (historyData) => {
  await fetch(HISTORY_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(historyData)
  })
    .then((response) => response.json())
    .then((data) => console.log('Dữ liệu đã được cập nhật trên server:', data))
    .catch((error) => console.error('Đã xảy ra lỗi:', error));
}