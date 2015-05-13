$(document).ready(function() {

  function resetHandlers() {
    var createCommentForm = $("form[name='create-comment']");
    var deleteCommentForm = $("form[name='delete-comment']");
    createCommentForm.off();
    createCommentForm.submit(createComment);
    createCommentForm[0].reset();
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
      error: function () {
        window.location.replace("/login");
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