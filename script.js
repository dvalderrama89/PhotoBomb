$(document).ready(function(){ /* Initializes the side bar */
    $('.sidenav').sidenav();
  });

var slider = $(".slider"); /* Initializes the main slider with these options */
M.Slider.init(slider, {
    indicators: false,
    height: 550,
    transition: 500,
    interval: 3000,
});


