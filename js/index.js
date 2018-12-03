
	document.addEventListener("DOMContentLoaded", function(event) {
		document.getElementById('fade1').className += ' fade';
		document.getElementById('fade2').className += ' fade';
		document.getElementById('fade3').className += ' fade';
		document.getElementById('fade4').className += ' fade';
		document.getElementById('fade5').className += ' fade';
	});

	$(function() {
		$('#fade1').removeClass('fade');
		$('#fade2').removeClass('fade');
		$('#fade3').removeClass('fade');
		$('#fade4').removeClass('fade');
		$('#fade5').removeClass('fade');
	});

	$("a").click(function (e) {
		e.preventDefault();
		$link = $(this).attr("href");
		$(".wrapper").fadeOut(500, function () {
			window.location = $link;
		});
	});
