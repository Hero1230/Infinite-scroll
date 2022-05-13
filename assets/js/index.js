const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let loadedImages = 0;
let totalImages = 0;

// API
const count = 10;
const apiKey = "6ib0n_DwrtF3E3D_csSyC6MyrB9GlsOJbvDKXCFmVE0";
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Setting attributes function
const setAttributes = (element, attributes) => {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
};

//Checking if images are loaded, and hiding loader
const imageLoaded = () => {
	loadedImages++;
	if (loadedImages === totalImages) {
		ready = true;
		loader.hidden = true;
	}
};

//Creating photos elements
const displayPhotos = () => {
	loadedImages = 0;
	totalImages = photosArray.length;

	photosArray.forEach((photo) => {
		const item = document.createElement("a");
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});

		const img = document.createElement("img");
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.description ? photo.description : "",
			title: photo.description ? photo.description : "",
		});

		img.addEventListener("load", imageLoaded);

		item.append(img);
		imageContainer.append(item);
	});
};

// Getting photos from Unsplash API
const getPhotos = async () => {
	try {
		const response = await fetch(apiURL);
		photosArray = await response.json();
		loader.hidden = false;
		displayPhotos();
	} catch (error) {
		console.log(error);
	}
};

window.addEventListener("scroll", () => {
	if (
		window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

getPhotos();
