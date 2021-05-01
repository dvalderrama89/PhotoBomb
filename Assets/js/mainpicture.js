    // Pulls image from local storage (under key "URL") and fills in "#image-zone".
let imgArr = localStorage.getItem("url");
let imgEl = $(`#image-zone`);
let tempImg = $(`<img>`).attr(`src`, imgArr).addClass('tempImg').attr(`id`, `current-img`);
imgEl.append(tempImg);

// Save button- Saves URL of image to local storage (under URL key). These images will populate the "saved" page.
$(document).ready(function() {
    $("#like-btn").click(function(e) {
        console.log("like button works");
        let currentUrl = $("#current-img").attr("src"); 
        let saveArr = JSON.parse(localStorage.getItem("Saved")) || [];
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

// Opens modal indicating image has been saved
$(document).ready(function(){
    $('.modal-saved').modal();
  });

// Share button- Will use the attached API to create a shorter URL that the user can share.
$(document).ready(function() {
    $("#send-btn").click(function(event) {
        event.preventDefault();
        console.log("send button works");
        let shortUrl = ""
        $(function() {
            const url = new URL("https://t.ly/api/v1/link/shorten");
            let headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
            let body = {
                "long_url": localStorage.getItem("url"),
                "domain": "https:\/\/t.ly\/",
                "api_token": atob("TThyWlVFNWNnbXVLMzZkWmJlZlhXbW55a0Jpb1FHcXRaZjZwTDVoNG5WYXp3UG93Mlh1aHZFQ1Y2aHpt")
            }
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(json => {
                    shortUrl = json.short_url; // Opens modal with shortened URL
                    console.log(json)
                    console.log(shortUrl);
                    // let modal = $(`<div>`).addClass("modal modal-url")
                    // let modalContent = $(`<div>`).addClass("modal-content")
                    // let shortenedUrl = $(`<p>`).addClass("short-url").text(`${shortUrl}`)
                    // let modalFooter = $(`<div>`).addClass("modal-footer")
                    // let modalFooterContent = $(`<a>`).attr("href", "#!").addClass("modal-close waves-effect waves-green btn-flat").text("Close")
                    // modalFooter.append(modalFooterContent)
                    // $("#random").append(modal,modalContent,shortenedUrl,modalFooter,modalFooterContent).modal();
                    alert(`Here's your shortend URL: ${shortUrl} `) //Alert that opens upon with shortened URL
                })
            } ) ;
            
            
        } ) ;
    })


 // Download button- Opens image in a separate window so the user can download.
$(document).ready(function() {
    $("#download-btn").click(function(event) {
        event.preventDefault();
        console.log("download button works");
        let imgArr = localStorage.getItem("url")
        window.open(`${imgArr}`);
    })
} )