document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('fade1').className += ' fade';
    document.getElementById('fade6').className += ' fade';
    $('.whiteText').addClass('storyFadeOut');
});

$(function () {
    $('#fade1').removeClass('fade');
    $('#fade6').removeClass('fade');
});

setTimeout(function () {
    document.addEventListener("wheel", function (e) {
        $('.whiteText').removeClass('storyFadeOut');
        e.preventDefault();
        $link = $("body").attr("href");
        $(".sceneIntroContainer").fadeOut(500, function () {
            window.location = $link;
        });
    });
}, 2700);