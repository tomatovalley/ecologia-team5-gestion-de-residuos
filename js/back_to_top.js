var back2top_btn = $('#back-to-top-button');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        back2top_btn.addClass('show');
    } else {
        back2top_btn.removeClass('show');
    }
});

back2top_btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
});