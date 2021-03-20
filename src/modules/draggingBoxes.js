const draggingBoxes = () => {
    const main = document.querySelector('.DnD-main');
    const boxes = document.querySelectorAll('.DnD-box');
    const leftSide = document.querySelector('.DnD-side_left');
    const rightSide = document.querySelector('.DnD-side_right');
    const droppableItems = document.querySelectorAll('.droppable');

    boxes.forEach((box) => {
      box.ondragstart = () => false;
      box.onmousedown = (event) => {
        event.preventDefault();
        let shiftX = event.clientX - box.getBoundingClientRect().left;
        let shiftY = event.clientY - box.getBoundingClientRect().top;
        
        box.style.cursor = 'grabbing';
        box.style.position = 'absolute';
        box.style.zIndex = 1000;
        droppableItems.forEach((item) => item.style.background = '#f5f2f2');
    
        const moveAt = ({ pageX, pageY }) => {
          box.style.left = `${pageX - shiftX - 8}px`;
          box.style.top = `${pageY - shiftY - 23}px`;
        };
    
        moveAt(event);
       
        const onMouseMove = (event) => {
    
          moveAt(event);
        }
    
        document.addEventListener('mousemove', onMouseMove);
    
        box.onmouseup = (event) => {
          box.hide = true;
          let elemsBelow = document.elementsFromPoint(event.clientX, event.clientY);
          box.hide = false;

          for (const index in elemsBelow) {
            const htmlElem = elemsBelow[index];
            if (htmlElem.classList.contains('droppable')) {
              htmlElem.append(box);
              break;
            }
          }
          box.style.cursor = 'grab';
          box.style.position = 'static';
          box.style.zIndex = 1;
          droppableItems.forEach((item) => item.style.background = '#f8f8f8');
          document.removeEventListener('mousemove', onMouseMove);
          box.onmouseup = null;
        }
      }
    });    
}

draggingBoxes();