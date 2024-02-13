const accessKey = "jEwg4piNnNRD6lD38QnzxKdTiiledtjUd_veAhR2BUo"; // Replace with your Unsplash API access key
const apiUrl = "https://api.unsplash.com/search/photos";
let page = 1;
let currentQuery = "";

async function fetchImages(query, page) {
  const response = await fetch(
    `${apiUrl}?query=${query}&page=${page}&client_id=${accessKey}`
  );
  const data = await response.json();
  return data.results;
}

function displayImages(images) {
  const imageContainer = document.getElementById("imageContainer");

  images.forEach((image) => {
    const imageItem = document.createElement("div");
    imageItem.classList.add("image-item");

    const img = document.createElement("img");
    img.src = image.urls.regular;
    img.alt = image.alt_description;

    imageItem.appendChild(img);
    imageContainer.appendChild(imageItem);
  });
}

async function loadMoreImages() {
  page++;
  const images = await fetchImages(currentQuery, page);
  displayImages(images);
}

document
  .getElementById("searchButton")
  .addEventListener("click", async function () {
    page = 1;
    const query = document.getElementById("searchInput").value;
    currentQuery = query;
    const images = await fetchImages(query, page);
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = ""; // Clear previous search results
    displayImages(images);
  });

document
  .getElementById("loadMoreButton")
  .addEventListener("click", loadMoreImages);