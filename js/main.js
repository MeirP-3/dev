$(window).on('load', function() {
    $('.welcome-container').removeClass('hidden');
    new Audio('sound/right.mp3').play();
    $('.welcome-container').on('animationend', function() {
        $('.welcome-container').addClass('hidden');
        $('.carousel').removeClass('hidden');
    });
});

$(".item").click(function () {
    window.location = $(this).find("a").attr("href");
    return false;
});