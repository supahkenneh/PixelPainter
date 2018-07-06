(function pixelPainter() {
  const mainDiv = document.getElementById('pixelPainter');
  let isMouseDown = false;

  const sidebar = document.createElement('div');        //side bar - contains swatch/buttons
  sidebar.id = 'side';                                  //append swatch to here
  mainDiv.appendChild(sidebar);

  const drawDiv = document.createElement('div');       //canvas div - contains canvas
  drawDiv.id = 'canvas';                               //append drawing pad to here
  mainDiv.appendChild(drawDiv);

  function generateCanvas(height, width) {
    for (let i = 0; i < height; i++) {                 //creates rows, sets height for canvas 
      let row = document.createElement('div');
      row.className = 'rows';
      drawDiv.appendChild(row);

      for (let j = 0; j < width; j++) {                //creates columns, sets width for canvas
        let cell = document.createElement('div');
        cell.className = 'columns';
        drawDiv.appendChild(cell);
        cell.style.display = 'inline-block';
        cell.addEventListener('mousedown', paint);        //event listeners for drawing
        cell.addEventListener('mouseover', dragPaint);
        cell.addEventListener('mouseup', stopPaint)
        document.body.addEventListener('mouseup', stopPaint)

        function paint(event) {                                     //draw on click
          event.target.style.backgroundColor = selectedColor;
          isMouseDown = true;
        }
        function dragPaint(event) {                                 //draw on drag
          if (!!isMouseDown) {
            event.target.style.backgroundColor = selectedColor;
          }
        }
        function stopPaint() {                                      //stop drawing
          isMouseDown = false;
        }
      }
    }
  }

  generateCanvas(110, 200);

  let selectedColor;                                         //contains color that is selected

  let colorSwatch = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple', 'black', 'goldenrod', 'pink', 'coral', 'navajowhite', 'lightgreen', 'cornflowerblue', 'orchid', 'slateblue', 'gray', 'lightgray', 'saddlebrown', 'sienna']

  let swatchRow = document.createElement('div');             //creates swatch, CSS displays as grid
  swatchRow.className = 'swatch-rows';
  sidebar.appendChild(swatchRow);

  const currentColor = document.createElement('div');        //Shows current color
  currentColor.id = 'current';
  sidebar.appendChild(currentColor);
  currentColor.innerHTML = 'Current Color'


  for (let j = 0; j < 20; j++) {
    let swatchCells = document.createElement('div');
    swatchCells.className = 'swatch-cells';
    sidebar.appendChild(swatchCells);
    swatchCells.style.backgroundColor = colorSwatch[j];
    swatchCells.style.display = 'inline-block';
    swatchCells.addEventListener('click', selectColor);     //event listener, click to select color

    function selectColor() {
      selectedColor = swatchCells.style.backgroundColor;
      currentColor.style.backgroundColor = selectedColor;
      currentColor.innerHTML = 'Current Color';
      if (selectedColor === 'black') {
        currentColor.style.color = 'white';
      } else {
        currentColor.style.color = 'black';
      }
    }
  }

  const eraseBut = document.createElement('div');         //erase feature
  eraseBut.id = 'erase';
  eraseBut.innerHTML = 'Erase'
  sidebar.appendChild(eraseBut);
  eraseBut.addEventListener('click', eraseWork)

  function eraseWork() {
    selectedColor = 'white';
    currentColor.innerHTML = 'Erase'
    currentColor.style.backgroundColor = null;
  }


  const clearBut = document.createElement('div');            //clear button
  clearBut.id = 'clear';
  clearBut.innerHTML = 'Clear';
  sidebar.appendChild(clearBut);
  clearBut.addEventListener('click', clearAll);

  function clearAll() {
    let cell = document.getElementsByClassName('columns');
    for (let i = 0; i < cell.length; i++) {
      cell[i].style.backgroundColor = null;
    }
  }

  const randomBut = document.createElement('div');        //random button, changes swatch
  randomBut.id = 'randomize';
  randomBut.innerHTML = 'Change Colors';
  sidebar.appendChild(randomBut);
  randomBut.addEventListener('click', randomColors);

  function generateRandomColor() {
    let letters = '0123456789ABCDEF';
    let hex = '#';
    for (let i = 0; i < 6; i++) {
      hex += letters[Math.floor(Math.random() * 16)];
    };
    return hex;
  }

  function randomColors() {
    let swatches = document.getElementsByClassName('swatch-cells');
    for (let i = 0; i < swatches.length; i++) {
      swatches[i].style.backgroundColor = generateRandomColor();
    }
  }


  //Fill Feature

  const fillBut = document.createElement('div');
  fillBut.id = 'fill';
  fillBut.innerHTML = 'Fill';
  sidebar.appendChild(fillBut);
  fillBut.addEventListener('click', toggleFill);
  let fillStatus = false;

  function toggleFill(){                              //toggles between fill and draw
    if (fillStatus === false){
      fillStatus = true;
        currentColor.innerHTML = 'Fill';
        fillBut.style.backgroundColor = 'cornflowerblue';
        let cell = document.getElementsByClassName('columns');
        for (let i = 0; i < cell.length; i++){
          cell[i].addEventListener('click', fillArea)
        }
    
        function fillArea() {
          for (let j = 0; j < cell.length; j++){
            if (!!this.style.backgroundColor){
              this.nextSibling.style.backgroundColor = selectedColor;
              this.previousSibling.style.backgroundColor = selectedColor;
            }
          }
        }
    }else{
      fillStatus = false;
      currentColor.innerHTML = 'Current Color';
      fillBut.style.backgroundColor = 'lightcyan';
    }
  }


}());