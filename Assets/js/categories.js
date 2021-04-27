var h3 = $("h3"); // Targets the categories title
var button = $("li button"); // Targets the category buttons
var categoriesList = $(".categories-list"); // Targets the categories list container
var appendedPhotos = $(".appended-photos"); // Targets the location for appended photos
var backBtnLoc = $(".back-btn-loc"); // Targets the location of the back button
var img = $("img"); // Targets all of the images 

function getPhotos(e) { // This function will fetch the category's photos from Unsplash
    e.preventDefault();
    var category = $(e.target).text(); // Saves the category name 
    var enc = "b2dLS1VTeUdSUWgtU2tVVnpqS1ByX0t5clZZM0Q3eS1GZElwNmV4VVdIQQ==";
    var dec = atob(enc);
    var apiUrl = "https://api.unsplash.com/photos/random?client_id=" + dec + "&count=20" + "&query=" + category;
    // query= search term
    // count = will return 20 pictures
    fetch(apiUrl) 
        .then(function(response) {
            if(response.ok) {
                return response.json(); // If the status is ok, return the data
            } else {
                console.log(response.status); // If not, log the status code
                return;
            }
        })
        .then(function(data) { // Perform these operations to the data
            button.hide(); // Hide the buttons
            categoriesList.hide(); // Hide the container holding the buttons
            h3.text(category); // Fill the text with the category name 
            var a = $("<a>"); // Create new tags
            var i = $("<i>");
            a.addClass("waves-effect waves-light btn backBtn"); // Make this a tag a button 
            i.addClass("material-icons left");
            i.text("arrow_back"); // Arrow back icon
            a.text("Go Back");
            a.append(i);
            backBtnLoc.append(a); // Append it to the div

            for (var i = 0 ; i < 20 ; i++) {
                var img = $('.' + i); // Target each img with class starting with ".0" to ".19"
                var imgUrl = data[i].urls.regular; // Fetches the image url
                img.attr("src", imgUrl); // Assigns the source attribute the image url
            }
            $(".backBtn").on("click", function() { // This function will execute if the user clicks the back button
                window.location.replace("categories.html"); 
            })
        })
}

function clickedImage(e) { // This function will save the image URL into local storage
    var clickedImage = $(e.target).attr("src"); // Saves the image url
    localStorage.setItem("url", clickedImage); // Saves the url into local storage 
    window.location.assign("mainpicture.html") // Redirects the page to mainpicture.html
}

button.on("click", getPhotos); // getPhotos() will run when the user clicks a category
img.on("click", clickedImage); // clickedImage() will run when the user clicks on a photo

