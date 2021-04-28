$(document).ready(function() {
    // Populates the image in the main card. Pulls the image from local storage.
    let imgArr = JSON.parse(localStorage.getItem("URL")) || [];
    let imgEl = $(`#image-zone`);
    for (let i = 0; i < imgArr.length; i++) {
        let tempImg = $(`<img>`).attr(`src`, imgArr[i]).addClass('tempImg').attr(`id`, `current-img`);
        imgEl.append(tempImg);
    }

} )