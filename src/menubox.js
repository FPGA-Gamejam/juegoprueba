class menuBox{
  constructor(xCoor,yCoor,width,height){
    this.xCoor = xCoor;
    this.yCoor = yCoor;
    this.width = width;
    this.height = height;
    // Initial values
    this.locked = false;
    // Default values
    this.fillSelected = [ 255, 255, 255, 255 ];
    this.strokeWeightSelected = 3;
    this.strokeSelected = [ 255, 255, 255, 255 ];
    this.fillCliked   = [ 255, 0, 0, 255 ];
    this.strokeWeightClicked  = 3;
    this.strokeCliked   = [ 255, 255, 255, 255 ];
    this.fillInside   = [ 200, 50, 50, 190 ];
    this.strokeWeightInside = 3;
    this.strokeInside   = [ 200, 100, 100, 190 ];
    this.fillPasive   = [ 100, 50, 50, 150 ];
    this.strokeWeightPasive = 3;
    this.strokePasive   = [ 50, 50, 50, 150 ];
  }
  drawBox(){
    this.resolveColor();
    rect(this.xCoor, this.yCoor, this.width, this.height, 10);
  }
  isInside(){
  // true if (mouseCoords ~ inside box)
    if((mouseX>this.xCoor&&mouseX<(this.xCoor+this.width))
    &&(mouseY>this.yCoor&&mouseY<(this.yCoor+this.height))){
      return true;
    }
    else {
      return false;
    }
  }
  isClicked(){
  // true if click box
    if( ( mouseIsPressed ) && this.isInside() )
    {
      return true;
    }
    else {
      return false;
    }
  }

  isSelected(){
  // true if (click && drop) box
    if(this.locked){
       if(mouseIsPressed){
         return false;
       }
       else{
         this.locked = false;
         if(this.isInside()){
           return true;
         }
         else {
           return false;
         }
       }
    }
    else {
      if(this.isClicked()){
        this.locked = true;
      }
      return false;
    }
  }

  resolveColor(){
  // resuelve que color se dibuja en el box
    if(this.isSelected()){
      strokeWeight(this.strokeWeightSelected);
      stroke(this.strokeSelected);
      fill(this.fillSelected);
    }
    if(this.isClicked()){
      strokeWeight(this.strokeWeightClicked);
      stroke(this.strokeCliked);
      fill(this.fillCliked);
    }
    else if(this.isInside()){
      strokeWeight(this.strokeWeightInside);
      stroke(this.strokeInside);
      fill(this.fillInside);
    }
    else{
      strokeWeight(this.strokeWeightPasive);
      stroke(this.strokePasive);
      fill(this.fillPasive);
    }
  }

  setColorSelected(fill,stroke,strokeWeight){
    this.fillSelected   = fill;
    this.strokeSelected = stroke;
    this.strokeWeightSelected = strokeWeight;
  }

  setColorCliked(fill,stroke,strokeWeight){
    this.fillCliked = fill;
    this.strokeCliked = stroke;
    this.strokeWeightClicked = strokeWeight;
  }

  setColorInside(fill,stroke,strokeWeight){
    this.fillInside = fill;
    this.strokeInside = stroke;
    this.strokeWeightInside = strokeWeight;
  }

  setColorPasive(fill,stroke,strokeWeight){
    this.fillPasive = fill;
    this.strokePasive = stroke;
    this.strokeWeightPasive = strokeWeight;
  }

  insertText(texto,textoSize){
    textSize(textoSize).textAlign(CENTER,CENTER);
    this.texto = text(texto,
    this.xCoor,this.yCoor,this.width,this.height);
  }
}
