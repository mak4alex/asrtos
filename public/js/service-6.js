$(document).ready(function(){
  var csrf = $("input[name=_csrf]").val();

  function init() {
    listMarks (function() {
      $("button[name=graphic]").off();
      $("button[name=graphic]").click(initGraphic);

      $("button[name=delete]").off();
      $("button[name=delete]").click(deleteMark);
      console.log("Set handlers");
    });
  }

  init();

  $("form[data-remote=true]").submit(function(e){
    e.preventDefault();

    var form = this;
    $.ajax({
      type: "POST",
      url: $(this).attr("action"),
      dataType: 'json',
      data: $(form).serialize(),
      success: function(data){
        console.log(data.message);
        $(form)[0].reset();
        init();
      },
      error: function() {
        alert("Server error.");
      }
    });
  });

  function deleteMark() {
    var button = this;
    var data = {
      _csrf: csrf,
      id : $(button).val()
    };
    $.ajax({
      type: "DELETE",
      url: "/services/6/delete",
      dataType: 'json',
      data: data,
      success: function(data){
        console.log(data.message);
        init();
      },
      error: function() {
        alert("Server error.");
      }
    });
  }

  function initGraphic() {
    var button = this;
    var data = {
      _csrf: csrf,
      id : $(button).val()
    };
    $.ajax({
      type: "POST",
      url: "/services/6/graphic",
      dataType: 'json',
      data: data,
      success: function(data){
        console.log(data);
        showGraphic(data.graphicData)
      },
      error: function() {
        alert("Server error.");
      }
    });
  }

  function listMarks (cb) {

    $.ajax({
      type: "GET",
      url: "/services/6/list",
      dataType: 'json',
      success: function(data){
        var marks = data.marks;
        var tBody = $("#result-table");
        tBody.empty();
        for (var i in marks) {
          var mark = marks[i];
          console.log(mark);
          var tRow = '<tr><td><button name="graphic" class="btn btn-primary" value="' +  mark.id +
              '" title="Построить график"><span class="glyphicon glyphicon-play"></span></button>' +
              '</td><td>' + mark.constOwnCost + '</td><td>' + mark.altOwnCost + '</td><td>' + mark.altRentCost + '</td><td>' + mark.turnover + '</td><td>' +
              '<button name="delete" class="btn btn-danger" value="' +  mark.id + '" title="Удалить"><span class="glyphicon glyphicon-remove"></span></button></td></tr>';
        tBody.append(tRow);
        }
        cb();
      },
      error: function() {
        alert("Server error.");
      }
    });
  }
});

function showGraphic(input) {
  var options = {
    showPoint: true,
    axisX: {
      labelInterpolationFnc: function(value) {
        return value + ' тонн/год';
      }
    },
    axisY: {
      labelInterpolationFnc: function(value) {
        return value + ' у.e.';
      }
    }
  };

  var responsiveOptions = [
    ['screen and (min-width: 641px) and (max-width: 1024px)', {
      showPoint: true,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value + ' тонн/год';
        }
      }
    }],
    ['screen and (max-width: 640px)', {
      showPoint: true,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value + ' т/г';
        }
      }
    }]
  ];

  $("#apathy").text(input.apathy);

  var data = {
    labels: input.volumeCargo,
    series: [
      {
        name: "Собственный склад",
        data: input.ownCosts
      },
      {
        name: "Арендный склад",
        data: input.rentCosts
      }
    ]
  };

  new Chartist.Line('#my-chart', data, options, responsiveOptions);

  var $chart = $('#my-chart');

  var $toolTip = $chart
      .append('<div class="tooltip"></div>')
      .find('.tooltip')
      .hide();

  $chart.on('mouseenter', '.ct-point', function() {
    var $point = $(this),
        value = $point.attr('ct:value'),
        seriesName = $point.parent().attr('ct:series-name');
    $toolTip.html(seriesName + '<br>' + value + " y.e.").show();
  });

  $chart.on('mouseleave', '.ct-point', function() {
    $toolTip.hide();
  });

  $chart.on('mousemove', function(event) {
    $toolTip.css({
      left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
      top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
    });
  });
}