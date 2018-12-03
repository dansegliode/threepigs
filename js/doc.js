document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('fade1').className += ' fade';
    document.getElementById('fade2').className += ' fade';
});

$(function () {
    $('#fade1').removeClass('fade');
    $('#fade2').removeClass('fade');
});

$(".back").click(function (e) {
    e.preventDefault();
    $link = $(this).attr("href");
    $(".content").fadeOut(500, function () {
        window.location = $link;
    });
});