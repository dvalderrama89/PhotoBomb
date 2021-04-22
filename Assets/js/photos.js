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
            let imgElem = $("<img>").addClass("responsive-img").attr("src", data[i].urls.regular);
            $("#photoContainer").append(imgElem);
        }
    });
};