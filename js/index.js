// elements with fade are equipt with the fade class name
document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById('fade1').className += ' fade';
	document.getElementById('fade2').className += ' fade';
	document.getElementById('fade3').className += ' fade';
	document.getElementById('fade4').className += ' fade';
	document.getElementById('fade5').className += ' fade';
});
// classes are removed after transition
$(function () {
	$('#fade1').removeClass('fade');
	$('#fade2').removeClass('fade');
	$('#fade3').removeClass('fade');
	$('#fade4').removeClass('fade');
	$('#fade5').removeClass('fade');
});
// function used at the end of a scene to transition out
$("a").click(function (e) {
	e.preventDefault();
	$link = $(this).attr("href");
	$(".wrapper").fadeOut(500, function () {
		window.location = $link;
	});
});