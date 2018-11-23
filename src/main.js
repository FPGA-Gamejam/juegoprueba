var level;
function preload() {
    xml = loadXML("resources/levels/level_1.svg");
}

function setup() {
    canvas = createCanvas(800, 600);
    canvas.drawingContext.imageSmoothingEnabled = false;
    
    textos = [[]];
    populate(xml, textos[0]);
}

function populate(g, a) {
    if (g.hasChildren()) {
        g.forEach(function(h) {
            populate(h, a)
        })
    }
    
}

function draw() {

}
