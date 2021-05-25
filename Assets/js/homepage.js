let startBtn = $(".start-btn"); // Targets the start button

const slider = $(".slider"); /* Initializes the main slider with these options */
M.Slider.init(slider, {
    indicators: false,
    transition: 500,
    interval: 3000,
});

startBtn.on("click", function(e) { // When the user clicks on the Get Started button
  e.preventDefault();
  window.location.assign("pages/photos.html"); // The page will redirect to photos.html
})

