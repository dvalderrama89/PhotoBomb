let searchContainer = $(".searchContainer"); // Targets where the images will be shown
let img = $("img"); // Targets all images 

$(document).ready(function () {
    let search = localStorage.getItem("search");
    console.log(search);
    const enc = "b2dLS1VTeUdSUWgtU2tVVnpqS1ByX0t5clZZM0Q3eS1GZElwNmV4VVdIQQ==";
    const dec = atob(enc);
    let apiUrl = "https://api.unsplash.com/photos/random?&client_id=" + dec + "&orientation=squarish&count=20" + "&query=" + search;
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                console.log(response.status);
                return;
            }
        })
        .then(function(data){
            for (let i = 0 ; i < 20 ; i++) {
                let img = $('.' + i); // Targets each img with class starting with ".0" to ".19"
                let imgUrl = data[i].urls.regular; // Fetches the image url
                img.attr("src", imgUrl); // Assigns the source attribute the image url
            }
        })
})

function clickedImage(e) { // This function will save the image URL into local storage
    let clickedImage = $(e.target).attr("src"); // Saves the image url
    localStorage.setItem("url", clickedImage); // Saves the url into local storage 
    window.location.assign("mainpicture.html") // Redirects the page to mainpicture.html
}

img.on("click", clickedImage); // clickedImage() will run when the user clicks on a photo