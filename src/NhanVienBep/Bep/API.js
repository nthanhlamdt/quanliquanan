const updateKitchenDelivered = async (kitchenData, idKitchen, API) =>
  await fetch(`${API}/${idKitchen}`, {
    method: "PATCH", // Dùng PATCH thay vì PUT để cập nhật 1 phần dữ liệu
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      foods_before: kitchenData.foods_before,
      foods_after: kitchenData.foods_after
    })
  });