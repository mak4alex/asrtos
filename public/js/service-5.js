$(document).ready(function () {
  $("form[data-remote=true]").submit(function (e) {
    e.preventDefault(); // prevent normal submit
    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      dataType: 'json',
      data: $(this).serialize(),
      success: function (data) {
        alert(data);
      },
      error: function () {
        alert("Server error.");
      }
    });
  });

  $("#delete").click(function (e) {
    e.preventDefault(); // prevent normal submit
    var form = $("form[name=" + this.value + "]");
    var values = form.serialize();

    $.ajax({
      type: "DELETE",
      url: form.attr("action"),
      dataType: 'json',
      'data': values,
      success: function (data) {
        form.remove()
      },
      error: function () {
        alert("Server error.");
      }
    });
  });
});