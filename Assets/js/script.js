/* Global script */
var navForm =  $("#navForm"); // Targets the nav form
var sideNavForm = $("#sideForm") // Targets the side form 

$(document).ready(function(){ /* Initializes the side nav bar */
    $('.sidenav').sidenav();
});

navForm.on("submit", function(e) { // Saves the user input from nav bar into local storage and redirects screen 
    e.preventDefault();
    var navSearch = $("#navSearch").val(); 
    localStorage.setItem("search", navSearch);
    window.location.replace("pages/search.html");
})

sideNavForm.on("submit", function(e) { // Saves the user input from side bar into local storage and redirects screen
    e.preventDefault();
    var sideSearch = $("#sideSearch").val(); 
    localStorage.setItem("search", sideSearch);
    window.location.replace("pages/search.html");
})
/* Need to add #navForm, #sideForm, #navSearch, #sideSearch IDs to all HTML pages */