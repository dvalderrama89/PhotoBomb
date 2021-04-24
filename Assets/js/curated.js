$(function() {
    let weightsObj = localStorage.getItem("weights");
    let parsedObj = {};
    if (weightsObj) {
        parsedObj = JSON.parse(weightsObj);
    } else {
        // Default object weights if the user goes directly to the html page without
        // doing the first set of like/dislikes in photos.html
        weightsObj = {
            nature: 100,
            people: 100,
            architecture: 100,
            fashion: 100,
            film: 100
        }
    }

    renderPhotos(parsedObj);
});

// Handles taking the user to the next page in the flow so they can download the image
$(document).on("click", "img", function(e) {
    localStorage.setItem("selectedImageURL", $(this).attr("src"));
    window.location = "../pages/mainpage.html";
});

// Handles sorting the categories by weight and displaying them in a grid to the user
function renderPhotos(weights) {
    // Sorts the weights object in ascending order
    // Taken from here: https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
    const sortable = Object.fromEntries(
        Object.entries(weights).sort(([,a],[,b]) => b - a)
    );

    let slug = "";
    let enc = "b2dLS1VTeUdSUWgtU2tVVnpqS1ByX0t5clZZM0Q3eS1GZElwNmV4VVdIQQ=="; // encoded api key
    
    // Fetches images from the category in their weighted order
    let sortedCategories = Object.keys(sortable);
    sortedCategories.forEach(slug => {
        let apiURL = `https://api.unsplash.com/topics/${slug}/photos/?client_id=${atob(enc)}&order_by=latest&orientation=squarish`;
        fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                // Sets up the images to display in the grid
                let imgContainer = $("<div>").addClass("col s12 m3");
                let imgElem = $("<img>").addClass("0 responsive-img").attr("src", data[i].urls.regular);
                imgContainer.append(imgElem);
                $("#photoContainer").append(imgContainer);
            }
        });
    });
}
