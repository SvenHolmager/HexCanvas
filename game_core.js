var game_core = function() {

	//Delta Values
	var dPosition = 2;
	var dZoom = 0.1;
	var dRotation = 3;

	//Game properties
	var zoom = 1;
	var WIDTH =  800;
	var HEIGHT = 600;
	var rotation = 0;
	var boardSizeX = 10;
	var boardSizeY = 10;
	var Fields = [];

	function clearCanvas() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
	};
	function circle(x,y,r) {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI*2, true);
		ctx.fill();
		ctx.stroke();
	};
	function rect(x,y,w,h) {
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	};

    //Main loop
	function init() {
		canvas = document.getElementById("viewport");
		ctx = canvas.getContext("2d");
		return setInterval(draw, 10);
	};


//Draw functions
	function draw() {
		clearCanvas();
		ctx.fillStyle = "lightgrey"; // background color
		rect(0,0,WIDTH,HEIGHT); // background color painting.
		drawBoardFields();  //draws fields on the map
		camera.draw(); // draws camera in middle of canvas
		showCoords(); // draws camera game pos 
		drawDevData();	//draws data on upper left side of canvas
	};

    function drawDevData() {
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.font = "10pt Arial";
        ctx.fillText("CamWorldPosX: " + camera.Xpos, 5, 20);

        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.font = "10pt Arial";
        ctx.fillText("CamWorldPosY: " + camera.Ypos, 5, 35);
        
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.font = "10pt Arial";
        ctx.fillText("Zoom: " + zoom, 5, 50);

        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.font = "10pt Arial";
        ctx.fillText("Move around on: WASDZX ", 5, 65);
    }

	function showCoords() {
		ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.font = "10pt Arial";
        ctx.fillText(camera.Xpos + "," + camera.Ypos, WIDTH/2,  HEIGHT/2+20);
	};

	function drawBoardFields() {
		for (var i = 0; i < Fields[0].length; i++) {
			for (var j = 0; j < Fields[1].length; j++) {
				Fields[i][j].draw();
			}
		}
	};

//Keyboard keypress listener and intepreter.
	function doKeyDown(evt){
		switch (evt.keyCode) {
			/* W was pressed */
			case 87: if (camera.Ypos >= 0) { camera.Ypos -= dPosition; } break;

 			/* S was pressed */
			case 83: if (camera.Ypos <= 440) { camera.Ypos += dPosition; } break;

			/* A was pressed */
			case 65: if (camera.Xpos >= 0) { camera.Xpos -= dPosition; } break;

			/* D was pressed */	
			case 68: if (camera.Xpos <= 560) { camera.Xpos += dPosition; } break;

 			/* Z was pressed */
			case 90: if (zoom >= 1) {zoom -= dZoom; } break;

			/* X was pressed */
			case 88: if (zoom <= 25) { zoom += dZoom; } break;

 			/* Q was pressed */
			case 81:  if (true) { rotation -= dRotation} break;

			/* E was pressed */
			case 69: if (true) { rotation += dRotation } break;
		}
	};

	init();

	window.addEventListener('keydown',doKeyDown,true);

 	var Field = (function () {
        function Field(x, y, color) {
            this.Xpos = x;
            this.Ypos = y;
            this.Color = color;
            this.size = 32 * zoom;
		 	this.hexHeight = 2 * this.size;
		 	this.hexWidth = Math.sqrt(3)/2 * this.hexHeight;
			this.vertDist = this.hexHeight * 3/4;
        }
        return Field;
    }());

	for (var x = 0; x < boardSizeX; ++x) {
        Fields[x] = [];
        for (var y = 0; y < boardSizeY; ++y) {
        	if ((y % 2) == 0 && (x % 2) == 0) {
            	Fields[x][y] = new Field(x, y, "green");
        	}
        	if ((y % 2) == 0 && (x % 2) == 1) {
            	Fields[x][y] = new Field(x, y, "blue");
        	} 
        	if ((y % 2) == 1 && (x % 2) == 0) {
        		Fields[x][y] = new Field(x, y, "green");
        	}
        	if ((y % 2) == 1 && (x % 2) == 1) {
        		Fields[x][y] = new Field(x, y, "green");
        	}
        }
    };

    Field.prototype.draw = function () {
		var hexPosX = ((((this.Xpos * this.hexWidth) + (this.Ypos % 2) * 0.5 * this.hexWidth - camera.Xpos)*zoom)+WIDTH/2);
		var hexPosY = (((this.Ypos * this.vertDist - camera.Ypos)*zoom) + HEIGHT/2);
		var var1 = Math.pow(WIDTH / 2 - hexPosX, 2);
		var var2 = Math.pow((HEIGHT / 2 - hexPosY), 2);
		var distanceFromCenter = Math.sqrt(var1 + var2);

		if (distanceFromCenter <= 200) {
			this.drawHexagon(hexPosX, hexPosY, this.size, this.Color);
        	this.drawHexagonData(hexPosX, hexPosY);
        }
    };

    Field.prototype.drawHexagon = function(x,y,s,color) {
    	ctx.fillStyle = color;
  		ctx.beginPath();
        ctx.moveTo(this.hexCornerX(x,0,s), this.hexCornerY(y,0,s));
        ctx.lineTo(this.hexCornerX(x,1,s), this.hexCornerY(y,1,s));
        ctx.lineTo(this.hexCornerX(x,2,s), this.hexCornerY(y,2,s));
        ctx.lineTo(this.hexCornerX(x,3,s), this.hexCornerY(y,3,s));
        ctx.lineTo(this.hexCornerX(x,4,s), this.hexCornerY(y,4,s));
        ctx.lineTo(this.hexCornerX(x,5,s), this.hexCornerY(y,5,s));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };

    Field.prototype.drawHexagonData = function(x, y) {
    	ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.font = "10pt Arial";
        ctx.fillText(this.Xpos + "," + this.Ypos, x-10, y+5);
    };

    Field.prototype.hexCornerX = function(cx,i,s) {
        var angle_deg = 60 * i + 30 + rotation;
        var angle_rad = Math.PI / 180 * angle_deg;
        return (cx + (s * Math.cos(angle_rad)) * zoom);    
    };
    
    Field.prototype.hexCornerY = function(cy,i,s) {
        var angle_deg = 60 * i + 30 + rotation;
        var angle_rad = Math.PI / 180 * angle_deg;
        return (cy + (s * Math.sin(angle_rad)) * zoom);    
    };

//Camera class and functions
	var Camera = (function () {
        function Camera() {
            this.Xpos = 220;
            this.Ypos = 200;
            this.Color = "red";
        }
        return Camera;
    }());
    camera = new Camera();

    Camera.prototype.draw = function () {
		ctx.fillStyle = this.Color;
		circle(WIDTH/2, HEIGHT/2, 4 * zoom);
    };
};
