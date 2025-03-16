const createOrder = async(orderData) => {
  await fetch(ORDER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
    .then((response) => response.json())
    .then((data) => console.log('Dữ liệu đã được cập nhật trên server:', data))
    .catch((error) => console.error('Đã xảy ra lỗi:', error));
}

const deleteOrder = async (orderId) => {
  await fetch(ORDER_API + '/' + orderId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json())
    .then((data) => console.log('Dữ liệu đã được cập nhật trên server:', data))
    .catch((error) => console.error('Đã xảy ra lỗi:', error));
}