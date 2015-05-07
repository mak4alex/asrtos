$(document).ready(handler);

function handler() {
  console.log("handler");

  $("#get-result").click(function(){
    console.log("get-result");
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
    console.log(req);
    $.ajax({
      type: "POST",
      url: "/services/4/handle",
      dataType: 'json',
      data: req,
      success: function(data){
        console.log(data.latitude);
        $("#result-latitude").text( data.latitude);
        $("#result-longitude").text( data.longitude);


      },
      error: function() {
        alert("Server error.");
      }
    });
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

  $('#points-slider').slick({
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
  });


  $("form[name=create-form]").submit(function (e) {
    e.preventDefault(); // prevent normal submit
    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      dataType: 'json',
      data: $(this).serialize(),
      success: function () {
        $('#data').load(document.URL +  ' #data',function() {
          handler();
        });

      },
      error: function () {
        alert("Server error");
      }
    });
  });


  $("form[name=delete-form]").submit(function (e) {
    e.preventDefault(); // prevent normal submit
    console.log($(this).serialize());
    $.ajax({
      type: "DELETE",
      url: $(this).attr("action"),
      dataType: 'json',
      'data': $(this).serialize(),
      success: function () {
        $('#data').load(document.URL +  ' #data', handler);

      },
      error: function () {
        alert("Server error.");
      }
    });
  });

}