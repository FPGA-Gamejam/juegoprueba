var hola;
var solidos = [];
var world;
var body;
function preload() {
    hola = new woomy("resources/levels/level_3.svg");
}

function setup() {
    canvas = createCanvas(1024, 768);
    canvas.drawingContext.imageSmoothingEnabled = false;

    world = new p2.World({gravity: [0, 90]});
    body = new p2.Body({mass: 0, position: [0, 0]});
    startpos = [body.position[0], body.position[1]];
    //carga de figuras del svg
    //**FLOOR**
    solidos = hola.layer("Floor");
    solidos.forEach(function(obj) {
        var shape;
        switch (obj.type) {
            //luego estos cases iran en otro .js
            //creo que es buena idea abstraer estas cosas feas
            case "rect":
            case "path":
                var tvertices = [];
                for (var i = 0; i != obj.vertices.length; i++) {
                    console.log(startpos);
                    tvertices[i] = [
                        obj.vertices[i][0] - body.position[0] + startpos[0],
                        obj.vertices[i][1] - body.position[1] + startpos[1],
                    ];
                }
                body.fromPolygon(tvertices);
                break;
        }
    })
    console.log(body.shapes);
    world.addBody(body);
    //**ENEMIES**
    enemyarray = [];
    enemies = hola.layer("Enemies");
    enemies.forEach(function(obj) {
        if (obj.type == "circle") {
            var enemybody = new p2.Body({mass: 5, position: [obj.x, obj.y]});
            var enemyshape = new p2.Circle({radius: obj.r});
            enemybody.addShape(enemyshape);
            world.addBody(enemybody);
            enemyarray.push(enemybody);
        }
    })

}

function draw() {
    background(255);
    world.step(1 / 60);

    //dibujar
    pip(body);
    enemyarray.forEach(function(enemy) {
        pip(enemy);
    });

    text("(0, 0)", 0, 10);
    text("(400, 300)", 400, 310);
    text("(800, 600)", 800, 610);
}

