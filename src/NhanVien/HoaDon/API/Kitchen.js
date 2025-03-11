const KITCHEN_API = 'http://localhost:3000/table';

const createNewKitChen = async (kitchenData) => {
  await fetch(KITCHEN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {id: generateUniqueID(),...kitchenData}
  })
}