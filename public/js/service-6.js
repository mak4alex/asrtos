$(document).ready(function(){
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

  $("form[name=store-form]").submit(function (e) {
    e.preventDefault();
    var form = $(this).serializeArray();

    var yearOwnCost = parseFloat(form[0].value);
    var ownCost = parseFloat(form[1].value);
    var rentCost = parseFloat(form[2].value);
    var turnover = parseFloat(form[3].value);

    var volumeCargo = [];
    var onwCosts = [];
    var rentCosts = [];

    for (var i = 0; i < turnover * 10; i += turnover) {
      onwCosts.push(yearOwnCost + ownCost * i);
      rentCosts.push(rentCost * i);
      volumeCargo.push(i);
    }

    var apathy = 0;
    if (rentCost != ownCost) {
      apathy = yearOwnCost / (rentCost - ownCost);
    } else {
      apathy = "error";
    }

    $("#apathy").text(apathy);

    var data = {
      labels: volumeCargo,
      series: [
        {
          name: "Собственный склад",
          data: onwCosts
        },
        {
          name: "Арендный склад",
          data: rentCosts
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


  });
});