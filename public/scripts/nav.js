const navBtn = document.getElementById('navBtn');
const menuDiv = document.getElementById('menuDiv');
// document.getElementById('menuBtn')

navBtn.addEventListener('click', () => {
  menuDiv.classList.toggle('hidden');
})