const FOOD_API = 'http://localhost:3000/food';
const TABLE_API = 'http://localhost:3000/table';
const KITCHEN_API = 'http://localhost:3000/kitchen';

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  }
}

async function startTable() {
  try {
    const table = await fetchData(TABLE_API);
    if (table) {
      const food = await fetchData(FOOD_API);
      if (food) {
        getFoodData(food, table);
        checkStatusTable(table);
      }
    }
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
  }
}

function checkStatusTable(table) {
  table.forEach(element => {
    const needsUpdate = (element.food.length !== 0 && !element.status) || (element.food.length === 0 && element.status);
    if (needsUpdate) {
      element.status = element.food.length !== 0;
      updateTableDataOnServer(element);
    }
  });
}

async function updateTableDataOnServer(updatedTable) {
  try {
    const response = await fetch(`${TABLE_API}/${updatedTable.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTable)
    });
    if (!response.ok) {
      throw new Error('Failed to update table data on server');
    }
    console.log('Dữ liệu đã được cập nhật trên server:', await response.json());
  } catch (error) {
    console.error('Đã xảy ra lỗi khi cập nhật:', error);
  }
}

startTable();

