//NEWS TICKER
head.js("assets/js/newsticker/jquery.newsTicker.js", function () {
  var nt_title = $("#nt-title").newsTicker({
    row_height: 18,
    max_rows: 1,
    duration: 5000,
    pauseOnHover: 0,
  });
});

// SLIDER
head.js("assets/js/custom/scriptbreaker-multiple-accordion-1.js", function () {
  $(".topnav").accordionze({
    accordionze: true,
    speed: 500,
    closedSign: '<img src="assets/img/plus.png">',
    openedSign: '<img src="assets/img/minus.png">',
  });
});

// ISKALNI MENI
head.js("assets/js/search/jquery.quicksearch.js", function () {
  $("input.id_search").quicksearch("#menu-showhide li, .menu-left-nest li");
});

// DIGITALNA URA
head.js("assets/js/clock/jquery.clock.js", function () {
  //clock
  $("#digital-clock").clock({
    offset: "+5",
    type: "digital",
  });
});
