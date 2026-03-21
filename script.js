const images = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img5.jpg",
  "images/img6.jpg",
  "images/img7.jpg",
  "images/img8.jpg",
  "images/img9.jpg",
  "images/img10.jpg",
  "images/img11.jpg",
  "images/img12.jpg",
  "images/img13.jpg",
  "images/img14.jpg",
  "images/img15.jpg"
];

const gallery = document.getElementById("gallery");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const closeBtn = document.getElementById("close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentIndex = 0;

function showImage(index){
  popupImg.src = images[index];
  currentIndex = index;
}

images.forEach((src, index) => {

  const box = document.createElement("div");
  box.classList.add("img-box");

  const img = document.createElement("img");
  img.src = src;
  img.loading = "lazy";

  const caption = document.createElement("p");
  caption.innerText = "Adityagenix";
  caption.classList.add("caption");

  img.addEventListener("click", () => {
    popup.style.display = "flex";
    showImage(index);
  });

  box.appendChild(img);
  box.appendChild(caption);
  gallery.appendChild(box);
});

closeBtn.onclick = () => popup.style.display = "none";

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
};