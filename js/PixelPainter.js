(function pixelPainter() {
  let isMouseDown = false;
  const mainDiv = document.getElementById('pixelPainter');

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
        cell.addEventListener('mousedown', paint);        //event listeners
        cell.addEventListener('mouseover', dragPaint);
        cell.addEventListener('mouseup', stopPaint)

        function paint(event) {                                     //paint on click
          event.target.style.backgroundColor = selectedColor;
          isMouseDown = true;
        }
        function dragPaint(event) {                                 //paint on drag
          if (!!isMouseDown) {
            event.target.style.backgroundColor = selectedColor;
          }
        }
        function stopPaint() {                                      //stop painting
          isMouseDown = false;
        }
      }
    }
  }

  generateCanvas(130, 200);

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
      if (selectedColor === 'black'){
        currentColor.style.color = 'white';
      }else{
        currentColor.style.color = 'black';
      }
    }
  }


  const eraseBut = document.createElement('div');
  eraseBut.id = 'erase';
  eraseBut.innerHTML = 'Erase'
  sidebar.appendChild(eraseBut);
  eraseBut.addEventListener('click', eraseWork)

  function eraseWork() {
    selectedColor = 'white';
    currentColor.innerHTML = 'Erase'
    currentColor.style.backgroundColor = null;
  }


  const clearBut = document.createElement('div');            //clear button, whites out screen
  clearBut.id = 'clear';
  clearBut.innerHTML = 'Clear';
  sidebar.appendChild(clearBut);
  clearBut.addEventListener('click', clearAll);

  function clearAll() {
    let cell = document.getElementsByClassName('columns');
    for (let i = 0; i < cell.length; i++) {
      cell[i].style.backgroundColor = 'white';
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
    for (let i = 0; i < swatches.length; i++){
      swatches[i].style.backgroundColor = generateRandomColor();
    }
  }

}());