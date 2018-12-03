// radar animation function
// plays a radar animation at a user defined x y and with a user defined color

function playRadar(x, y, color) {
    // sets up two variables for later use with adjustments so they are more spot on

    let xPos = x - 30;
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
        scale: 2,
        opacity: 0,
        loop: false,
        elasticity: 0,
        duration: 3000,
        delay: function(el, i, l) {
            return i * 100;
        }
    });
    // waiting time until the script deletes the beam allowing for another to be played
    setTimeout(function() {
        var element = document.body;
        var child = document.getElementById("radarEffect");
        element.removeChild(child);
    }, 1000);

}
// scaling animation for the object being picked up

function scaleAnimation(obj) {
    $(`${obj}`).addClass('boing');
    setTimeout(function() {
        $(`${obj}`).removeClass('boing');
    }, 400);
}
// adding class names for the animation of all the fades used on this page
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('fade1').className += ' fade';
    document.getElementById('fade2').className += ' fade';
    document.getElementById('fade3').className += ' fade';
    document.getElementById('fade4').className += ' fade';
    document.getElementById('fade5').className += ' fade';
    $('.storyPara').addClass('storyFadeOut');
});
// removing the fades on completion
$(function() {
    $('#fade1').removeClass('fade');
    $('#fade2').removeClass('fade');
    $('#fade3').removeClass('fade');
    $('#fade4').removeClass('fade');
    $('#fade5').removeClass('fade');

});
// custom drag and drop code because we could not find anything that fit our DOMContentLoaded
// declaration of all the global variables used, they are to be accessed by different functions so they need to be global
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
//  grabbing the material coordinates by accessing their DOM attributes, first it grabs the object by its ID with jquery then goes to the first attribute which is array position 0 then accessed their offsets because they are absolute to the page and are the best representation of true coordinates
function updateMatCoords() {
    hayX = $("#staticMat1")[0].offsetLeft;
    hayY = $("#staticMat1")[0].offsetTop;
    stickX = $("#staticMat2")[0].offsetLeft;
    stickY = $("#staticMat2")[0].offsetTop;
    brickX = $("#staticMat3")[0].offsetLeft;
    brickY = $("#staticMat3")[0].offsetTop;
}
// initial update to coordinates
updateMatCoords();
// updates item position on resize
document.onresize = function() {
    updateMatCoords();
};
// updates coords on drag as well as mouse coordinates
document.addEventListener("dragover", function(event) {
    updateMatCoords();
    mouseXPos = event.x;
    mouseYPos = event.y;
});
// used to keep the ghosting image from appearing when you drag an image
// adapted from https://kryogenix.org/code/browser/custom-drag-image.html
// creates a new image, sets the image to be the blank image, then an event listener that sets the image when the cursor starts dragging

var img = new Image();
img.src = 'imgs/blank.png';
document.addEventListener("dragstart", function(event) {
    updateMatCoords();
    pigTarget = "#" + event.path[1].id;
    event.dataTransfer.setData("text/plain", event.target.id);

    event.dataTransfer.setDragImage(img, 0, 0);

    scaleAnimation(pigTarget);
    // on drag it does the scale animation to the current target object
    console.log(pigTarget);

});
// during the drag function
document.addEventListener("drag", function(event) {
    // updates coordinates

    updateMatCoords();
    // checks if the target is a certain pig and if it is pig1Draggable then checks to make sure it is not any of the objects

    if ((pigTarget == "#draggableMat1") && pig1Draggable) {
        if ((pigTarget != "#staticMat1") && (pigTarget != "#staticMat2") && (pigTarget != "#staticMat3")) {
            // then sets the css of that target to the position of the mouse minus some pixels to place it better on screen

            $(`${pigTarget}`).css({
                position: "absolute",
                left: mouseXPos - 40,
                top: mouseYPos - 60
            });
        }
    }
    // then subsequent pigs are checked
    if ((pigTarget == "#draggableMat2") && pig2Draggable) {
        if ((pigTarget != "#staticMat1") && (pigTarget != "#staticMat2") && (pigTarget != "#staticMat3")) {
            $(`${pigTarget}`).css({
                position: "absolute",
                left: mouseXPos - 40,
                top: mouseYPos - 60
            });
        }
    }

    if ((pigTarget == "#draggableMat3") && pig3Draggable) {
        if ((pigTarget != "#staticMat1") && (pigTarget != "#staticMat2") && (pigTarget != "#staticMat3")) {
            $(`${pigTarget}`).css({
                position: "absolute",
                left: mouseXPos - 40,
                top: mouseYPos - 60
            });
        }
    }

    // then it checks if the target object is any material, and is that material is filled or not and then sees if the mouse position is in the hit box of that object. this allows for the user to drag objects over another object

    if ((pigTarget != "#staticMat1") && (pigTarget != "#staticMat2") && (pigTarget != "#staticMat3")) {
        // if a material is filled

        if (!hayTargetFilled) {
            // then if the cursor is in a certain location reelative to the filled checker object

            if (((mouseXPos > (hayX - 25)) && (mouseXPos < (hayX + 125))) && ((mouseYPos > (hayY)) && (mouseYPos < (
                    hayY + 100)))) {
                // sets that object to snap into place of the old object

                $(`${pigTarget}`).css({
                    position: "absolute",
                    left: hayX - 15,
                    top: hayY - 15
                });
                // animates on snap

                scaleAnimation(pigTarget);
            }
        }
    }
    // updates coordinates of a material, selected based on its DOM attributes offset

    stickX = $("#staticMat2")[0].offsetLeft;
    stickY = $("#staticMat2")[0].offsetTop;
    if ((pigTarget != "#staticMat1") && (pigTarget != "#staticMat2") && (pigTarget != "#staticMat3")) {
        if (!stickTargetFilled) {
            if (((mouseXPos > (stickX - 25)) && (mouseXPos < (stickX + 125))) && ((mouseYPos > (stickY)) && (mouseYPos <
                    (stickY + 100)))) {
                $(`${pigTarget}`).css({
                    position: "absolute",
                    left: stickX - 15,
                    top: stickY - 15
                });
                scaleAnimation(pigTarget);
            }
        }
    }

    brickX = $("#staticMat3")[0].offsetLeft;
    brickY = $("#staticMat3")[0].offsetTop;
    if ((pigTarget != "#staticMat1") && (pigTarget != "#staticMat2") && (pigTarget != "#staticMat3")) {
        if (!brickTargetFilled) {
            if (((mouseXPos > (brickX - 25)) && (mouseXPos < (brickX + 125))) && ((mouseYPos > (brickY)) && (mouseYPos <
                    (brickY + 100)))) {
                $(`${pigTarget}`).css({
                    position: "absolute",
                    left: brickX - 15,
                    top: brickY - 15
                });
                scaleAnimation(pigTarget);
            }
        }
    }
});

