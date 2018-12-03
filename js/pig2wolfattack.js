// radar animation function
// plays a radar animation at a user defined x y and with a user defined color

function playRadar(x, y, color) {
	// sets up two variables for later use with adjustments so they are more spot on

    let xPos = x;
    let yPos = y;
    console.log(xPos + " " + yPos);
	// adds html to the document that is the radar html

    $("body").prepend(
        '	<div id="radarEffect"><div id="functionBasedDelay"><div class="line"><div class="beam am"><div class="beam am"><div class="beam am"></div></div></div></div></div></div>'
    );
	// adds the neccessary css to the beam so the color is correct

    $(".beam").css('box-shadow', '0px 0px 5px ' + `${color}`);
    $(".beam").css('border', '2px solid ' + `${color}`);
	// places the beams in the right location absolute to the window

    $("#radarEffect").css({
        position: "absolute",
        left: xPos,
        top: yPos
    });
	// anime.js function based delay for animating the beams outward

    var functionBasedDelay = anime({
        targets: '#functionBasedDelay .am ',
        scale: 3,
        opacity: 0,
        loop: false,
        elasticity: 0,
        duration: 3000,
        delay: function (el, i, l) {
            return i * 100;
        }
    });
	// waiting time until the script deletes the beam allowing for another to be played

    setTimeout(function () {
		// grabs the body document because the radar effect is prepended it is a child and can be deleted with removeChild function

        var element = document.body;
        var child = document.getElementById("radarEffect");
        element.removeChild(child);
    }, 1000);

}
// scaling animation for the object being picked up

function scaleAnimation(obj) {
    $(`${obj}`).addClass('boing');
    setTimeout(function () {
        $(`${obj}`).removeClass('boing');
    }, 400);
}
// scatters elements
function playScatter() {
    let piece1, piece2, piece3, piece1X, piece1Y, piece2X, piece2Y, piece3X, piece3Y;
// assigns elements to a variable
    piece1 = $("#staticMat1");
    piece2 = $("#staticMat2");
    piece3 = $("#staticMat3");
// gets offset data
    piece1X = piece1[0].offsetLeft;
    piece1Y = piece1[0].offsetTop;
    piece2X = piece2[0].offsetLeft;
    piece2Y = piece2[0].offsetTop;
    piece3X = piece3[0].offsetLeft;
    piece3Y = piece3[0].offsetTop;
// adds animation class to elements
    piece1.addClass("staticMat1Transition");
    piece2.addClass("staticMat2Transition");
    piece3.addClass("staticMat3Transition");
}
// adding class names for the animation of all the fades used on this page
document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('fade1').className += ' fade';
    document.getElementById('fade2').className += ' fade';
    document.getElementById('fade3').className += ' fade';
});
// removing the fades on completion

$(function () {
    $('#fade1').removeClass('fade');
    $('#fade2').removeClass('fade');
    $('#fade3').removeClass('fade');
});

let mouseXPos;
let mouseYPos;
let pigTarget;
let wolfDraggable = true;
// updates coords on drag as well as mouse coordinates

document.addEventListener("dragover", function (event) {
    //updateMatCoords();
    mouseXPos = event.x;
    mouseYPos = event.y;
});

// used to keep the ghosting image from appearing when you drag an image
// adapted from https://kryogenix.org/code/browser/custom-drag-image.html
// creates a new image, sets the image to be the blank image, then an event listener that sets the image when the cursor starts dragging
var img = new Image();
img.src = 'imgs/blank.png';

document.addEventListener("dragstart", function (event) {
    //updateMatCoords();
    pigTarget = "#" + event.path[1].id;
    event.dataTransfer.setData("text/plain", event.target.id);
    event.dataTransfer.setDragImage(img, 0, 0);
// on drag it does the scale animation to the current target object
    scaleAnimation(pigTarget);

});

document.addEventListener("drag", function (event) {
    //updateMatCoords();
	// checks if the target is a certain pig and if it is pig1Draggable then checks to make sure it is not any of the objects
    if ((pigTarget == "#draggableMat1") && wolfDraggable) {
		// then sets the css of that target to the position of the mouse minus some pixels to place it better on screen
        $(`${pigTarget}`).css({
            position: "absolute",
            left: mouseXPos - 40,
            top: mouseYPos - 60
        });
    }

    hayX = $(".grayMatGroup")[0].offsetLeft;
    hayY = $(".grayMatGroup")[0].offsetTop;
    wolfX = $(".wolfChar")[0].offsetLeft;
    wolfY = $(".wolfChar")[0].offsetTop;

    if (((mouseXPos > (hayX - 45)) && (mouseXPos < (hayX + 50))) && ((mouseYPos > (hayY - 15)) && (mouseYPos <
            (hayY + 500)))) {
        console.log("there they go");
        if ((pigTarget == "#draggableMat1") && wolfDraggable) {
			// calls scattering function
            playScatter();

        }
        if (wolfDraggable) {
			// plays radar on wolfs location
            playRadar(wolfX, wolfY, "#FF0000");
            wolfDraggable = false;
            checkForEnd();
        }

        scaleAnimation(pigTarget);
    }
});

// function used at the end of a scene to transition out
function checkForEnd() {
    setTimeout(function () {
        $("#content").fadeOut(500, function () {

            window.location = "scene_pig3story.html";
        });
    }, 2400);
    setTimeout(function () {
        $("body").removeClass("blackFade");
    }, 1900);
}
