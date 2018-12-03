//fade animations
document.addEventListener("DOMContentLoaded", function (event) {
	// elements with fade are equipt with the fade class name
    document.getElementById('fade1').className += ' fade';
    document.getElementById('fade6').className += ' fade';
    $('.storyPara').addClass('storyFadeOut');
});
// classes are removed after transition
$(function () {
    $('#fade1').removeClass('fade');
    $('#fade6').removeClass('fade');
});
// function used at the end of a scene to transition out
setTimeout(function () {
    document.addEventListener("wheel", function (e) {
        $('.storyPara').removeClass('storyFadeOut');
        e.preventDefault();
        $link = $("body").attr("href");
        $(".sceneIntroContainer").fadeOut(500, function () {
            window.location = $link;
        });
    });
}, 2700);
