function deleteAllDataFromServer(kitchen_id) {
  fetch(FOOD_API + '/' + kitchen_id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Đã xảy ra lỗi khi xóa dữ liệu từ server.');
      }
      console.log('Tất cả dữ liệu đã được xóa khỏi server.');
    })
    .catch((error) => console.error('Đã xảy ra lỗi:', error));
}

function addAllDataFromServer(food) {
  fetch(FOOD_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(food)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Đã xảy ra lỗi khi xóa dữ liệu từ server.');
      }
      console.log('Tất cả dữ liệu đã được xóa khỏi server.');
    })
    .catch((error) => console.error('Đã xảy ra lỗi:', error));
}
