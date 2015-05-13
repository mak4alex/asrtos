$(document).ready(function() {
  $(function() {
    var tooltips = $( "[title]" ).tooltip({
      position: {
        my: "left top",
        at: "right+5 top-5"
      }
    });
    $( "#get-help" ).click(function() {
          tooltips.tooltip( "open" );
    });
  });


  $("form[data-remote=true]").submit(function(e){
    e.preventDefault(); // prevent normal submit
    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      dataType: 'json',
      data: $(this).serialize(),
      success: function(data){
         $("#load-square").text( data['load-ship-square']);
         $("#useful-square").text( data['useful-square']);
         $("#helper-square").text( data['helper-square']);
         $("#ship-square").text( data['load-ship-square']);
         $("#store-square").text( data['store-square']);
         $("#results").show();
      },
      error: function() {
        alert("Server error.");
      }
    });
  });



});



