$(document).ready(handler);

function handler() {
  $("#get-result").click(function(){
    var points = $("div[name=point]");
    var req = {
      _csrf: "",
      ids: []
    };
    req._csrf = $("input[name=_csrf]").val();
    for(var i = 0; i < points.length; ++i) {
      if ($("input[name=point-selected]", points[i]).is(':checked')) {
        req.ids.push( $("input[name=id]", points[i]).val() );
      }
    }

    if( req.ids.length ) {
      $.ajax({
        type: "POST",
        url: "/services/4/handle",
        dataType: 'json',
        data: req,
        success: function (data) {
          $("#result-latitude").text(data.latitude);
          $("#result-longitude").text(data.longitude);
        },
        error: function () {
          alert("Server error.");
        }
      });
    } else {
      alert("Select at least 1 point");
    }
  });

  $(function() {
    var icons = {
      header: "ui-icon-circle-arrow-e",
      activeHeader: "ui-icon-circle-arrow-s"
    };
    $( "#accordion" ).accordion({
      heightStyle: "content",
      collapsible: true,
      icons: icons
    });
  });

  var slickConfig = {
    dots: true,
    customPaging: function(slider, i) {
      return '<button class="tab">' + (i + 1) + '</button>';
    },
    arrows: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  var slider = $('#points-slider');
  slider.slick(slickConfig);

  $("form[name=create-form]").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      dataType: 'json',
      data: $(this).serialize(),
      success: function () {
        $('#reload').load(document.URL +  ' #reload', function() {
          $('#points-slider').slick(slickConfig);
        });
      },
      error: function () {
        alert("Server error");
      }
    });
  });


  $("form[name=delete-form]").submit(deletePoint);

  function deletePoint(e) {
    e.preventDefault();
    $.ajax({
      type: "DELETE",
      url: $(this).attr("action"),
      dataType: 'json',
      'data': $(this).serialize(),
      success: function () {
        $('#reload').load(document.URL +  ' #reload', function() {
          $("form[name=delete-form]").submit(deletePoint);
          $('#points-slider').slick(slickConfig);
        });
      },
      error: function () {
        alert("Server error.");
      }
    });
  }
}