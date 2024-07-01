function deleteFood(id) {
  const FD = FOOD.find((f) => {
    return f.id == id
  })

  if (FD) {
    const food = FOOD.filter((f) => {
      return f.id != id
    })
    var jsonFood = JSON.stringify(food)
    localStorage.setItem('FOOD', jsonFood)
    deleteAllDataFromServer(id)
  }
}
