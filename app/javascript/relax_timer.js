if (document.URL.match( /relax/ )) {
  function timer() {
    
    //タイマー機能
    const BoxBreathingTimer = document.getElementById('BoxBreathingTimer');
    const BoxBreathingStart = document.getElementById('BoxBreathingStart');
    const RemSleepTimer = document.getElementById('RemSleepTimer');
    const RemSleepStart = document.getElementById('RemSleepStart');

    let startTime;
    let timeLeft;
    let BoxBreathingTimeToCountDown = 4  * 1000;
    let RemSleepTimeToCountDown = 15 * 60 * 1000;
    let timerId;
    let isRunning = false;
  
    function BoxBreathingUpdateTimer(t) {
      let d = new Date(t);
      let m = d.getMinutes();
      let s = d.getSeconds();
      let timerString;
      m = ('0' + m).slice(-2);
      s = ('0' + s).slice(-2);
      timerString = m + ':' + s; 
      BoxBreathingTimer.textContent = timerString;
      document.title = timerString;
    }

    function RemSleepUpdateTimer(t) {
      let d = new Date(t);
      let m = d.getMinutes();
      let s = d.getSeconds();
      let timerString;
      m = ('0' + m).slice(-2);
      s = ('0' + s).slice(-2);
      timerString = m + ':' + s; 
      RemSleepTimer.textContent = timerString;
      document.title = timerString;
    }
  
    function BoxBreathingCountDown() {
      timerId = setTimeout(function() {
        timeLeft = BoxBreathingTimeToCountDown - (Date.now() - startTime);
        if (timeLeft < 0) {
          isRunning = false;
          BoxBreathingStart.textContent = 'Start';
          clearTimeout(timerId);
          timeLeft = 0;
          BoxBreathingTimeToCountDown = 0;
          BoxBreathingUpdateTimer(timeLeft);
          document.getElementById('BoxBreathingOpen').click();
          return;
        }
        BoxBreathingUpdateTimer(timeLeft);
        BoxBreathingCountDown();
      }, 10);
    }
    
    function RemSleepCountDown() {
      timerId = setTimeout(function() {
        timeLeft = RemSleepTimeToCountDown - (Date.now() - startTime);
        if (timeLeft < 0) {
          isRunning = false;
          RemSleepStart.textContent = 'Start';
          clearTimeout(timerId);
          timeLeft = 0;
          RemSleepTimeToCountDown = 0;
          RemSleepUpdateTimer(timeLeft);
          document.getElementById('RemSleepOpen').click();
          return;
        }
        RemSleepUpdateTimer(timeLeft);
        RemSleepCountDown();
      }, 10);
    }
  
  
    BoxBreathingStart.addEventListener('click', () => {
      if (isRunning === false) {
        isRunning = true;
        BoxBreathingStart.textContent = 'Stop';
        RemSleepMenu.classList.add('pointer-events-none', 'opacity-50');
        startTime = Date.now();
        BoxBreathingCountDown();
      } else {
        isRunning = false;
        BoxBreathingStart.textContent = 'Start';
        RemSleepMenu.classList.remove('pointer-events-none', 'opacity-50');
        BoxBreathingTimeToCountDown = timeLeft;
        clearTimeout(timerId);
      }
    });

    RemSleepStart.addEventListener('click', () => {
      if (isRunning === false) {
        isRunning = true;
        RemSleepStart.textContent = 'Stop';
        BoxBreathingMenu.classList.add('pointer-events-none', 'opacity-50');
        startTime = Date.now();
        RemSleepCountDown();
      } else {
        isRunning = false;
        RemSleepStart.textContent = 'Start';
        BoxBreathingMenu.classList.remove('pointer-events-none', 'opacity-50');
        RemSleepTimeToCountDown = timeLeft;
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
    //ポモドーロ テクニック
    const BoxBreathingOpen = document.getElementById('BoxBreathingOpen');
    const BoxBreathingRest = document.getElementById('BoxBreathingRest');
    const BoxBreathingKeep = document.getElementById('BoxBreathingKeep');
    const BoxBreathingModal = document.getElementById('BoxBreathingModal');
    const BoxBreathingMask = document.getElementById('BoxBreathingMask');
    
    function BoxBreathingRemoveModalWindow() {
      BoxBreathingMask.classList.add('hidden');
      BoxBreathingModal.classList.add('hidden');
    }

    BoxBreathingOpen.addEventListener('click', () => {
      BoxBreathingTimeToCountDown = 4 * 1000;
      BoxBreathingTimer.textContent = "00:04";
      document.getElementById('BoxBreathingStart').click();
    });

    BoxBreathingRest.addEventListener('click', () => {
      BoxBreathingRemoveModalWindow();
      BoxBreathingTimeToCountDown = 4 * 1000;
      document.getElementById('BoxBreathingStart').click();
    });

    BoxBreathingKeep.addEventListener('click', () => {
      BoxBreathingRemoveModalWindow();
      BoxBreathingTimeToCountDown = 4 * 1000;
      document.getElementById('BoxBreathingStart').click();
    });

    BoxBreathingMask.addEventListener('click', () => {
      BoxBreathingRemoveModalWindow();
      BoxBreathingTimeToCountDown = 4 * 1000;
      BoxBreathingTimer.textContent = "00:04";
    });

    //学生気分
    const RemSleepOpen = document.getElementById('RemSleepOpen');
    const RemSleepRest = document.getElementById('RemSleepRest');
    const RemSleepKeep = document.getElementById('RemSleepKeep');
    const RemSleepModal = document.getElementById('RemSleepModal');
    const RemSleepMask = document.getElementById('RemSleepMask');

    function RemSleepRemoveModalWindow() {
      RemSleepMask.classList.add('hidden');
      RemSleepModal.classList.add('hidden');
    }

    RemSleepOpen.addEventListener('click', () => {
      RemSleepMask.classList.remove('hidden');
      RemSleepModal.classList.remove('hidden');
    });

    RemSleepRest.addEventListener('click', () => {
      RemSleepRemoveModalWindow();
      RemSleepTimeToCountDown = 15 * 60 * 1000;
      RemSleepTimer.textContent = "15:00";
    });

    RemSleepKeep.addEventListener('click', () => {
      RemSleepRemoveModalWindow();
      RemSleepTimeToCountDown = 15 * 60 * 1000;
      document.getElementById('RemSleepStart').click();
    });

    RemSleepMask.addEventListener('click', () => {
      RemSleepRemoveModalWindow();
      RemSleepTimeToCountDown = 15 * 60 * 1000;
      RemSleepTimer.textContent = "15:00";
    });



    //タブメニュー
    const BoxBreathingMenu = document.getElementById('BoxBreathingMenu');
    const RemSleepMenu = document.getElementById('RemSleepMenu');
    const BoxBreathing = document.getElementById('BoxBreathing');
    const RemSleep = document.getElementById('RemSleep');

    BoxBreathingMenu.addEventListener('click', (e) => {
      e.preventDefault();
      RemSleep.classList.add('hidden');
      RemSleepMenu.classList.remove('bg-green-400');
      RemSleepMenu.classList.add('text-green-400');
      BoxBreathing.classList.remove('hidden');
      BoxBreathingMenu.classList.remove('text-green-600');
      BoxBreathingMenu.classList.add('bg-green-600');
      BoxBreathingMenu.classList.add('text-white');
    });
    
    RemSleepMenu.addEventListener('click', (e) => {
      e.preventDefault();
      BoxBreathing.classList.add('hidden');
      BoxBreathingMenu.classList.add('text-green-600');
      BoxBreathingMenu.classList.remove('bg-green-600');
      RemSleep.classList.remove('hidden');
      RemSleepMenu.classList.remove('text-green-400');
      RemSleepMenu.classList.add('bg-green-400');
      RemSleepMenu.classList.add('text-white');
    });
  }
  
  window.addEventListener('load', timer)
}