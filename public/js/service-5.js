$(document).ready(handler);


function handler() {

  var accordionConfig = {
    heightStyle: "content",
    collapsible: true,
    active: false,
    icons: {
      header: "ui-icon-circle-arrow-e",
      activeHeader: "ui-icon-circle-arrow-s"
    }
  };




  function resetHandlers() {
    $("form[data-remote=true]").off();
    $("form[data-remote=true]").submit(createCarriage);

    $("button[name=delete]").off();
    $("button[name=delete]").click(deleteCarriage);

    $("button[name=reset]").off();
    $("button[name=reset]").click( reset );

    $("#accordion").accordion(accordionConfig);
  }

  resetHandlers();


  function createCarriage (e) {
    e.preventDefault(); // prevent normal submit
    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      dataType: 'json',
      data: $(this).serialize(),
      success: function (data) {
        $('#carriage-container').load(document.URL +  ' #carriage-container', function() {
          resetHandlers();
        });
      },
      error: function () {
        alert("Server error");
      }
    });
  }


  function deleteCarriage () {
    var form = $("form[name=" + this.value + "]");
    var values = form.serialize();
    $.ajax({
      type: "DELETE",
      url: form.attr("action"),
      dataType: 'json',
      'data': values,
      success: function (data) {
        $('#carriage-container').load(document.URL +  ' #carriage-container', function() {
          resetHandlers();
        });
      },
      error: function () {
        alert("Server error.");
      }
    });
  }

  var tooltips = $( "[title]" ).tooltip({
    position: {
      my: "left top",
      at: "right+5 top-5"
    }
  });




  function reset (e) {
    if(this.value != "")
      e.preventDefault();
    $("form[name=" + this.value + "]").find("input[type=number]").val("");
  }
}