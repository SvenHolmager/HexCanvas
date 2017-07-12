


var game_core = function() {

	var dPosition = 5;
	var dZoom = 0.1;
	var dRotation = 30;
	var xCam = 0;
	var yCam = 0;
	var zoom = 2;
	var WIDTH =  600;
	var HEIGHT = 450;
	var rotation = 0;
	var boardSizeX = 6;
	var boardSizeY = 6;
	var Fields = [];
	
 	var Field = (function () {
        function Field(x, y) {
            this.Xpos = x;
            this.Ypos = y;
        }
        return Field;
    }());

	function clearCanvas() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
	}
	function circle(x,y,r) {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI*2, true);
		ctx.fill();
		ctx.stroke();
	}
	function rect(x,y,w,h) {
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}
	function hexagon(x,y,s) {
  		ctx.beginPath();
        ctx.moveTo(hexCornerX(x,0,s), hexCornerY(y,0,s));
        ctx.lineTo(hexCornerX(x,1,s), hexCornerY(y,1,s));
        ctx.lineTo(hexCornerX(x,2,s), hexCornerY(y,2,s));
        ctx.lineTo(hexCornerX(x,3,s), hexCornerY(y,3,s));
        ctx.lineTo(hexCornerX(x,4,s), hexCornerY(y,4,s));
        ctx.lineTo(hexCornerX(x,5,s), hexCornerY(y,5,s));
        ctx.closePath();
        ctx.stroke();
    }
	function init() {
		canvas = document.getElementById("viewport");
		ctx = canvas.getContext("2d");
		return setInterval(draw, 10);
	}
	function doKeyDown(evt){
		switch (evt.keyCode) {
			/* W was pressed */
			case 87: if (yCam - dPosition > -500) { yCam -= dPosition; } break;

 			/* S was pressed */
			case 83: if (yCam + dPosition < HEIGHT + 500) { yCam += dPosition; } break;

			/* A was pressed */
			case 65: if (xCam - dPosition > -500) { xCam -= dPosition; } break;

			/* D was pressed */	
			case 68: if (xCam + dPosition < WIDTH  + 500) { xCam += dPosition; } break;

 			/* Z was pressed */
			case 90: if (zoom >= 1) {zoom -= dZoom; } break;

			/* X was pressed */
			case 88: if (zoom <= 25) { zoom += dZoom; } break;

 			/* Q was pressed */
			case 81:  if (true) { rotation += dRotation; } break;

			/* E was pressed */
			case 69: if (true) { rotation -= dRotation; } break;
		}
	}

	function hexCornerX(cx,i,s) {
        var angle_deg = 60 * i + 30 + rotation;
        var angle_rad = Math.PI / 180 * angle_deg;
        return (cx + s * Math.cos(angle_rad));    
    }
    function hexCornerY(cy,i,s) {
        var angle_deg = 60 * i + 30 + rotation;
        var angle_rad = Math.PI / 180 * angle_deg;
        return (cy + s * Math.sin(angle_rad));    
    }
    
	function draw() {
		clearCanvas();
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";
		rect(0,0,WIDTH,HEIGHT);

		ctx.fillStyle = "purple";
		showCamera();
		showCoords();
		drawBoardFields();
	}

	function showCamera() {
		ctx.fillStyle = "purple";
		circle(WIDTH/2, HEIGHT/2, 2);
	}

	function showCoords() {
		ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.font = "10pt Arial";
        ctx.fillText(xCam + "," + yCam, WIDTH/2,  HEIGHT/2+20);
	}

	function drawBoardFields() {
		var size = 24 * zoom;
		var hexHeight = 2 * size;
		var hexWidth = Math.sqrt(3)/2 * hexHeight;
		var vertDist = hexHeight * 3/4;

		for (var i = 0; i < boardSizeX; i++) {
			for (var j = 0; j < boardSizeY; j++) {
				var hexPosX = WIDTH/2 + i * hexWidth + (j % 2) * 0.5*hexWidth - xCam;
				var hexPosY = HEIGHT/2 + j * vertDist - yCam;
 				
				hexagon(hexPosX, hexPosY, size);
			}
		}
	}

	init();

	window.addEventListener('keydown',doKeyDown,true);

	for (var x = 0; x < boardSizeX; ++x) {
        Fields[x] = [];
        for (var y = 0; y < boardSizeY; ++y) {
            Fields[x][y] = new Field(x, y);
        }
    }
};
