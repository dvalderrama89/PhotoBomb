/* Global script */
let navForm =  $("#navForm"); // Targets the nav form
let sideNavForm = $("#sideForm") // Targets the side form 

$(document).ready(function(){ /* Initializes the side nav bar */
    $('.sidenav').sidenav();
});

navForm.on("submit", function(e) { // Saves the user input from nav bar into local storage and redirects screen 
    e.preventDefault();
    let navSearch = $("#navSearch").val(); 
    localStorage.setItem("search", navSearch);
    if ( document.URL.includes("index.html") ) { // If the user is on index.html, it will redirect accordingly 
        window.location.assign("pages/search.html");
    } else {
        window.location.assign("search.html"); 
    }
})

sideNavForm.on("submit", function(e) { // Saves the user input from side bar into local storage and redirects screen
    e.preventDefault();
    let sideSearch = $("#sideSearch").val(); 
    localStorage.setItem("search", sideSearch);
    if ( document.URL.includes("index.html") ) {
        window.location.assign("pages/search.html");
    } else {
        window.location.assign("search.html");
    }
})
/* Need to add #navForm, #sideForm, #navSearch, #sideSearch IDs to all HTML pages */