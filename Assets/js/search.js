var searchContainer = $(".searchContainer"); // Targets where the images will be shown
var img = $("img"); // Targets all images 

$(document).ready(function () {
    var search = localStorage.getItem("search");
    console.log(search);
    var enc = "b2dLS1VTeUdSUWgtU2tVVnpqS1ByX0t5clZZM0Q3eS1GZElwNmV4VVdIQQ==";
    var dec = atob(enc);
    var apiUrl = "https://api.unsplash.com/photos/random?&client_id=" + dec + "&count=20" + "&query=" + search;
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                console.log(response.status);
            }
        })
        .then(function(data){
            for (var i = 0 ; i < 20 ; i++) {
                var img = $('.' + i); // Targets each img with class starting with ".0" to ".19"
                var imgUrl = data[i].urls.regular; // Fetches the image url
                img.attr("src", imgUrl); // Assigns the source attribute the image url
            }
        })
})

