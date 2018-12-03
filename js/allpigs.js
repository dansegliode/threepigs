	// radar animation function
	function playRadar(x, y, color) {

	    let xPos = x - 6;
	    let yPos = y - 6;
	    console.log(xPos + " " + yPos);
	    $("body").prepend(
	        '	<div id="radarEffect"><div id="functionBasedDelay"><div class="line"><div class="beam am"><div class="beam am"><div class="beam am"></div></div></div></div></div></div>'
	    );

	    $(".beam").css('box-shadow', '0px 0px 5px ' + `${color}`);
	    $(".beam").css('border', '2px solid ' + `${color}`);

	    $("#radarEffect").css({
	        position: "absolute",
	        left: xPos,
	        top: yPos
	    });

	    var functionBasedDelay = anime({
	        targets: '#functionBasedDelay .am ',
	        scale: 2,
	        opacity: 0,
	        loop: false,
	        elasticity: 0,
	        duration: 3000,
	        delay: function (el, i, l) {
	            return i * 100;
	        }
	    });

	    setTimeout(function () {
	        var element = document.body;
	        var child = document.getElementById("radarEffect");
	        element.removeChild(child);
	    }, 1000);

	}

	function scaleAnimation(obj) {
	    $(`${obj}`).addClass('boing');
	    setTimeout(function () {
	        $(`${obj}`).removeClass('boing');
	    }, 400);
	}

	document.addEventListener("DOMContentLoaded", function (event) {
	    document.getElementById('fade1').className += ' fade';
	    document.getElementById('fade2').className += ' fade';
	    document.getElementById('fade3').className += ' fade';
	    document.getElementById('fade6').className += ' fade';
	    $('.storyPara').addClass('storyFadeOut');
	});

	$(function () {
	    $('#fade1').removeClass('fade');
	    $('#fade2').removeClass('fade');
	    $('#fade3').removeClass('fade');
	    $('#fade6').removeClass('fade');

	});

	// drag and drop code
	let mouseXPos;
	let mouseYPos;
	let pigTarget;
	let stickTargetFilled = false;
	let hayTargetFilled = false;
	let brickTargetFilled = false;
	let pig1Draggable = true;
	let pig2Draggable = true;
	let pig3Draggable = true;
	let brickX;
	let brickY;
	let stickX;
	let stickY;
	let hayX;
	let hayY;
	let bricksPig, haysPig, sticksPig;
	let hayAnimationPlayed = false,
	    stickAnimationPlayed = false,
	    brickAnimationPlayed = false;

	function updateMatCoords() {
	    hayX = $("#hay1")[0].offsetLeft;
	    hayY = $("#hay1")[0].offsetTop;
	    stickX = $("#stick1")[0].offsetLeft;
	    stickY = $("#stick1")[0].offsetTop;
	    brickX = $("#brick1")[0].offsetLeft;
	    brickY = $("#brick1")[0].offsetTop;
	}

	updateMatCoords();

	document.onresize = function () {
	    updateMatCoords();
	};

	document.addEventListener("dragover", function (event) {
	    updateMatCoords();
	    mouseXPos = event.x;
	    mouseYPos = event.y;
	});
	var img = new Image();
	img.src = 'imgs/blank.png';
	document.addEventListener("dragstart", function (event) {
	    updateMatCoords();

	    pigTarget = "#" + event.path[1].id;
	    event.dataTransfer.setData("text/plain", event.target.id);

	    event.dataTransfer.setDragImage(img, 0, 0);

	    scaleAnimation(pigTarget);

	    console.log(pigTarget);

	});

	document.addEventListener("drag", function (event) {
	    updateMatCoords();
	    if ((pigTarget == "#pig1") && pig1Draggable) {
	        if ((pigTarget != "#hay1") && (pigTarget != "#stick1") && (pigTarget != "#brick1")) {
	            $(`${pigTarget}`).css({
	                position: "absolute",
	                left: mouseXPos - 50,
	                top: mouseYPos - 50
	            });
	        }
	    }

	    if ((pigTarget == "#pig2") && pig2Draggable) {
	        if ((pigTarget != "#hay1") && (pigTarget != "#stick1") && (pigTarget != "#brick1")) {
	            $(`${pigTarget}`).css({
	                position: "absolute",
	                left: mouseXPos - 50,
	                top: mouseYPos - 50
	            });
	        }
	    }

	    if ((pigTarget == "#pig3") && pig3Draggable) {
	        if ((pigTarget != "#hay1") && (pigTarget != "#stick1") && (pigTarget != "#brick1")) {
	            $(`${pigTarget}`).css({
	                position: "absolute",
	                left: mouseXPos - 50,
	                top: mouseYPos - 50
	            });
	        }
	    }


	    if ((pigTarget != "#hay1") && (pigTarget != "#stick1") && (pigTarget != "#brick1")) {
	        if (!hayTargetFilled) {
	            if (((mouseXPos > (hayX - 25)) && (mouseXPos < (hayX + 125))) && ((mouseYPos > (hayY - 25)) && (mouseYPos < (
	                    hayY + 125)))) {
	                $(`${pigTarget}`).css({
	                    position: "absolute",
	                    left: hayX,
	                    top: hayY
	                });
	                scaleAnimation(pigTarget);
	            }
	        }
	    }

	    stickX = $("#stick1")[0].offsetLeft;
	    stickY = $("#stick1")[0].offsetTop;
	    if ((pigTarget != "#hay1") && (pigTarget != "#stick1") && (pigTarget != "#brick1")) {
	        if (!stickTargetFilled) {
	            if (((mouseXPos > (stickX - 25)) && (mouseXPos < (stickX + 125))) && ((mouseYPos > (stickY - 25)) && (mouseYPos <
	                    (stickY + 125)))) {
	                $(`${pigTarget}`).css({
	                    position: "absolute",
	                    left: stickX,
	                    top: stickY
	                });
	                scaleAnimation(pigTarget);
	            }
	        }
	    }

	    brickX = $("#brick1")[0].offsetLeft;
	    brickY = $("#brick1")[0].offsetTop;
	    if ((pigTarget != "#hay1") && (pigTarget != "#stick1") && (pigTarget != "#brick1")) {
	        if (!brickTargetFilled) {
	            if (((mouseXPos > (brickX - 25)) && (mouseXPos < (brickX + 125))) && ((mouseYPos > (brickY - 25)) && (mouseYPos <
	                    (brickY + 125)))) {
	                $(`${pigTarget}`).css({
	                    position: "absolute",
	                    left: brickX,
	                    top: brickY
	                });
	                scaleAnimation(pigTarget);
	            }
	        }
	    }
	});

	document.addEventListener("dragend", function (event) {

	    updateMatCoords();

	    console.log("drag end");
	    if (((mouseXPos > (brickX - 25)) && (mouseXPos < (brickX + 125))) && ((mouseYPos > (brickY - 25)) && (mouseYPos <
	            (brickY + 125)))) {
	        brickTargetFilled = true;
	        bricksPig = pigTarget;
	        if (bricksPig == "#pig1") {
	            pig1Draggable = false;
	        } else if (bricksPig == "#pig2") {
	            pig2Draggable = false;
	        } else if (bricksPig == "#pig3") {
	            pig3Draggable = false;
	        }
	        checkForEnd();
	    }

	    if (((mouseXPos > (stickX - 25)) && (mouseXPos < (stickX + 125))) && ((mouseYPos > (stickY - 25)) && (mouseYPos <
	            (stickY + 125)))) {
	        stickTargetFilled = true;
	        sticksPig = pigTarget;
	        if (sticksPig == "#pig1") {
	            pig1Draggable = false;
	        } else if (sticksPig == "#pig2") {
	            pig2Draggable = false;
	        } else if (sticksPig == "#pig3") {
	            pig3Draggable = false;
	        }
	        checkForEnd();
	    }

	    if (((mouseXPos > (hayX - 25)) && (mouseXPos < (hayX + 125))) && ((mouseYPos > (hayY - 25)) && (mouseYPos < (hayY +
	            125)))) {
	        hayTargetFilled = true;
	        haysPig = pigTarget;
	        if (haysPig == "#pig1") {
	            pig1Draggable = false;
	        } else if (haysPig == "#pig2") {
	            pig2Draggable = false;
	        } else if (haysPig == "#pig3") {
	            pig3Draggable = false;
	        }
	        checkForEnd();
	    }
	    // release object on spot and animate
	    console.log("haytarget" + hayTargetFilled);
	    if (hayTargetFilled && !hayAnimationPlayed) {
	        playRadar(hayX, hayY, "#FFA800");
	        hayAnimationPlayed = true;


	    }
	    if (stickTargetFilled && !stickAnimationPlayed) {
	        playRadar(stickX, stickY, "#4EF24B");
	        stickAnimationPlayed = true;


	    }
	    if (brickTargetFilled && !brickAnimationPlayed) {
	        playRadar(brickX, brickY, "#DF5542");
	        brickAnimationPlayed = true;


	    }

	});



	function checkForEnd() {
	    if ((pig1Draggable == false) && (pig2Draggable == false) && (pig3Draggable == false)) {
	        $link = $("body").attr("href");
	        console.log("finished");
	        setTimeout(function () {
	            $(".pigsAndMaterials").fadeOut(500, function () {
	                window.location = $link;
	            });
	        }, 600)

	    }
	}