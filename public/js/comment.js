$(document).ready(function() {

  $("form[name='create-comment']").submit(createComment);

  function createComment(e) {
    e.preventDefault();
    var form = this;
    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      dataType: 'json',
      data: $(this).serialize(),
      success: function () {
        $('#comments').load(document.URL +  ' #comments', function() {
          $(form)[0].reset();
          $("form[name='delete-comment']").submit(deleteComment);

        });
      },
      error: function () {
        alert("Server error");
      }
    });
  }

  $("form[name='delete-comment']").submit(deleteComment);

  function deleteComment(e) {
    e.preventDefault();
    $.ajax({
      type: "DELETE",
      url: $(this).attr("action"),
      dataType: 'json',
      data: $(this).serialize(),
      success: function () {
        $('#comments').load(document.URL +  ' #comments', function() {
          $("form[name='delete-comment']").submit(deleteComment);

        });
      },
      error: function () {
        alert("Server error");
      }
    });
  }
});