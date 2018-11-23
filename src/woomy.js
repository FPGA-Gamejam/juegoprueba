//woomy toma un xml y retorna objetos
class woomy {
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
	rect(node) {
		var obj = {
			type: "rect",
			x: node.getNum("x"),
			y: node.getNum("y"),
			width: node.getNum("width"),
			height: node.getNum("height"),
			label: node.getString("inkscape:label"),
		};
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
		return obj;
	}
}