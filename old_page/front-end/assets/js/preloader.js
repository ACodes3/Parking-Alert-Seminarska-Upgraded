$(window).load(function () {
  // poskrbi, da se naloži celotno spletno mesto
  $("#status").fadeOut(); // najprej bo izginila animacija nalaganja
  $("#preloader").fadeOut(); // beli DIV, ki pokriva spletno stran, bo izginil.
  $("body").delay(350).css({
    overflow: "visible",
  });
});
