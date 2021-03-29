const rowResizer = () => {
    const bottomSide = document.querySelector('.DnD-side_bottom');
    const sideWrapper = document.querySelector('.side-wrapper');
    const main = document.querySelector('.DnD-main');
    const resizingLine = document.querySelector('.DnD-resizer_row');


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
        
        sideWrapper.style.height = `${newTop}px`;
        bottomSide.style.height = `${bottomEdge - sideWrapper.offsetHeight - 12}px`;
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