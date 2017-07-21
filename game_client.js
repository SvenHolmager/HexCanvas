var game_client = function () {

    var canvasWidth = 800;
    var canvasHeight = 600;


	function init() {
        canvas = document.getElementById("viewport");
        ctx = canvas.getContext("2d");
        return setInterval(update, 10);
    }

    function update () {
        clearCanvas();
        drawCanvasBackground();
        drawWorldBoundary();
        drawPlayer();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function drawCanvasBackground() {
        ctx.fillStyle = "green";
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.rect(0, 0, canvasWidth, canvasHeight);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    function player(s, posX, posY) {
    	this.x1 = posX - s/2;
    	this y1 = posY - s/2;
    }

   	function createNewPlayer(name, posX, posY) {
	  	var obj = {};
	  	obj.name = name;
	  	obj.size = 20;
	  	obj.x1 = posX - size / 2;
	  	obj.y1 = posY - size / 2;
	  	obj.drawPlayer = function() {
		    var s = 10;
	    	var x1 = canvasWidth/2 - s/2;
	    	var y1 = canvasHeight/2 - s/2;
	    	ctx.fillStyle = "red";
	    	ctx.strokeStyle = "black";
	    	ctx.beginPath();
	    	ctx.rect(x1,y1,s,s);
		  	ctx.closePath();
	        ctx.fill();
	        ctx.stroke();
	  	};
	  	return obj;
	}

    function drawWorldBoundary () {
    	var s = 100;
    	var x1 = canvasWidth/2 - s/2;
    	var y1 = canvasHeight/2 - s/2;
    	ctx.fillStyle = "grey";
    	ctx.strokeStyle = "black";
    	ctx.beginPath();
    	ctx.rect(x1,y1,s,s);
	  	ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

	init();

	function doKeyDown(evt){
		switch (evt.keyCode) {
			/* W was pressed */
			case 87: if (yCam - 1 > -500) { yCam -= 1; } break;

 			/* S was pressed */
			case 83: if (yCam + 1 < HEIGHT + 500) { yCam += 1; } break;

			/* A was pressed */
			case 65: if (xCam - 1 > -500) { xCam -= 1; } break;

			/* D was pressed */	
			case 68: if (xCam + 1 < WIDTH  + 500) { xCam += 1; } break;
		}
	}
	window.addEventListener('keydown',doKeyDown,true);
}

