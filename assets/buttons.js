// Button Cursor Tracking
document.querySelectorAll('.btn-cursor-tracking').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        btn.style.setProperty('--x', x + 'px');
        btn.style.setProperty('--y', y + 'px');
      });
});

// Button Cursor Tracking 2
document.querySelectorAll('.btn-cursor-tracking-2__inner').forEach(function(element) {
  element.addEventListener('mouseenter', function(e) {
      const parentOffset = element.getBoundingClientRect();
      let relX = e.clientX - parentOffset.left;
      let relY = e.clientY - parentOffset.top; 

      const circle = element.closest('.btn-cursor-tracking-2').querySelector('.btn-cursor-tracking-2__circle');

      circle.style.left = relX + 'px';
      circle.style.top = relY + 'px';
      circle.classList.remove('desplode-circle');
      circle.classList.add('explode-circle');
  });

  element.addEventListener('mouseleave', function(e) {
    const parentOffset = element.getBoundingClientRect();
      let relX = e.clientX - parentOffset.left;
      let relY = e.clientY - parentOffset.top;

      const circle = element.closest('.btn-cursor-tracking-2').querySelector('.btn-cursor-tracking-2__circle');

      circle.style.left = relX + 'px';
      circle.style.top = relY + 'px';
      circle.classList.remove('explode-circle');
      circle.classList.add('desplode-circle');
  });
});

// Button Cursor Tracking 3
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll('.btn-cursor-tracking-3');

  buttons.forEach(function(button) {
      button.addEventListener("mousemove", function(e) {
          callParallax(e, button);  
      });

      button.addEventListener("mouseleave", function() {
          resetParallax(button);
      });
  });

  function callParallax(e, button) {
      parallaxIt(e, button, 80);
  }

  function resetParallax(button) {
      animateElement(button, 0, 0);
  }

  function parallaxIt(e, button, movement) {
      const buttonRect = button.getBoundingClientRect();
      const relX = e.clientX - buttonRect.left;
      const relY = e.clientY - buttonRect.top;
      const targetX = (relX - buttonRect.width / 2) / buttonRect.width * movement;
      const targetY = (relY - buttonRect.height / 2) / buttonRect.height * movement;

      animateElement(button, targetX, targetY);
  }

  function animateElement(button, targetX, targetY) {
      const startX = parseFloat(button.dataset.x) || 0;
      const startY = parseFloat(button.dataset.y) || 0;
      const startTime = performance.now();

      function updateAnimation(currentTime) {
          const progress = Math.min((currentTime - startTime) / 300, 1);
          const easeProgress = easeOutQuad(progress);

          const newX = startX + (targetX - startX) * easeProgress;
          const newY = startY + (targetY - startY) * easeProgress;

          button.style.transform = `translate(${newX}px, ${newY}px)`;

          button.dataset.x = newX;
          button.dataset.y = newY;

          if (progress < 1) {
              requestAnimationFrame(updateAnimation);
          }
      }

      requestAnimationFrame(updateAnimation);
  }

  function easeOutQuad(t) {
      return t * (2 - t);
  }
});

// Button Play
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.btn-play');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const start = button.querySelectorAll('.btn-play__start');
      const stop = button.querySelectorAll('.btn-play__stop');

      button.classList.toggle('active');
      start.forEach(function (el) {
        el.classList.toggle('active');
      });
      stop.forEach(function (el) {
        el.classList.toggle('active');
      });

      stop.forEach(function (el) {
        if (el.classList.contains('active')) {
          el.classList.remove('pauseToPlay');
        } else {
          el.classList.add('pauseToPlay');
        }
      });
    });
  });
});