document.addEventListener("dragend", function(event) {

    updateMatCoords();

    console.log("drag end");
    // when the drag ends it sees where the mouse is, if it is on a certain object, and the checks if all the objects are in their spot

    if (((mouseXPos > (brickX - 25)) && (mouseXPos < (brickX + 125))) && ((mouseYPos > (brickY)) && (mouseYPos <
            (brickY + 100)))) {
        // if it is the object it is checking for it sets its target to be filled

        brickTargetFilled = true;
        // it then sets the one object to the current object

        bricksPig = pigTarget;
        // sees which object equals the dropped object

        if (bricksPig == "#draggableMat1") {
            // if this happens to be the object it sets its draggability to false

            pig1Draggable = false;
        } else if (bricksPig == "#draggableMat2") {
            pig2Draggable = false;
        } else if (bricksPig == "#draggableMat3") {
            pig3Draggable = false;
        }
        // checks if the end is true

        checkForEnd();
    }

    if (((mouseXPos > (stickX - 25)) && (mouseXPos < (stickX + 125))) && ((mouseYPos > (stickY)) && (mouseYPos <
            (stickY + 100)))) {
        stickTargetFilled = true;

        sticksPig = pigTarget;

        if (sticksPig == "#draggableMat1") {
            pig1Draggable = false;
        } else if (sticksPig == "#draggableMat2") {
            pig2Draggable = false;
        } else if (sticksPig == "#draggableMat3") {
            pig3Draggable = false;
        }
        checkForEnd();
    }

    if (((mouseXPos > (hayX - 25)) && (mouseXPos < (hayX + 125))) && ((mouseYPos > (hayY)) && (mouseYPos < (hayY +
            100)))) {
        hayTargetFilled = true;

        haysPig = pigTarget;

        if (haysPig == "#draggableMat1") {
            pig1Draggable = false;
        } else if (haysPig == "#draggableMat2") {
            pig2Draggable = false;
        } else if (haysPig == "#draggableMat3") {
            pig3Draggable = false;
        }
        checkForEnd();
    }

    console.log("haytarget" + hayTargetFilled);
    // when an object is filled in it sees which object it is then plays the radar effect at that objects location

    if (hayTargetFilled && !hayAnimationPlayed) {
        $(`${pigTarget}`).addClass("pointerNone");
        playRadar(hayX, hayY, "#DF5542");
        hayAnimationPlayed = true;


    }
    if (stickTargetFilled && !stickAnimationPlayed) {
        $(`${pigTarget}`).addClass("pointerNone");
        playRadar(stickX, stickY, "#DF5542");
        stickAnimationPlayed = true;


    }
    if (brickTargetFilled && !brickAnimationPlayed) {
        $(`${pigTarget}`).addClass("pointerNone");
        playRadar(brickX, brickY, "#DF5542");
        brickAnimationPlayed = true;


    }

});

// function to check if all objects are filled in
// function used at the end of a scene to transition out
function checkForEnd() {
    if ((pig1Draggable == false) && (pig2Draggable == false) && (pig3Draggable == false)) {
        // if they are filled in, then it sets the body href to a link variable and after a fade it sends the user to that href
        // sets a variable as the bodys href
        console.log("finished");

        $("body").addClass("blackFade");
        $(".wolfChar").addClass("pointerNone");

        setTimeout(function() {

            $("#content").fadeOut(500, function() {
                // tells the browser to go to the new location
                window.location = "scene_pig3wolf.html";
            });
        }, 2500);

    }
}
