const rowResizer = () => {
    const leftSide = document.querySelector('.DnD-side_left');
    const rightSide = document.querySelector('.DnD-side_right');
    const bottomSide = document.querySelector('.DnD-side_bottom');
    const main = document.querySelector('.DnD-main');
    const resizingLine = document.querySelector('.DnD-resizer_row');
    const resizingColLine = document.querySelector('.DnD-resizer_col');


    // resize windows
    resizingLine.onmousedown = (event) => {
      event.preventDefault();
      let shiftY = event.clientY - resizingLine.getBoundingClientRect().top;

      const onMouseMove = (event) => {
        let newTop = event.clientY - shiftY - main.getBoundingClientRect().top;
        
        if (newTop < 175) {
          newTop = 175;
        } 

        if (newTop > 605) {
          newTop = 605;
        }

        let bottomEdge = main.offsetHeight - resizingLine.offsetHeight;
        if (newTop > bottomEdge) {
          newTop = bottomEdge;
        }
        
        leftSide.style.height = `${newTop}px`;
        rightSide.style.height = `${newTop}px`;
        resizingColLine.height = `${newTop}px`;
        bottomSide.style.height = `${bottomEdge - leftSide.offsetHeight - 12}px`;
        resizingLine.style.top = `${newTop}px`;
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

rowResizer();