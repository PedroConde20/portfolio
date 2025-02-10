let currentIndex = 0;
const rows = document.querySelectorAll('.row');
const totalRows = rows.length;

function changeCarousel() {
  currentIndex = (currentIndex + 1) % totalRows;
  const newTransformValue = -currentIndex * 100;
  document.querySelector('.carousel-container').style.transform = `translateX(${newTransformValue}%)`;
}

setInterval(changeCarousel, 3000);

window.onload = () => {
  document.querySelector('.carousel-container').style.transform = 'translateX(0)';
};
