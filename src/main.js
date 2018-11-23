var level;
var y = 10;
function preload() {
    xml = loadXML("resources/levels/level_3.svg");
}

function setup() {
    canvas = createCanvas(1800, 600);
    canvas.drawingContext.imageSmoothingEnabled = false;
    
    textos = [];
    populate(xml, textos);
    console.log("aver2");
}

function populate(g, a) {
    s = g.getName() + ": ";
    d = g.listAttributes();
    d.forEach(function(e) {
        s = s + e + " " + g.getString(e) + " ";
    })
    if (g.getName() != "#text") {
        a.push(s);
    }
    else {
        console.log(typeof(g));
    }
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
    y = 10;
    background(255);
    recursivedraw(textos, 0);
}
