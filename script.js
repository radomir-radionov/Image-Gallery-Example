const imageWrapper = document.querySelector('.images');

const apiKey = '9CLXIMXhpRXjM9CC6MhNX3fU3vyLvSyX0D48DlWq08c6jLyDfVrWb8jo';
const perPage = 15;
let currentPage = 1;

const generateHTML = (images) => {
  // Making li of all fetched images and adding them to the existing image wrapper
  imageWrapper.innerHTML += images
    .map(
      (img) =>
        `<li class="card">
            <img  src="${img.src.large2x}" alt="img">
            <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera"></i>
                    <span>${img.photographer}</span>
                </div>
                <button>
                    <i class="uil uil-import"></i>
                </button>
            </div>
        </li>`
    )
    .join('');
};

const getImages = (apiURL) => {
  // Fetching images by API call with authorization header
  fetch(apiURL, {
    headers: { Authorization: apiKey },
  })
    .then((res) => res.json())
    .then((data) => {
      generateHTML(data.photos);
    })
    .catch(() => alert('Failed to load images!'));
};

getImages(
  `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
);
