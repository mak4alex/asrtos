$(document).ready(handler);


function handler() {
  $("form[data-remote=true]").submit(createCarriage);

  function createCarriage (e) {
    e.preventDefault(); // prevent normal submit
    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      dataType: 'json',
      data: $(this).serialize(),
      success: function (data) {
        $('#carriage-container').load(document.URL +  ' #carriage-container', function() {
          $("form[data-remote=true]").submit(createCarriage);
          $( "#accordion" ).accordion(accordionConfig);
        });
      },
      error: function () {
        alert("Server error");
      }
    });
  }

  $("button[name=delete]").click(deleteCarriage);
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
          $("button[name=delete]").click(deleteCarriage);
          $( "#accordion" ).accordion(accordionConfig);
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

  var accordionConfig = {
    heightStyle: "content",
    collapsible: true,
    active: false,
    icons: {
      header: "ui-icon-circle-arrow-e",
      activeHeader: "ui-icon-circle-arrow-s"
    }
  };

  $( "#accordion" ).accordion(accordionConfig);


  $("button[name=reset]").click(function (e) {
    if(this.value != "")
      e.preventDefault();
    $("form[name=" + this.value + "]").find("input[type=number]").val("");
  });

}