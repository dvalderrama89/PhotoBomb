/**
 * 
All slugs
------
    wallpapers
    nature
    people
    architecture
    current-events
    business-work
    experimental
    fashion
    film
    health
 */
var slugs = ["nature", "people", "architecture", "fashion", "film"];
var categoryWeights = {
    nature: 100,
    people: 100,
    architecture: 100,
    fashion: 100,
    film: 100
}
var photoURLs = {
    "nature": "",
    "people": "",
    "architecture": "",
    "fashion": "",
    "film": ""
}
var slugIndex = 0;

// Runs on page load
$(function() {
    localStorage.setItem("weights", JSON.stringify(categoryWeights)); // Sets default weights
    photoURLs = (localStorage.getItem("photoURLs")) ? localStorage.getItem("photoURLs") : photoURLs;
    fetchPhotos(slugs[slugIndex]); // Fetches the default category at position 0
});

// We need to know what category the image is from to weight the category appropriately.
// Event delegation is used here to get these click events to register to the dynamically
// created elements
$(document).on('click','#likeButton',function() {
    categoryWeights[this.dataset.category] = 100;
    localStorage.setItem("weights", JSON.stringify(categoryWeights));

    if (slugIndex < slugs.length-1) {
        $("#photoContainer").empty();
        fetchPhotos(slugs[++slugIndex]);
    } else {
        window.location = "./curated.html";
    }
});

$(document).on('click','#dislikeButton',function() {
    categoryWeights[this.dataset.category] = 0;
    localStorage.setItem("weights", JSON.stringify(categoryWeights));

    if (slugIndex < slugs.length-1) {
        $("#photoContainer").empty();
        fetchPhotos(slugs[++slugIndex]);
    } else {
        window.location = "./curated.html";
    }
});

function fetchPhotos(slug) {
    let enc = "b2dLS1VTeUdSUWgtU2tVVnpqS1ByX0t5clZZM0Q3eS1GZElwNmV4VVdIQQ=="; // encoded api key
    let apiURL = `https://api.unsplash.com/topics/${slug}/photos/?client_id=${atob(enc)}&orientation=portrait`;

    // Checks local storage to see if we already have the photo URL saved and
    // skips the API call if we do
    let urlsObj = localStorage.getItem("photoURLs");
    if (urlsObj) {
        let parsedObj = JSON.parse(urlsObj);
        if (parsedObj[slug] && parsedObj[slug].length > 0) {
            console.log("already have the url for: ", slug);
            let cardElem = createImageElems(parsedObj[slug], slug);
            $("#photoContainer").append(cardElem);
            return;
        }
    }

    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        console.log(data) // debug info
        if (data.length > 1) {
            for (let i = 0; i < 1; i++) {
                let cardElem = createImageElems(data[i].urls.regular, slug);
                $("#photoContainer").append(cardElem);

                // Saves urls so we dont have to make duplicate api calls
                photoURLs[slug] = data[i].urls.regular;
                localStorage.setItem("photoURLs", JSON.stringify(photoURLs));
            }
        }
    });
};

// Makes the card element that contains the photo and like/dislike buttons and attaches them to the page
function createImageElems(url, slug) {
    let cardContainer = $("<div>").addClass("col s12 m6 offset-m3"); // offset is used to center the image

    let cardElem = $("<div>").addClass("card");
    let imgContainer = $("<div>").addClass("card-image waves-effect waves-block waves-light");
    let imgElem = $("<img>").addClass("activator").attr("src", url);
    
    let linkContainer = $("<div>").addClass("card-action");
    let likeElem = $("<a>").attr("href", "#").text("Like").attr("id", "likeButton").attr("data-category", slug);
    let dislikeElem = $("<a>").attr("href", "#").text("Dislike").attr("id", "dislikeButton").attr("data-category", slug);

    linkContainer.append(likeElem);
    linkContainer.append(dislikeElem);

    imgContainer.append(imgElem);
    cardElem.append(imgContainer);
    cardElem.append(linkContainer);

    cardContainer.append(cardElem);
    return cardContainer;
}