var startBtn = $(".start-btn"); // Targets the start button

var slider = $(".slider"); /* Initializes the main slider with these options */
M.Slider.init(slider, {
    indicators: false,
    height: 600,
    transition: 500,
    interval: 3000,
});

startBtn.on("click", function(e) { // When the user clicks on the Get Started button
  e.preventDefault();
  console.log("Start button works."); 
  window.location.replace("pages/photos.html"); // The page will redirect to photos.html
})

