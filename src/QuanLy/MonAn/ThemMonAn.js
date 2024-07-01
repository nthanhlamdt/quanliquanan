const btnCreateFood = document.querySelector('.btn-create_food button')
const addStaff = document.querySelector('.add-food')
const closeBtn = document.querySelector('.add-food .fa-xmark')

btnCreateFood.addEventListener('click', () => {
  addStaff.classList.remove('hide')
})

closeBtn.addEventListener('click', () => {
  addStaff.classList.add('hide')
})


const nameFood = document.querySelector('.name-food')
const priceFood = document.querySelector('.price-food')
const typeFood = document.querySelector('.type-food select')
const inputFile = document.querySelector('.iput-file')
const addFoodBtn = document.querySelector('.add-food-btn')

addFoodBtn.addEventListener('click', () => {

  const fileField = document.querySelector('input[type="file"]').files[0];
  var imageDataUrl
  if (fileField) {
    const reader = new FileReader();

    reader.onload = (e) => {
      imageDataUrl = e.target.result;
      if (nameFood.value && typeFood.value && priceFood.value && imageDataUrl) {
        const foodJson =
        {
          nameFood: nameFood.value,
          type: typeFood.value,
          price: parseInt(priceFood.value),
          illustration: imageDataUrl.replace(/\s+/g, '')
        }
        addAllDataFromServer(foodJson)
      }
    };

    reader.readAsDataURL(fileField);
  } else {
    alert('Please select an image file.');
  }


})
