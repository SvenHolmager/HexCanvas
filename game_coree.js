

var game_coree = function () {

//Delta values for input
    var dPosition = 5;
    var dZoom = 0.1;
    var dRotation = 3;

//Values for input
    var mapPositionX = 100;
    var mapPositionY = 100;
    var zoom = 1;
    var rotation = 0;

//Static values for game
    var canvasWidth = 800;
    var canvasHeight = 600;
    var canvasCenterY = canvasHeight / 2;
    var canvasCenterX = canvasWidth / 2;
    var boardSizeX = 30;
    var boardSizeY = 30;

//Instantiated objects
    var world = new World(0, 0, 400, 400);  
    var cam = new Camera(0, 0);

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
    function drawRect2D(x ,y ,w ,h) {
        var cx = canvasWidth/2;
        var cy = canvasHeight/2;
        var rw = (w/2 * zoom);
        var rh = (h/2 * zoom); 
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((rotation) * Math.PI/180);
        ctx.fillRect(x-rw, y-rh, rw*2, rh*2);
        ctx.restore();
    }
    function drawHexagon(x ,y ,s) {
        ctx.beginPath();
        ctx.moveTo(hexCornerX(x, 0, s), hexCornerY(y, 0, s));
        ctx.lineTo(hexCornerX(x, 1, s), hexCornerY(y, 1, s));
        ctx.lineTo(hexCornerX(x, 2, s), hexCornerY(y, 2, s));
        ctx.lineTo(hexCornerX(x, 3, s), hexCornerY(y, 3, s));
        ctx.lineTo(hexCornerX(x, 4, s), hexCornerY(y, 4, s));
        ctx.lineTo(hexCornerX(x, 5, s), hexCornerY(y, 5, s));
        ctx.closePath();
        ctx.stroke();
    }
    function hexCornerX(cx ,i ,s) {
        var angle_deg = 60 * i + 30 + rotation;
        var angle_rad = Math.PI / 180 * angle_deg;
        return (cx + s * Math.cos(angle_rad));
    }
    function hexCornerY(cy ,i ,s) {
        var angle_deg = 60 * i + 30 + rotation;
        var angle_rad = Math.PI / 180 * angle_deg;
        return (cy + s * Math.sin(angle_rad));
    }
    function init() {
        canvas = document.getElementById("viewport");
        ctx = canvas.getContext("2d");
        return setInterval(update, 10);
    }

    function update() {
        clearCanvas();
        drawCanvasBackground();
        drawWorld();
        cam.drawDevData();
        drawFields();
    }

    function drawWorld() {
        ctx.fillStyle = "lavender";
        ctx.strokeStyle = "black";
        world.draw(0,0, 400, 400);
    }

    function loadFlowerBoard() {
        var size = (8 * zoom);
        var hexHeight = (2 * size);
        var hexWidth = (Math.sqrt(3)/ 2 * hexHeight);
        var vertDist = (hexHeight * 3 / 4);

        var hexPosX = canvasCenterX + i * hexWidth + (j % 2) * 0.5 * hexWidth;
        var hexPosY = canvasCenterY + j * vertDist;
    }

    function drawFields() {
        var size = 8 * zoom;
        var hexHeight = 2 * size;
        var hexWidth = Math.sqrt(3) / 2 * hexHeight;
        var vertDist = hexHeight * 3 / 4;

        for (var i = 0; i < boardSizeX; i++) {
            for (var j = 0; j < boardSizeY; j++) {
                var hexPosX = canvasCenterX + i * hexWidth + (j % 2) * 0.5 * hexWidth + cam.PosX;
                var hexPosY = canvasCenterY + j * vertDist + cam.PosY;
                drawHexagon(hexPosX, hexPosY, size);
            }
        }
    }

    function doKeyDown(evt) {
        switch (evt.keyCode) {
            /* W was pressed */
            case 87: if (cam.PosY - dPosition > -500) { cam.PosY -= dPosition; } break;

            /* S was pressed */
            case 83: if (cam.PosY + dPosition < canvasHeight + 500) { cam.PosY += dPosition; } break;

            /* A was pressed */
            case 65: if (cam.PosX - dPosition > -500) { cam.PosX -= dPosition; } break;

            /* D was pressed */
            case 68: if (cam.PosX + dPosition < canvasWidth + 500) { cam.PosX += dPosition; } break;

            /* Z was pressed */
            case 90: if (zoom >= 0.6) { zoom -= dZoom; } break;

            /* X was pressed */
            case 88: if (zoom <= 50) { zoom += dZoom; } break;

            /* Q was pressed */
            case 81: if (true) { rotation -= dRotation; } break;

            /* E was pressed */
            case 69: if (true) { rotation += dRotation; } break;
        }
    }

    init();

    window.addEventListener('keydown', doKeyDown, true);

//World class and functions
    function World(posX, posY, width, height) {
        this.WorldPosX = posX;
        this.WorldPosY = posY;
        this.Width = width;
        this.Height = height;


    }
    World.prototype.draw = function () { 
        var relativeWidth = this.Width * zoom;
        var relativeHeight = this.Height * zoom; 
        ctx.save();
        ctx.translate(canvasCenterX + cam.PosX, canvasCenterY + cam.PosY);
        ctx.rotate((rotation) * Math.PI/180);
        ctx.fillRect(this.WorldPosX-relativeWidth/2, this.WorldPosY-relativeHeight/2, relativeWidth, relativeHeight);
        ctx.restore();
    }

//Camera class and functions
    function Camera(posX, posY) {
        this.PosX = posX;
        this.PosY = posY;
    }

    Camera.prototype.drawDevData = function () {
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.font = "10pt Arial";
        ctx.fillText("CamPosX: " + this.PosX, 5, 20);

        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.font = "10pt Arial";
        ctx.fillText("CamPosX: " + this.PosY, 5, 35);
        
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.font = "10pt Arial";
        ctx.fillText("ZoomLvl: " + zoom, 5, 50);
    }

    function Field(x, y) {
        this.Xpos = x;
        this.Ypos = y;
        }
    }   
    Field.prototype.draw = function() {
        
    }
}
   