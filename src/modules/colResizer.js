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
        
        if (newLeft < 180) {
          newLeft = 180;
        } 

        if (newLeft > 1380) {
          newLeft = 1380;
        }

        let rightEdge = main.offsetWidth - resizingLine.offsetWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
        
        leftSide.style.width = `${newLeft}px`;
        rightSide.style.width = `${rightEdge - leftSide.offsetWidth}px`;
        resizingLine.style.left = `${newLeft}px`;
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