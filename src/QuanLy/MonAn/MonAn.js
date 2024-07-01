const tbody = document.querySelector('tbody')

var i = 0;
FOOD.map(food => {
  i++
  tbody.innerHTML += `<tr>
              <td>${i}</td>
              <td>F00${food.id}</td>
              <td>${food.nameFood}</td>
              <td>${food.type}</td>
              <td>${food.price}</td>
              <td><i class="fa-solid fa-image " onclick="showImageFood(${food.id})"></i></td>
              <td><i class="fa-solid fa-pen-to-square"></i></td>
              <td><i class="fa-solid fa-trash-can" onclick="deleteFood(${food.id})"></i></td>
            </tr>`

})