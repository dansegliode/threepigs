// radar animation function
function playRadar(x, y, color) {

    let xPos = x;
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
        scale: 3,
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

function playScatter() {
    let piece1, piece2, piece3, piece1X, piece1Y, piece2X, piece2Y, piece3X, piece3Y;

    piece1 = $("#staticMat1");
    piece2 = $("#staticMat2");
    piece3 = $("#staticMat3");

    piece1X = piece1[0].offsetLeft;
    piece1Y = piece1[0].offsetTop;
    piece2X = piece2[0].offsetLeft;
    piece2Y = piece2[0].offsetTop;
    piece3X = piece3[0].offsetLeft;
    piece3Y = piece3[0].offsetTop;

    piece1.addClass("staticMat1Transition");
    piece2.addClass("staticMat2Transition");
    piece3.addClass("staticMat3Transition");
}

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('fade1').className += ' fade';
    document.getElementById('fade2').className += ' fade';
    document.getElementById('fade3').className += ' fade';
});

$(function () {
    $('#fade1').removeClass('fade');
    $('#fade2').removeClass('fade');
    $('#fade3').removeClass('fade');
});

let mouseXPos;
let mouseYPos;
let pigTarget;
let wolfDraggable = true;

document.addEventListener("dragover", function (event) {
    //updateMatCoords();
    mouseXPos = event.x;
    mouseYPos = event.y;
});


var img = new Image();
img.src = 'imgs/blank.png';

document.addEventListener("dragstart", function (event) {
    //updateMatCoords();
    pigTarget = "#" + event.path[1].id;
    event.dataTransfer.setData("text/plain", event.target.id);
    event.dataTransfer.setDragImage(img, 0, 0);

    scaleAnimation(pigTarget);

});

document.addEventListener("drag", function (event) {
    //updateMatCoords();

    if ((pigTarget == "#draggableMat1") && wolfDraggable) {
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
            playScatter();

        }
        if (wolfDraggable) {
            playRadar(wolfX, wolfY, "#FF0000");
            wolfDraggable = false;
            checkForEnd();
        }

        scaleAnimation(pigTarget);
    }
});


function checkForEnd() {
    $link = $("body").attr("href");


    setTimeout(function () {
        $("#content").fadeOut(500, function () {

            window.location = $link;
        });
    }, 2400);
    setTimeout(function () {
        $("body").removeClass("blackFade");
    }, 1900);
}