$(document).ready(function() {

  function resetHandlers() {
    var createCommentForm = $("form[name='create-comment']");
    var deleteCommentForm = $("form[name='delete-comment']");
    createCommentForm.off();
    createCommentForm.submit(createComment);

    deleteCommentForm.off();
    deleteCommentForm.submit(deleteComment);
    console.log("Reset handlers");
  }

  resetHandlers();

  function createComment(e) {
    e.preventDefault();
    var form = this;
    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      dataType: 'json',
      data: $(this).serialize(),
      success: function () {
        $('#comments').load(document.URL +  ' #comments', resetHandlers);
      },
      error: function (err) {
        console.log("Error add comment");
        console.log(err);
      }
    });
  }

  function deleteComment(e) {
    e.preventDefault();
    $.ajax({
      type: "DELETE",
      url: $(this).attr("action"),
      dataType: 'json',
      data: $(this).serialize(),
      success: function () {
        $('#comments').load(document.URL +  ' #comments', resetHandlers);
      },
      error: function () {
        alert("Server error");
      }
    });
  }
});