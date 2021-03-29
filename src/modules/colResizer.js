const colResizer = () => {
    const leftSide = document.querySelector('.DnD-side_left');
    const rightSide = document.querySelector('.DnD-side_right');
    const main = document.querySelector('.DnD-main');
    const resizingLine = document.querySelector('.DnD-resizer_col');


    // resize windows
    resizingLine.onmousedown = (event) => {
      event.preventDefault();
      let shiftX = event.clientX - resizingLine.getBoundingClientRect().left;

      const onMouseMove = (event) => {
        let newLeft = event.clientX - shiftX - main.getBoundingClientRect().left;
        let newRight = event.clientX - shiftX - main.getBoundingClientRect().right;
       // console.log(newLeft);
        console.log(newRight);
        
        if (newLeft < 180) {
          newLeft = 180;
        } 

       if (newRight > -180) {
          newLeft = newLeft - (190 + newRight);
        }
        
        let rightEdge = main.offsetWidth - (resizingLine.offsetWidth * 1.35);
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
        
        resizingLine.style.left = `${newLeft}px`;
        leftSide.style.width = `${newLeft}px`;
        rightSide.style.width = `${rightEdge - leftSide.offsetWidth}px`;
         
      };

      const onMouseUp = (event) => {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    resizingLine.ondragstart = () => false;
};

colResizer();