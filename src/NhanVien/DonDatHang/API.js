function updateGoodsDataOnServer(updatedGoods) {
  fetch(GOODS_API + '/' + updatedGoods.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedGoods)
  })
    .then((response) => response.json())
    .then((data) => console.log('Dữ liệu đã được cập nhật trên server:', data))
    .catch((error) => console.error('Đã xảy ra lỗi:', error));
}

function deleteGoodsDataOnServer(updatedGoods) {
  fetch(GOODS_API + '/' + updatedGoods.id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedGoods)
  })
    .then((response) => response.json())
    .then((data) => console.log('Dữ liệu đã được cập nhật trên server:', data))
    .catch((error) => console.error('Đã xảy ra lỗi:', error));
}

function addGoodsDataOnServer(updatedGoods) {
  fetch(GOODS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedGoods)
  })
    .then((response) => response.json())
    .then((data) => console.log('Dữ liệu đã được cập nhật trên server:', data))
    .catch((error) => console.error('Đã xảy ra lỗi:', error));
}