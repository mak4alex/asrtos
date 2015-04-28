$(document).ready(function() {
  $("form[data-remote=true]").submit(function(e){
    e.preventDefault(); // prevent normal submit
    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      dataType: 'json',
      data: $(this).serialize(),
      success: function(data){
        $("#optimal-order").text( data['optimal-order']);
        $("#min-costs").text( data['min-costs']);
        $("#regime-supply").text( data['regime-supply']);

        $("#results").show();
      },
      error: function() {
        alert("Server error.");
      }
    });
  });


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
});