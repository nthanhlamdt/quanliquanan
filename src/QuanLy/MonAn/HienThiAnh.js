const showImage = document.querySelector('.show-image')

function showImageFood(id) {
  const foodImage = FOOD.find((f) => f.id == id);

  if (foodImage) {
    showImage.classList.remove('hide');
    showImage.innerHTML = ''
    const img = document.createElement('img');
    img.src = foodImage.illustration;
    img.alt = 'No image uploaded';
    showImage.appendChild(img);

    const i = document.createElement('i')
    i.className = "fa-solid fa-xmark"
    i.setAttribute('onclick', 'closeImageFood()');

    showImage.appendChild(i);
  }
}

function closeImageFood() {
  showImage.classList.add('hide');
}