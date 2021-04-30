// Populates the image in the main card. Pulls the image from local storage.
let imgArr = JSON.parse(localStorage.getItem("Saved")) || [];
let imgEl = $(`#image-zone`);
for (let i = 0; i < imgArr.length; i++) {
    let tempImg = $(`<img>`).attr(`src`, imgArr[i]).addClass('tempImg').attr(`id`, `current-img`);
    imgEl.append(tempImg);
}

// Function to click on image and open it in mainpicture.html

$(".tempImg").click(function(event) { //click event
    event.preventDefault();
    localStorage.removeItem("url", imgEl);
    localStorage.setItem("url", $(event.target).attr(`src`)); //saves URL to local storage so it can be opened in mainpicture.html
    console.log($(event.target).attr(`src`));
    window.location.assign("mainpicture.html") // redirects to mainpicture.html
})