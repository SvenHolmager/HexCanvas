

var game_coree = function () {

//Delta values for input
    var dPosition = 5;
    var dZoom = 0.1;
    var dRotation = 3;

//Static values for game
    var canvasWidth = 800;
    var canvasHeight = 600;
    var canvasCenterY = canvasHeight / 2;
    var canvasCenterX = canvasWidth / 2;

//Instantiated objects
    var world = new World(0, 0, 400, 400);  
    var cam = new Camera(400, 300);

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
        var angle_deg = 60 * i + 30 + world.rotation;
        var angle_rad = Math.PI / 180 * angle_deg;
        return (cx + s * Math.cos(angle_rad));
    }
    function hexCornerY(cy ,i ,s) {
        var angle_deg = 60 * i + 30 + world.rotation;
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
        world.draw();
        cam.drawDevData();
    }

    function loadFlowerBoard() {
        var size = (8 * world.zoom);
        var hexHeight = (2 * size);
        var hexWidth = (Math.sqrt(3)/ 2 * hexHeight);
        var vertDist = (hexHeight * 3 / 4);

        var hexPosX = canvasCenterX + i * hexWidth + (j % 2) * 0.5 * hexWidth;
        var hexPosY = canvasCenterY + j * vertDist;
    }

    function doKeyDown(evt) {
        switch (evt.keyCode) {
            /* W was pressed */
            case 87: if (cam.WorldPosY - dPosition > -500) { cam.WorldPosY -= dPosition; } break;

            /* S was pressed */
            case 83: if (cam.WorldPosY + dPosition < canvasHeight + 500) { cam.WorldPosY += dPosition; } break;

            /* A was pressed */
            case 65: if (cam.WorldPosX - dPosition > -500) { cam.WorldPosX -= dPosition; } break;

            /* D was pressed */
            case 68: if (cam.WorldPosX + dPosition < canvasWidth + 500) { cam.WorldPosX += dPosition; } break;

            /* Z was pressed */
            case 90: if (world.zoom >= 0.6) { world.zoom -= dZoom; } break;

            /* X was pressed */
            case 88: if (world.zoom <= 50) { world.zoom += dZoom; } break;

            /* Q was pressed */
            case 81: if (true) { world.rotation -= dRotation; } break;

            /* E was pressed */
            case 69: if (true) { world.rotation += dRotation; } break;
        }
    }

    init();

    window.addEventListener('keydown', doKeyDown, true);

//World class and functions
    function World(worldPosX, worldPosY, worldSizeX, worldSizeY) {
        this.zoom = 1;
        this.rotation = 0;
        this.WorldPosX = worldPosX;
        this.WorldPosY = worldPosY;
        this.WorldSizeX = worldSizeX;
        this.WorldSizeY = worldSizeY;
        this.BoardSizeX = 10;
        this.BoardSizeY = 10;
        var Fields = createFields();
     
    }

    World.prototype.draw = function () { 
        var relativeWidth = this.WorldSizeX * this.zoom;
        var relativeHeight = this.WorldSizeY * this.zoom; 
        ctx.fillStyle = "lavender";
        ctx.strokeStyle = "black";
        ctx.save();
        ctx.translate(cam.WorldPosX , cam.WorldPosY);
        ctx.rotate(this.rotation * Math.PI/180);
        ctx.fillRect(this.WorldPosX-relativeWidth/2, this.WorldPosY-relativeHeight/2, relativeWidth, relativeHeight);
        ctx.restore();
        this.drawFields();
    }
     World.prototype.createFields = function () {
        for (var x = 0; x < world.BoardSizeX; ++x) {
            Fields[x] = [];
            for (var y = 0; y < world.BoardSizeY; ++y) {
                Fields[x][y] = new Field(x, y);
            }
        }
        return Fields;
    };

    World.prototype.drawFields = function () {
        var size = 10;
        var hexHeight = 2 * size;
        var hexWidth = Math.sqrt(3) / 2 * hexHeight;
        var vertDist = hexHeight * 3 / 4;

        for (var i = 0; i < this.BoardSizeX; i++) {
            for (var j = 0; j < this.BoardSizeY; j++) {
                var hexPosX = this.WorldPosX + i * hexWidth + (j % 2) * 0.5 * hexWidth + cam.WorldPosX;
                var hexPosY = this.WorldPosY + j * vertDist + cam.WorldPosY;
               //var hexPosX = i * hexWidth + (j % 2) * 0.5 * hexWidth +
                drawHexagon(hexPosX, hexPosY, size);
            }
        }
    }

   
  
//Camera class and functions
    function Camera(posX, posY) {
        this.WorldPosX = posX;
        this.WorldPosY = posY;
    }
    Camera.prototype.drawDevData = function () {
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.font = "10pt Arial";
        ctx.fillText("CamCPosX: " + this.WorldPosX, 5, 20);

        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.font = "10pt Arial";
        ctx.fillText("CamCPosY: " + this.WorldPosY, 5, 35);
        
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.font = "10pt Arial";
        ctx.fillText("Zoom: " + world.zoom, 5, 50);
    }

    function Field(x, y, color) {
        this.Xpos = x;
        this.Ypos = y;
        this.Color = "#009933";
    }
}
   