// Button Liquid
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn-liquid");
  
    buttons.forEach(button => {
      initButton(button);
    });
  });
  
  function initButton(button) {
    const pointsA = [],
          pointsB = [],
          points = 8,
          viscosity = 20,
          mouseDist = 70,
          damping = 0.05;
    
    let mouseX = 0,
        mouseY = 0,
        relMouseX = 0,
        relMouseY = 0,
        mouseLastX = 0,
        mouseLastY = 0,
        mouseSpeedX = 0,
        mouseSpeedY = 0;
  
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
  
    const canvas = document.createElement("canvas");
    button.appendChild(canvas);
  
    canvas.width = buttonWidth + 100;
    canvas.height = buttonHeight + 100;
    const context = canvas.getContext("2d");
  
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      mouseX = e.clientX;
      mouseY = e.clientY;
      relMouseX = mouseX - rect.left;
      relMouseY = mouseY - rect.top;
    });
  
    function mouseSpeed() {
      mouseSpeedX = mouseX - mouseLastX;
      mouseSpeedY = mouseY - mouseLastY;
      mouseLastX = mouseX;
      mouseLastY = mouseY;
      setTimeout(mouseSpeed, 50);
    }
    mouseSpeed();
  
    function addPoints(x, y) {
      pointsA.push(new Point(x, y, 1));
      pointsB.push(new Point(x, y, 2));
    }
  
    function Point(x, y, level) {
      this.x = this.ix = 50 + x;
      this.y = this.iy = 50 + y;
      this.vx = 0;
      this.vy = 0;
      this.level = level;
    }
  
    Point.prototype.move = function () {
      this.vx += (this.ix - this.x) / (viscosity * this.level);
      this.vy += (this.iy - this.y) / (viscosity * this.level);
  
      const dx = this.ix - relMouseX,
            dy = this.iy - relMouseY;
      const relDist = 1 - Math.sqrt(dx * dx + dy * dy) / mouseDist;
  
      if (relDist > 0 && relDist < 1) {
        this.vx = (mouseSpeedX / 4) * relDist;
        this.vy = (mouseSpeedY / 4) * relDist;
      }
  
      this.vx *= 1 - damping;
      this.vy *= 1 - damping;
      this.x += this.vx;
      this.y += this.vy;
    };
  
    let x = buttonHeight / 2;
    for (let j = 1; j < points; j++) {
      addPoints(x + ((buttonWidth - buttonHeight) / points) * j, 0);
    }
    addPoints(buttonWidth - buttonHeight / 5, 0);
    addPoints(buttonWidth + buttonHeight / 10, buttonHeight / 2);
    addPoints(buttonWidth - buttonHeight / 5, buttonHeight);
    for (let j = points - 1; j > 0; j--) {
      addPoints(x + ((buttonWidth - buttonHeight) / points) * j, buttonHeight);
    }
    addPoints(buttonHeight / 5, buttonHeight);
    addPoints(-buttonHeight / 10, buttonHeight / 2);
    addPoints(buttonHeight / 5, 0);
  
    function renderCanvas() {
      requestAnimationFrame(renderCanvas);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      pointsA.forEach(p => p.move());
      pointsB.forEach(p => p.move());
  
      context.fillStyle = "#1C74DC";
      context.beginPath();
      context.moveTo(pointsA[0].x, pointsA[0].y);
      pointsA.forEach((p, i) => {
        const nextP = pointsA[i + 1] || pointsA[0];
        const cx = (p.x + nextP.x) / 2;
        const cy = (p.y + nextP.y) / 2;
        context.quadraticCurveTo(p.x, p.y, cx, cy);
      });
      context.fill();
    }
  
    renderCanvas();
  }

  // Button Fantastic
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".btn-fantastic").forEach(function (btnFantastic) {
        let btnFantasticText = document.createElement("div");
        btnFantasticText.classList.add("btn-fantastic__text");
        while (btnFantastic.firstChild) {
            btnFantasticText.appendChild(btnFantastic.firstChild);
        }
        btnFantastic.appendChild(btnFantasticText);

        let btnFantasticTextClone = btnFantasticText.cloneNode(true);
        btnFantastic.appendChild(btnFantasticTextClone);

        for (let i = 0; i < 4; i++) {
            let twist = document.createElement("span");
            twist.classList.add("btn-fantastic__twist");
            btnFantastic.appendChild(twist);
        }
    });

    document.querySelectorAll(".btn-fantastic__twist").forEach(function (twist) {
        let width = twist.offsetWidth; 
        twist.style.width = (width + 3) + "px"
    });
});

