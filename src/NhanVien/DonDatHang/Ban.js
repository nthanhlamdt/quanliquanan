const contentMain = document.querySelector('.content-main');

function checkStatusGoods() {
  GOODS.map(element => {
    if (element.food.length !== 0 && element.status !== true) {
      element.status = true;
      updateGoodsDataOnServer(element);
    } else if (element.food.length === 0 && element.status !== false) {
      element.status = false;
      updateGoodsDataOnServer(element);
    }
  });
}

function getGoodsData() {
  contentMain.innerHTML = ''; // Xóa nội dung hiện tại của contentMain trước khi thêm mới
  const goodsDiv0 = document.createElement('div');
  goodsDiv0.className = 'create-bill table table-empty';
  goodsDiv0.textContent = '+'
  goodsDiv0.setAttribute('onclick', 'addBill()');
  contentMain.appendChild(goodsDiv0)
  GOODS.map(goods => {
    const goodsDiv = document.createElement('div');
    goodsDiv.className = goods.status ? 'table table-using' : 'table table-empty';
    goodsDiv.setAttribute('onclick', `searchIdGoods('${goods.id}')`);

    const goodsNameSpan = document.createElement('span');
    goodsNameSpan.className = 'table-number';
    goodsNameSpan.textContent = goods.nameTable;
    goodsDiv.appendChild(goodsNameSpan);

    const hr = document.createElement('hr');
    goodsDiv.appendChild(hr);

    const goodsStatusSpan = document.createElement('span');
    goodsStatusSpan.className = 'table-status';
    goodsStatusSpan.textContent = goods.time_start;
    goodsDiv.appendChild(goodsStatusSpan);

    contentMain.appendChild(goodsDiv);
  });
}

const tableList = document.querySelector('.table-list');
const order = document.querySelector('.order');

function searchIdGoods(id) {

  var goodsBefore = GOODS.find(item => {
    return item.id == id;
  });

  var jsonGoodsInit = JSON.stringify(goodsBefore);
  localStorage.setItem('GOODS_INIT', jsonGoodsInit);

  var jsonIdGoodsPersen = JSON.stringify({ getId: id });
  localStorage.setItem('idGoodsPersen', jsonIdGoodsPersen);
  tableList.classList.add('hide');
  order.classList.remove('hide');
  setBill();
  localStorage.setItem('GOODS_AFTER', jsonGoodsInit);
}

function startGoods() {
  getGoodsData();
}

startGoods();

// Hàm kiểm tra xem mảng sau có thêm phần tử mới hay không
function objectsAreEqual(obj1, obj2) {
  // Chuyển đối tượng JSON thành chuỗi để so sánh
  let str1 = JSON.stringify(obj1);
  let str2 = JSON.stringify(obj2);
  // So sánh chuỗi kết quả
  return str1 === str2;
}
