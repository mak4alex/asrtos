$(document).ready(function(){
  $(function() {
    var icons = {
      header: "ui-icon-circle-arrow-e",
      activeHeader: "ui-icon-circle-arrow-s"
    };
    $( "#accordion" ).accordion({
      heightStyle: "content",
      collapsible: true,
      icons: icons
    });
  });

  $('#slider').slick({
    dots: true,
    customPaging: function(slider, i) {
      return '<button class="tab">' + (i + 1) + '</button>';
    },
    arrows: true
  });
});