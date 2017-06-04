// function startPreview() {
//     document.querySelector('.container').classList.remove('hidden');
//     document.querySelector('.welcome-container').classList.add('hidden');
// }

$(document).ready(function () {

    setTimeout(function () {
        $('.welcome-container').removeClass('hidden');
    }, 1500);

    setTimeout(function () {
        $('.welcome-container').addClass('hidden');
        $('.carousel').removeClass('hidden');
    }, 2800);
})

// function clickLink(elSlide) {
//     $(elSlide).find('a').trigger('click');
//     $(elSlide).click(function (event) {
//         event.stopPropagation();
//     });
// }

$(".item").click(function() {
  window.location = $(this).find("a").attr("href"); 
  return false;
});