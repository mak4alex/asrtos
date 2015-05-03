$(document).ready(handler);
$(document).bind("DOMSubtreeModified", handler);

function handler() {
  $("form[data-remote=true]").submit(function (e) {
    e.preventDefault(); // prevent normal submit
    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      dataType: 'json',
      data: $(this).serialize(),
      success: function (data) {
        $('#carriage-container').load(document.URL +  ' #carriage-container');
      },
      error: function () {
        alert("Server error");
      }
    });
  });

  $("button[name=delete]").click(function () {
    var form = $("form[name=" + this.value + "]");
    var values = form.serialize();
    $.ajax({
      type: "DELETE",
      url: form.attr("action"),
      dataType: 'json',
      'data': values,
      success: function (data) {
        $('#carriage-container').load(document.URL +  ' #carriage-container');
      },
      error: function () {
        alert("Server error.");
      }
    });
  });



  $("button[name=reset]").click(function (e) {
    if(this.value != "")
      e.preventDefault();
    $("form[name=" + this.value + "]").find("input[type=number]").val("");
  });

}