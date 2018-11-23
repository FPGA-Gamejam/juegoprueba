var level;
var y = 0;
function preload() {
    xml = loadXML("resources/levels/level_3.svg");
}

function setup() {
    canvas = createCanvas(800, 600);
    canvas.drawingContext.imageSmoothingEnabled = false;
    
    textos = [];
    populate(xml, textos);
    console.log("aver");
}

function populate(g, a) {
    a.push(g.getName());
    if (g.hasChildren()) {
        var i = a.push([]);
        var c = g.getChildren();
        c.forEach(function(h) {
            populate(h, a[i - 1])
        })
    }
}

function recursivedraw(a, l) {
    if (typeof(a) == "string") {
        text(a, l * 10, y);
        y += 10;
    }
    else {
        a.forEach(function(b) {
            recursivedraw(b, l + 1);
        })
    }
}

function draw() {
    recursivedraw(textos, 0);
}
