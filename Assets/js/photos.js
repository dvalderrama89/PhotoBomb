$(function() {
    fetchPhotos(); // Currently fetches just the nature category
});

function fetchPhotos() {
    let enc = "b2dLS1VTeUdSUWgtU2tVVnpqS1ByX0t5clZZM0Q3eS1GZElwNmV4VVdIQQ=="; // encoded api key
    let apiURL = `https://api.unsplash.com/topics/nature/photos/?client_id=${atob(enc)}`;
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            let cardElem = createImageElems(data[i].urls.regular);
            $("#photoContainer").append(cardElem);
        }
    });
};

// TODO: need to resize the images before they get put in the card
// so that they're uniform and also pull images from different categories
function createImageElems(url) {
    let cardContainer = $("<div>").addClass("col s12 m8 l3");

    let cardElem = $("<div>").addClass("card");
    let imgContainer = $("<div>").addClass("card-image waves-effect waves-block waves-light");
    let imgElem = $("<img>").addClass("activator").attr("src", url);
    
    let linkContainer = $("<div>").addClass("card-action");
    let likeElem = $("<a>").attr("href", "#").text("Like");
    let dislikeElem = $("<a>").attr("href", "#").text("Dislike");

    linkContainer.append(likeElem);
    linkContainer.append(dislikeElem);

    imgContainer.append(imgElem);
    cardElem.append(imgContainer);
    cardElem.append(linkContainer);

    cardContainer.append(cardElem);
    return cardContainer;
}