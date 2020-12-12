if (document.URL.match( /fitness/ )) {
  function timer() {
    
    //タイマー機能
    const HiitTimer = document.getElementById('HiitTimer');
    const HiitStart = document.getElementById('HiitStart');
    const StretchTimer = document.getElementById('StretchTimer');
    const StretchStart = document.getElementById('StretchStart');

    let startTime;
    let timeLeft;
    let HiitTimeToCountDown = 30  * 1000;
    let StretchTimeToCountDown = 20 * 1000;
    let timerId;
    let isRunning = false;
  
    function HiitUpdateTimer(t) {
      let d = new Date(t);
      let m = d.getMinutes();
      let s = d.getSeconds();
      let timerString;
      m = ('0' + m).slice(-2);
      s = ('0' + s).slice(-2);
      timerString = m + ':' + s; 
      HiitTimer.textContent = timerString;
      document.title = timerString;
    }

    function StretchUpdateTimer(t) {
      let d = new Date(t);
      let m = d.getMinutes();
      let s = d.getSeconds();
      let timerString;
      m = ('0' + m).slice(-2);
      s = ('0' + s).slice(-2);
      timerString = m + ':' + s; 
      StretchTimer.textContent = timerString;
      document.title = timerString;
    }
  
    function HiitCountDown() {
      timerId = setTimeout(function() {
        timeLeft = HiitTimeToCountDown - (Date.now() - startTime);
        if (timeLeft < 0) {
          isRunning = false;
          HiitStart.textContent = 'Start';
          clearTimeout(timerId);
          timeLeft = 0;
          HiitTimeToCountDown = 0;
          HiitUpdateTimer(timeLeft);
          if (HiitRest.classList.contains('active')) {
            document.getElementById('HiitKeep').click();
          } else {
            document.getElementById('HiitRest').click();
          }
          return;
        }
        HiitUpdateTimer(timeLeft);
        HiitCountDown();
      }, 10);
    }
    
    function StretchCountDown() {
      timerId = setTimeout(function() {
        timeLeft = StretchTimeToCountDown - (Date.now() - startTime);
        if (timeLeft < 0) {
          isRunning = false;
          StretchStart.textContent = 'Start';
          clearTimeout(timerId);
          timeLeft = 0;
          StretchTimeToCountDown = 0;
          StretchUpdateTimer(timeLeft);
          document.getElementById('StretchOpen').click();
          return;
        }
        StretchUpdateTimer(timeLeft);
        StretchCountDown();
      }, 10);
    }
  
  
    HiitStart.addEventListener('click', () => {
      if (isRunning === false) {
        isRunning = true;
        HiitStart.textContent = 'Stop';
        StretchMenu.classList.add('pointer-events-none', 'opacity-50');
        startTime = Date.now();
        HiitCountDown();
      } else {
        isRunning = false;
        HiitStart.textContent = 'Start';
        StretchMenu.classList.remove('pointer-events-none', 'opacity-50');
        HiitTimeToCountDown = timeLeft;
        clearTimeout(timerId);
      }
    });

    StretchStart.addEventListener('click', () => {
      if (isRunning === false) {
        isRunning = true;
        StretchStart.textContent = 'Stop';
        HiitMenu.classList.add('pointer-events-none', 'opacity-50');
        startTime = Date.now();
        StretchCountDown();
      } else {
        isRunning = false;
        StretchStart.textContent = 'Start';
        HiitMenu.classList.remove('pointer-events-none', 'opacity-50');
        StretchTimeToCountDown = timeLeft;
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
    //HIIT
    const HiitRest = document.getElementById('HiitRest');
    const HiitKeep = document.getElementById('HiitKeep');

    HiitRest.addEventListener('click', () => {
      HiitTimeToCountDown = 10 * 1000;
      HiitTimer.textContent = "00:10";
      document.getElementById('HiitStart').click();
      HiitRest.classList.add('active');
    });

    HiitKeep.addEventListener('click', () => {
      HiitTimeToCountDown = 30 * 1000;
      HiitTimer.textContent = "00:30";
      document.getElementById('HiitStart').click();
      HiitRest.classList.remove('active');
    });

    //ストレッチ
    const StretchOpen = document.getElementById('StretchOpen');

    StretchOpen.addEventListener('click', () => {
      StretchTimeToCountDown = 20 * 1000;
      StretchTimer.textContent = "00:20";
      document.getElementById('StretchStart').click();
    });

    //タブメニュー
    const HiitMenu = document.getElementById('HiitMenu');
    const StretchMenu = document.getElementById('StretchMenu');
    const Hiit = document.getElementById('Hiit');
    const Stretch = document.getElementById('Stretch');

    HiitMenu.addEventListener('click', (e) => {
      e.preventDefault();
      Stretch.classList.add('hidden');
      StretchMenu.classList.remove('bg-yellow-500');
      StretchMenu.classList.add('text-yellow-500');
      Hiit.classList.remove('hidden');
      HiitMenu.classList.remove('text-red-500');
      HiitMenu.classList.add('bg-red-500');
      HiitMenu.classList.add('text-white');
    });
    
    StretchMenu.addEventListener('click', (e) => {
      e.preventDefault();
      Hiit.classList.add('hidden');
      HiitMenu.classList.add('text-red-500');
      HiitMenu.classList.remove('bg-red-500');
      Stretch.classList.remove('hidden');
      StretchMenu.classList.remove('text-yellow-500');
      StretchMenu.classList.add('bg-yellow-500');
      StretchMenu.classList.add('text-white');
    });
  }
  
  window.addEventListener('load', timer)
}