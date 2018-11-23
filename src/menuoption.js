class menuOption{
  constructor(xCoor,yCoor,widthBox,heightBox,nBox,sepBox=10){
      this.xCoor = xCoor;
      this.yCoor = yCoor;
      this.widthBox = widthBox;
      this.heightBox = heightBox;
      this.nBox = nBox;
      this.sepBox = sepBox;
      this.createBoxes();
      // Iniciar
      this.textos =[];
      this.textoSize = 10;
      for(var i = 0; i<this.nBox;i ++)
      {
        this.textos[i] = "";
      }
  }
  createBoxes(){
    //this.boxes = [ new menuBox(this.xCoor,this.yCoor,
    //                          this.widthBox,this.heightBox)];
    this.boxes = [];
    for(var i = 0; i<this.nBox;i ++){
      this.boxes[i] = new menuBox(this.xCoor,
                            this.yCoor+i*this.heightBox+i*this.sepBox,
                            this.widthBox,
                            this.heightBox);
    }
  }
  drawMenu(){
    for(var i = 0; i<this.nBox;i ++){
      this.boxes[i].drawBox();
      stroke(0);
    	strokeWeight(5)
    	fill(255);
      this.updateText();
    }
  }
  getIndexSelected(){
    for(var i = 0; i<this.nBox;i ++){
      if(this.boxes[i].isSelected())
        return i;
    }
    return -1;
  }
  getIndexClicked(){
    for(var i = 0; i<this.nBox;i ++){
      if(this.boxes[i].isClicked())
        return i;
    }
    return -1;
  }
  getIndexInside(){
    for(var i = 0; i<this.nBox;i ++){
      if(this.boxes[i].isInside())
        return i;
    }
    return -1;
  }
  setColorSelected(fill,stroke,strokeWeight){
    for(var i = 0; i<this.nBox;i ++){
      this.boxes[i].setColorSelected(fill,stroke,strokeWeight);
    }
  }

  setColorCliked(fill,stroke,strokeWeight){
    for(var i = 0; i<this.nBox;i ++){
      this.boxes[i].setColorCliked(fill,stroke,strokeWeight);
    }
  }

  setColorInside(fill,stroke,strokeWeight){
    for(var i = 0; i<this.nBox;i ++){
      this.boxes[i].setColorInside(fill,stroke,strokeWeight);
    }
  }

  setColorPasive(fill,stroke,strokeWeight){
    for(var i = 0; i<this.nBox;i ++){
      this.boxes[i].setColorPasive(fill,stroke,strokeWeight);
    }
  }

  insertText(texto,textoSize,indice){
    this.textoSize = textoSize;
    for(var i=0; i<indice.length; i++){
      this.textos[indice[i]] = texto[i];
    }
  }

  updateText(){
    for(var i=0; i<this.nBox; i++){
      this.boxes[i].insertText(this.textos[i],this.textoSize);
    }
  }

}
