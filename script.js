const imageWrapper = document.querySelector('.images');
const loadMoreBtn = document.querySelector('.load-more');
const searchInput = document.querySelector('.search input');

// API key, paginations, searchTerm variables
const apiKey = '9CLXIMXhpRXjM9CC6MhNX3fU3vyLvSyX0D48DlWq08c6jLyDfVrWb8jo';
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const downloadImg = (imgUrl) => {
  //   console.log(imgUrl);

  // Converting received img to blob, creating its download link, & downloading it
  fetch(imgUrl)
    .then((res) => res.blob())
    .then((blob) => {
      //   console.log(blob);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => alert('Failed to download image!'));
};

// Here's a step-by-step explanation:

// Fetch Image:

// The function starts by using the fetch API to retrieve the image from the specified imgUrl.
// Convert Response to Blob:

// The response is then converted to a Blob using res.blob().  a Blob, representing the binary data of the image.
// Create Download Link:

// A new <a> (anchor) element is created dynamically in memory.
// Set Href Attribute: By setting a.href to this URL, you essentially tell the browser where to find the data to download.

// The href attribute of the <a> element is set to a URL representing the Blob data. This URL is created using URL.createObjectURL(blob).
// Set Download Attribute:

// The download attribute of the <a> element is set to a timestamp (using new Date().getTime()) to ensure a unique filename for the downloaded image.
// Simulate Click:

// The click() method is called on the <a> element, simulating a click. This triggers the browser's download functionality.
// Error Handling:

// If there is an error during the fetch or blob creation process, an alert is shown indicating that the image download has failed.

const generateHTML = (images) => {
  // Making li of all fetched images and adding them to the existing image wrapper
  imageWrapper.innerHTML += images
    .map(
      (img) =>
        `<li class="card">
            <img src="${img.src.large2x}" alt="img">
            <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera"></i>
                    <span>${img.photographer}</span>
                </div>
                <button onclick="downloadImg('${img.src.large2x}');">
                    <i class="uil uil-import"></i>
                </button>
            </div>
        </li>`
    )
    .join('');
};

const getImages = (apiURL) => {
  loadMoreBtn.innerText = 'Loading...';
  loadMoreBtn.classList.add('disabled');

  // Fetching images by API call with authorization header
  fetch(apiURL, {
    headers: { Authorization: apiKey },
  })
    .then((res) => res.json())
    .then((data) => {
      generateHTML(data.photos);
      loadMoreBtn.innerText = 'Load More';
      loadMoreBtn.classList.remove('disabled');
    })
    .catch(() => alert('Failed to load images!'));
};

getImages(
  `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
);

const loadMoreImages = () => {
  currentPage++; // Increment currentPage by 1
  let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  apiUrl = searchTerm
    ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`
    : apiUrl;
  getImages(apiUrl);
};

const loadSearchImages = (e) => {
  //   // If the search input is empty, set the search term to null and return from here
  if (e.target.value === '') return (searchTerm = null);
  // If pressed key is Enter, update the current page, search term & call the getImages
  if (e.key === 'Enter') {
    console.log('Enter key pressed');
    currentPage = 1;
    searchTerm = e.target.value;
    imageWrapper.innerHTML = '';
    getImages(
      `https://api.pexels.com/v1/search?query=${searchTerm}&page=1&per_page=${perPage}`
    );
  }
};

loadMoreBtn.addEventListener('click', loadMoreImages);
searchInput.addEventListener('keyup', loadSearchImages);
