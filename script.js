const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const cats = document.querySelectorAll('.cat');
const searchInput = document.getElementById('searchInput');
const shuffleBtn = document.getElementById('shuffleBtn');
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const closeLightbox = document.getElementById('closeLightbox');
const imageUpload = document.getElementById('imageUpload');
const photoTitle = document.getElementById('photoTitle');
const addPhotoBtn = document.getElementById('addPhotoBtn');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});

cats.forEach(btn => {
  btn.addEventListener('click', () => {
    cats.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.photo-card').forEach(card => {
      card.style.display =
        (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
    });
  });
});

searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();

  document.querySelectorAll('.photo-card').forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const category = card.dataset.category.toLowerCase();

    card.style.display =
      title.includes(value) || category.includes(value) ? 'block' : 'none';
  });
});

function attachCardEvents(card) {
  card.addEventListener('click', () => {
    const img = card.querySelector('img').src;
    const title = card.dataset.title;

    lightboxImg.src = img;
    lightboxTitle.textContent = title;
    lightbox.classList.add('active');
  });
}

document.querySelectorAll('.photo-card').forEach(attachCardEvents);

closeLightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

shuffleBtn.addEventListener('click', () => {
  const items = Array.from(galleryGrid.children);
  items.sort(() => Math.random() - 0.5);
  items.forEach(item => galleryGrid.appendChild(item));
});

addPhotoBtn.addEventListener('click', () => {
  const file = imageUpload.files[0];
  const title = photoTitle.value.trim() || 'My Creative Upload';

  if (!file) {
    alert('Please choose an image first.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const div = document.createElement('div');
    div.className = 'photo-card';
    div.dataset.category = 'custom';
    div.dataset.title = title;

    div.innerHTML = `
      <img src="${e.target.result}" alt="${title}">
      <div class="photo-overlay">
        <span>Custom</span>
        <h4>${title}</h4>
      </div>
    `;

    galleryGrid.prepend(div);
    attachCardEvents(div);

    imageUpload.value = '';
    photoTitle.value = '';

    alert('Photo added to gallery successfully!');
  };

  reader.readAsDataURL(file);
});