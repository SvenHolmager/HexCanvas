var game = {};

window.onload = function () {

	//Create our game client instance.
    var game = new game_coree();  

     //Fetch the viewport
    game.viewport = document.getElementById('viewport');

    //Fetch the rendering contexts
    game.ctx = game.viewport.getContext('2d');

}; //window.onload