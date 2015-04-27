$(document).ready(function () {
  $( "#sortable1" ).sortable({
    connectWith: ".connectedSortable",
    receive: function(event, ui) {
      ui.item.removeClass("ui-state-highlight").addClass("ui-state-default");
      calculateRate( -ui.item.val());
    }
  }).disableSelection();
  $( "#sortable2" ).sortable({
    connectWith: ".connectedSortable",
    receive: function(event, ui) {
      ui.item.removeClass("ui-state-default").addClass("ui-state-highlight");
      calculateRate(ui.item.val());

    }
  }).disableSelection();
  var result = 0;
  function calculateRate(val) {
    result += val;
    choiceClass();
  }
  function choiceClass() {
    var storeClass = "";
    if ( result < 7) {
      storeClass = "D";
    } else if ( result < 14) {
      storeClass = "C";
    } else if ( result < 20 ) {
      storeClass = "B";
    } else {
      storeClass = "A";
    }
    $("#class-type").text(storeClass);
  }
});