// Button Ripple
document.querySelectorAll('.btn-ripple').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    btn.style.setProperty('--mouse-x', x + "px");
    btn.style.setProperty('--mouse-y', y + "px");
});
});

// Button Flipside
document.querySelectorAll('.btn-flipside').forEach(btn => {
  const html = document.querySelector('html')
  const btnFront = btn.querySelector( '.btn-flipside__front' )
  const btnClose = btn.querySelector( '.btn-flipside__back .btn-flipside__close' )
btnFront.addEventListener( 'click', function( event ) {
  const mx = event.clientX - btn.offsetLeft,
      my = event.clientY - btn.offsetTop;

  const w = btn.offsetWidth,
      h = btn.offsetHeight;
  
  const directions = [
    { id: 'top', x: w/2, y: 0 },
    { id: 'right', x: w, y: h/2 },
    { id: 'bottom', x: w/2, y: h },
    { id: 'left', x: 0, y: h/2 }
  ];
  
  directions.sort( function( a, b ) {
    return distance( mx, my, a.x, a.y ) - distance( mx, my, b.x, b.y );
  } );
  
  btn.setAttribute( 'data-direction', directions.shift().id );
  btn.classList.add( 'is-open' );
  html.classList.add( 'is-open' );
} );

btnClose.addEventListener( 'click', function( event ) {
  btn.classList.remove( 'is-open' );
  html.classList.remove( 'is-open' );
} );

function distance( x1, y1, x2, y2 ) {
  var dx = x1-x2;
  var dy = y1-y2;
  return Math.sqrt( dx*dx + dy*dy );
}
});

// Button Magnetic
document.querySelectorAll('.btn-magnetic__particles').forEach(btn => {
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.setProperty('--x', `${Math.random() * 200 - 100}px`);
    particle.style.setProperty('--y', `${Math.random() * 200 - 100}px`);
    particle.style.animation = `particleFloat ${1 + Math.random() * 2}s infinite`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    btn.appendChild(particle);
}
});

// Button Animate
const buttons = document.querySelectorAll(".btn-animate");
buttons.forEach((btn) => {
  const BUTTON_CONFIG = {
    text: {
      initial: btn.innerText.trim(), 
      clicked: btn.dataset.clicked
    },
    bgColor: {
      initial: "#1C74DC",
      clicked: "#0fcd81"
    }
  };

  const wrappedText = BUTTON_CONFIG.text.initial
  .split("")
  .map((letter) => `<span>${letter === " " ? "&nbsp;" : letter}</span>`)
  .join("");
btn.innerHTML = wrappedText;

  let btnClicked = false;
  btn.addEventListener("click", () => {
    btnClicked = !btnClicked;
    const txtToShow = btnClicked
      ? BUTTON_CONFIG.text.clicked
      : BUTTON_CONFIG.text.initial;
    let delay = 0;
    btn.querySelectorAll("span").forEach((sp, idx) => {
      setTimeout(() => {
        sp.style.translate = "0 -50px";
        setTimeout(() => {
          sp.innerHTML = txtToShow[idx] === ' ' ? '&nbsp;' : txtToShow[idx];
        }, 100);
        setTimeout(() => {
          sp.style.translate = "0";
        }, delay + 500);
      }, delay);
      delay += 30;
    });
    setTimeout(() => {
      btn.style.backgroundColor = btnClicked
        ? BUTTON_CONFIG.bgColor.clicked
        : BUTTON_CONFIG.bgColor.initial;
    }, delay);
  });
});

// Button Toggle
document.querySelectorAll('.btn-toggle__value').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const mainParent = btn.closest('.btn-toggle');
      const checkbox = mainParent.querySelector('.btn-toggle__value');
      
      if (checkbox.checked) {
        mainParent.classList.add('active');
      } else {
        mainParent.classList.remove('active');
      }
    });
  });
  
// Button Blubby
const animateButton = function(e) {
  e.preventDefault;
  e.target.classList.remove('animate');
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  }, 700);
};

const bubblyButtons = document.querySelectorAll('.btn-blubby');

for (let i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}
