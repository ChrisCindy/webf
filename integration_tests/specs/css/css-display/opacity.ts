describe('Opacity', () => {

  it('opacity', done => {
    const container1 = document.createElement('div');
    document.body.appendChild(container1);
    setElementStyle(container1, {
      backgroundColor: '#f40',
      width: '200px',
      height: '200px',
    });

    const container2 = document.createElement('div');
    container2.appendChild(document.createTextNode('opacity test'));
    setElementStyle(container2, {
      backgroundColor: '#999',
      width: '100px',
      height: '100px',
      opacity: 0,
    });

    container1.appendChild(container2);

    container1.addEventListener('click', () => {
      console.log('container clicked');
    });
    container2.addEventListener('click', () => {
      console.log('inner clicked');
    });

    requestAnimationFrame(async () => {
      setElementStyle(container2, {
        opacity: 0.5,
      });

      await snapshot(0.5);
      done();
    });
  });

  it('change from 1 to 0', async (done) => {
    let div1;
    let div = createElement(
     'div',
     {
       style: {},
     },
     [
       (div1 = createElement('div', {
         style: {
           backgroundColor: 'red',
           display: 'inline-block',
           height: '100px',
           width: '100px',
         },
       })),
       createElement('div', {
         style: {
           backgroundColor: 'green',
           display: 'inline-block',
           height: '100px',
           width: '100px',
         },
       }),
     ]
   );
   append(BODY, div);
   await snapshot();

   requestAnimationFrame(async () => {
     div1.style.opacity = 0;
     await snapshot();
     done();
   });
  });

  it('should work with value change to empty string', async (done) => {
    let div;
    let item;
    div = createElement(
    'div',
      {
        style: {
          width: '200px',
          height: '200px',
          background: 'yellow',
        },
      },
      [
        (item = createElement('div', {
          style: {
            width: '100px',
            height: '100px',
            backgroundColor: 'green',
            opacity: 0,
          }
        }))
      ]
    );

    document.body.appendChild(div);

    await snapshot();

    requestAnimationFrame(async () => {
      item.style.opacity = '';
      await snapshot();
      done();
    });
  });

  it('on before transform', async done => {
    const container1 = document.createElement('div');
    document.body.appendChild(container1);
    setElementStyle(container1, {
      backgroundColor: '#f40',
      width: '200px',
      height: '200px',
      opacity: 0,
			transform: 'scale(0.9)'
    });

    await snapshot();
    done();
  });

});
