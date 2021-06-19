$(document).ready(function () {

  $.get('works/works.json', function (data) {
    $('#works').html('');
    $.each(data, function (key, value) {
      if (value.featured) {
        var card_html = `<div class="col-md-4">
          <div class="card shadow border-0 mb-4">
            <img src="works/img/${value.img}" class="card-img-top" alt="Minhajuddin Kasman AR">
              <div class="card-body text-center">
                <h5 class="card-title ">${value.title}</h5>
                <p class="card-text">${value.description}</p>
                <div class="mt-4 mb-3">
                  <a href="showcase.html#${value.code}" class="btn-primary-azmi rounded-pill">View Details</a>
                </div>
                </div>
            </div>
          </div>`;
        $('#works').append(card_html);
      }
      else {
        var list = '<li class="list-group-item"><a href="#" data-code="' + value.code + '" class="text-danger show-project">' + value.title + '</a></li>';
        $('#projects').append(list);
      }
    });

    $('#projects').append('<li class="list-group-item">To be added..</li>');

    $('.show-project').click(function () {
      var code = $(this).data("code");
      $.get('works/works.json', function (data) {
        $.each(data, function (key, value) {
          if (value.code === code) {
            $.alert({
              title: value.title,
              content: '<img src="works/img/' + value.img + '" style="width:100%"><hr/><p class="text-center">' +
                value.description + '</p>',
              columnClass: 'col-md-8'
            });
          }
        });
      });

    });
  });

});

function renderWork(code) {

  $.get('works/works.json', function (data) {
    var exists = false;
    $.each(data, function (key, value) {
      if (value.code === code) {
        $('#title').html(value.title);
        $('#img').html('<img src="works/img/' + value.img + '" style="width:60%" class="shadow">');
        exists = true;
        document.title = value.title;
      }
    });
    if (!exists) {
      window.location.replace('index.html');
    }
  });

  $.get('works/post/' + code + '.html', function (data) {
    $('#content').html(data);
  });

}