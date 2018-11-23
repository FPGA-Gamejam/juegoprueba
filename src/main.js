var level;
function preload() {
    xml = loadXML("resources/levels/level_1.svg");
}

function setup() {
    canvas = createCanvas(800, 600);
    canvas.drawingContext.imageSmoothingEnabled = false;
    
    textos = [];
    populate(xml);
}

function populate(g) {
    textos.forEach(function(tex) {
        
    });
}

function draw() {

}
