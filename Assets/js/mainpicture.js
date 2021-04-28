// let temporaryUrl = ["https://images.unsplash.com/photo-1619009642046-c1961c2a73e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"]
//     localStorage.setItem("URL", JSON.stringify(temporaryUrl));

// Populates the image in the main card. Pulls the image from local storage.
$(document).ready(function() {
    // Pulls image from local storage (under key "URL") and fills in "#image-zone".
    let imgArr = JSON.parse(localStorage.getItem("url")) || [];
    let imgEl = $(`#image-zone`);
    for (let i = 0; i < imgArr.length; i++) {
        let tempImg = $(`<img>`).attr(`src`, imgArr[i]).addClass('tempImg').attr(`id`, `current-img`);
        imgEl.append(tempImg);
    }

} )

// Save button- Saves URL of image to local storage (under URL key). These images will populate the "saved" page.
$(document).ready(function() {
    $("#like-btn").click(function(e) {
        // console.log("like button works");
        let currentUrl = $("#current-img").attr("src"); 
        let saveArr = JSON.parse(localStorage.getItem("url")) || [];
        console.log(saveArr);
        saveArr.push(currentUrl);
            localStorage.setItem("Saved", JSON.stringify(saveArr))
            // Only allows the user to save a specific image once
        if (saveArr.indexOf(currentUrl) === -1) {
            saveArr.push(currentUrl);
            localStorage.setItem("url", JSON.stringify(saveArr))
        }
        
    })
} )

// Share button- Will use the attached API to create a shorter URL that the user can share.
$(document).ready(function() {
    $("#send-btn").click(function(event) {
        event.preventDefault();
        console.log("send button works");
        $(function() {
            const url = new URL("https://t.ly/api/v1/link/shorten");
            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
            let body = {
                "long_url": tempImg,
                "domain": "https:\/\/t.ly\/",
                "api_token": atob("TThyWlVFNWNnbXVLMzZkWmJlZlhXbW55a0Jpb1FHcXRaZjZwTDVoNG5WYXp3UG93Mlh1aHZFQ1Y2aHpt")
            }
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(json => console.log(json));
        });
    })

} )

 // Download button- Opens image in a separate window so the user can download.
$(document).ready(function() {
    $("#download-btn").click(function(event) {
        event.preventDefault();
        console.log("download button works");
        let imgArr = JSON.parse(localStorage.getItem("url"))
        window.open(`${imgArr}`);
    })
} )