if (document.URL.match( /study/ )) {
  function timer() {
    
    //タイマー
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');

    let startTime;
    let timeLeft;
    let timeToCountDown = 25 * 60 * 1000;
    let timerId;
    let isRunning = false;
  
    function updateTimer(t) {
      let d = new Date(t);
      let m = d.getMinutes();
      let s = d.getSeconds();
      let timerString;
      m = ('0' + m).slice(-2);
      s = ('0' + s).slice(-2);
      timerString = m + ':' + s; 
      timer.textContent = timerString;
      document.title = timerString;
    }
  
    function countDown() {
      timerId = setTimeout(function() {
        timeLeft = timeToCountDown - (Date.now() - startTime);
        if (timeLeft < 0) {
          isRunning = false;
          start.textContent = 'Start';
          clearTimeout(timerId);
          timeLeft = 0;
          timeToCountDown = 0;
          updateTimer(timeLeft);
          document.getElementById('open').click();
          return;
        }
        updateTimer(timeLeft);
        countDown();
      }, 10);
    }
  
  
    start.addEventListener('click', () => {
      if (isRunning === false) {
        isRunning = true;
        start.textContent = 'Stop';
        startTime = Date.now();
        countDown();
      } else {
        isRunning = false;
        start.textContent = 'Start';
        timeToCountDown = timeLeft;
        clearTimeout(timerId);
      }
    });
   
  //  min.addEventListener('click', () => {
  //    if (isRunning === true) {
  //      return;
  //    }
  //    timeToCountDown += 60 * 1000;
  //    if (timeToCountDown >= 60 * 60 * 1000) {
  //     timeToCountDown = 0;
  //   }
  //    updateTimer(timeToCountDown);
  //  });
   
  //  sec.addEventListener('click', () => {
  //   if (isRunning === true) {
  //     return;
  //   }
  //    timeToCountDown += 1000;
  //    if (timeToCountDown >= 60 * 60 * 1000) {
  //      timeToCountDown = 0;
  //    }
  //    updateTimer(timeToCountDown);
  //  });
   
    // reset.addEventListener('click', () => {
    //   timeToCountDown = 25 * 60 * 1000;
    //   updateTimer(timeToCountDown);
    // });

   
    //モーダルウィンドウ 
    const open = document.getElementById('open');
    const rest = document.getElementById('rest');
    const keep = document.getElementById('keep');
    const modal = document.getElementById('modal');
    const mask = document.getElementById('mask');
    
    function removeModalWindow() {
      mask.classList.add('hidden');
      modal.classList.add('hidden');
    }

    open.addEventListener('click', () => {
      mask.classList.remove('hidden');
      modal.classList.remove('hidden');
    });

    rest.addEventListener('click', () => {
      removeModalWindow();
      timeToCountDown = 5 * 60 * 1000;
      document.getElementById('start').click();
    });

    keep.addEventListener('click', () => {
      removeModalWindow();
      timeToCountDown = 25 * 60 * 1000;
      document.getElementById('start').click();
    });
  }
  
  window.addEventListener('load', timer)
}