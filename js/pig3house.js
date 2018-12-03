// radar animation function
function playRadar(x, y, color) {

    let xPos = x - 30;
    let yPos = y;
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
    document.getElementById('fade4').className += ' fade';
    document.getElementById('fade5').className += ' fade';
    $('.storyPara').addClass('storyFadeOut');
});

$(function () {
    $('#fade1').removeClass('fade');
    $('#fade2').removeClass('fade');
    $('#fade3').removeClass('fade');
    $('#fade4').removeClass('fade');
    $('#fade5').removeClass('fade');

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
    hayX = $("#staticMat1")[0].offsetLeft;
    hayY = $("#staticMat1")[0].offsetTop;
    stickX = $("#staticMat2")[0].offsetLeft;
    stickY = $("#staticMat2")[0].offsetTop;
    brickX = $("#staticMat3")[0].offsetLeft;
    brickY = $("#staticMat3")[0].offsetTop;
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

    if ((pigTarget == "#draggableMat1") && pig1Draggable) {
        if ((pigTarget != "#staticMat1") && (pigTarget != "#staticMat2") && (pigTarget != "#staticMat3")) {
            $(`${pigTarget}`).css({
                position: "absolute",
                left: mouseXPos - 40,
                top: mouseYPos - 60
            });
        }
    }

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


    if ((pigTarget != "#staticMat1") && (pigTarget != "#staticMat2") && (pigTarget != "#staticMat3")) {
        if (!hayTargetFilled) {
            if (((mouseXPos > (hayX - 25)) && (mouseXPos < (hayX + 125))) && ((mouseYPos > (hayY)) && (mouseYPos < (
                    hayY + 100)))) {
                $(`${pigTarget}`).css({
                    position: "absolute",
                    left: hayX - 15,
                    top: hayY - 15
                });
                scaleAnimation(pigTarget);
            }
        }
    }

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

document.addEventListener("dragend", function (event) {

    updateMatCoords();

    console.log("drag end");
    if (((mouseXPos > (brickX - 25)) && (mouseXPos < (brickX + 125))) && ((mouseYPos > (brickY)) && (mouseYPos <
            (brickY + 100)))) {
        brickTargetFilled = true;

        bricksPig = pigTarget;

        if (bricksPig == "#draggableMat1") {
            pig1Draggable = false;
        } else if (bricksPig == "#draggableMat2") {
            pig2Draggable = false;
        } else if (bricksPig == "#draggableMat3") {
            pig3Draggable = false;
        }
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
    // release object on spot and animate
    console.log("haytarget" + hayTargetFilled);
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


// function used at the end of a scene to transition out
function checkForEnd() {
    if ((pig1Draggable == false) && (pig2Draggable == false) && (pig3Draggable == false)) {
        console.log("finished");

        $("body").addClass("blackFade");
        $(".wolfChar").addClass("pointerNone");

        setTimeout(function () {

            $("#content").fadeOut(500, function () {

                window.location = "scene_pig3wolf.html";
            });
        }, 2500);

    }
}
