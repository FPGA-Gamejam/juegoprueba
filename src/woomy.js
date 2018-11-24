//svgParser toma un xml y retorna objetos
//tambien hace otras cosas
class svgParser {
	constructor(path) {
		this.root = loadXML(path);
	}
	layer(label) {
		var objects = [];
		var layer;
		for (var i = 0; i != this.root.getChildren().length; i++) {
			var v = this.root.getChild(i);
			if (v.getName() == "g" && v.hasAttribute("inkscape:groupmode") && v.hasAttribute("inkscape:label")) {
				if (v.getString("inkscape:label") == label) {
					layer = v;
					break;
				}
			}
		}
		for (var i = 0; i != layer.getChildren().length; i++) {
			var v = layer.getChild(i);
			switch (v.getName()) {
				case "rect":
					objects.push(this.rect(v));
					break;
				case "path":
					objects.push(this.path(v));
					break;
				case "circle":
				case "ellipse":
					objects.push(this.circle(v));
					break;
			}
		}
		return objects;
	}
	//leer y aplciar operaciones de transformacion
	transform(node, obj) {
		if (!node.hasAttribute("transform")) {return};
		var cmds = ["matrix", "rotate", "translate"];
		var str = node.getString("transform");
	    var c = 0;
	    var ops = [];
	    while (c < str.length) {
	        for (var i = 0; i != cmds.length; i++) {
	            var n = str.substring(c).search(cmds[i]);
	            if (n != -1) {
	                n = n + c;
	                ops.push({
	                	type: cmds[i],
	                	input: str.substring(n + cmds[i].length + 1, str.substring(n + cmds[i].length).search(/[)]/g) + n + cmds[i].length),
	                	node: node,
	                });
	                c = n;
	                break;
	            }
	        }
	        c += 1;
	    }
	    for (var i = 0; i != ops.length; i++) {
	    	var op = ops[i];
	    	switch (ops[i].type) {
	    		case "matrix":
	    			this.matrix(node, obj, ops[i].input);
	    			break;
	    		case "rotate":
	    			this.rotate(node, obj, ops[i].input);
	    			break;
	    		case "translate":
	    			this.translate(node, obj, ops[i].input);
	    			break;
	    	}
	    }
	}
	matrix(node, obj, input) {
		var c = input.split(",");
		if (!obj.vertices) {return};
		for (var i = 0; i != obj.vertices.length; i++) {
			var v = obj.vertices[i];
			obj.vertices[i][0] = c[0] * v[0] + c[2] * v[1] + c[4];
			obj.vertices[i][1] = c[1] * v[0] + c[3] * v[1] + c[5];
		}
	}
	rotate(node, obj, input) {
		//dummy
	}
	translate(node, obj, input) {
		//dummy
	}
	rect(node) {
		var x = node.getNum("x");
		var y = node.getNum("y");
		var width = node.getNum("width");
		var height = node.getNum("height");
		var obj = {
			type: "rect",
			vertices: [[x, y], [x + width, y], [x + width, y + height], [x, y + height]],
			label: node.getString("inkscape:label"),
		};
		this.transform(node, obj);
		return obj;
	}
	path(node) {
		var vertices = [];
		var cmds = node.getString("d").split(" ");
		var cx = 0;
		var cy = 0;
		var cmd = "m";
		for (var i = 0; i != cmds.length; i++) {
			if (cmds[i].length == 1) {
				cmd = cmds[i];
				continue;
			}
			var v = cmds[i].split(",");
			v[0] = parseInt(v[0]);
			v[1] = parseInt(v[1]);
			//protocolo path svg
			//https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
			switch (cmd) {
				case "m":
				case "l":
					cx = cx + v[0];
					cy = cy + v[1];
					break;
				case "M":
				case "L":
					cx = v[0];
					cy = v[1];
					break;
				case "h":
					cx = cx + v[0];
					break;
				case "H":
					cx = v[0];
					break;
				case "v":
					cy = cy + v[0];
					break;
				case "V":
					cy = v[0];
					break;
			}
			vertices.push([cx, cy]);
		}
		var obj = {
			type: "path",
			vertices: vertices,
			label: node.getString("inkscape:label"),
		}
		this.transform(node, obj);
		return obj;
	}
	circle(node) {
		var obj = {
			type: "circle",
			x: node.getNum("cx"),
			y: node.getNum("cy"),
			label: node.getString("inkscape:label"),
		}
		if (node.getName() == "circle") {obj.r = node.getNum("r")}
		else if (node.getName() == "ellipse") {obj.r = node.getNum("rx")}
		this.transform(node, obj);
		return obj;
	}
}