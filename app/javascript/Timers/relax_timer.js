if (document.URL.match( /relax/ )) {
  function timer() {
    
    //タイマー機能
    const BoxBreathingTimer = document.getElementById('BoxBreathingTimer');
    const BoxBreathingStart = document.getElementById('BoxBreathingStart');
    const RemSleepTimer = document.getElementById('RemSleepTimer');
    const RemSleepStart = document.getElementById('RemSleepStart');

    let startTime;
    let timeLeft;
    let BoxBreathingTimeToCountDown = 4 * 1000;
    let RemSleepTimeToCountDown = 15 * 60 * 1000;
    let timerId;
    let isRunning = false;
    let isBreathing = true;
    let Pausing = false;
  
    function BoxBreathingUpdateTimer(t) {
      let d = new Date(t);
      let m = d.getMinutes();
      let s = d.getSeconds();
      let timerString;
      m = ('0' + m).slice(-2);
      s = ('0' + s).slice(-2);
      timerString = m + ':' + s; 
      BoxBreathingTimer.textContent = timerString;
      document.title = `リラックス (${timerString})`;
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
      document.title = `睡眠中zzz (${timerString})`;
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
        if (isBreathing === true && Pausing === false) {
          BoxBreathingProgressing.animate(1, {duration: 4 * 1000});
        } else if (isBreathing === false && Pausing === false) {
          BoxBreathingProgressing.animate(0, {duration: 4 * 1000});
        } else if (Pausing === true) {
          BoxBreathingProgressing.resume();
        }
      } else {
        isRunning = false;
        Pausing = true;
        BoxBreathingStart.textContent = 'Start';
        RemSleepMenu.classList.remove('pointer-events-none', 'opacity-50');
        BoxBreathingTimeToCountDown = timeLeft;
        clearTimeout(timerId);
        BoxBreathingProgressing.pause();
      }
    });

    RemSleepStart.addEventListener('click', () => {
      if (isRunning === false) {
        isRunning = true;
        RemSleepStart.textContent = 'Stop';
        BoxBreathingMenu.classList.add('pointer-events-none', 'opacity-50');
        startTime = Date.now();
        RemSleepCountDown();
        if (RemSleepTimeToCountDown === 15 * 60 * 1000) {
          RemSleepProgressing.animate(1, {duration: 15 * 60 * 1000});
        } else {
          RemSleepProgressing.resume();
        }
      } else {
        isRunning = false;
        RemSleepStart.textContent = 'Start';
        BoxBreathingMenu.classList.remove('pointer-events-none', 'opacity-50');
        RemSleepTimeToCountDown = timeLeft;
        clearTimeout(timerId);
        RemSleepProgressing.pause();
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
   
    // Reset.addEventListener('click', () => {
    //   timeToCountDown = 25 * 60 * 1000;
    //   updateTimer(timeToCountDown);
    // });

   
    //モーダルウィンドウ 
    //ボックス呼吸法
    const BoxBreathingOpen = document.getElementById('BoxBreathingOpen');
    const BoxBreathingRest = document.getElementById('BoxBreathingRest');
    const BoxBreathingKeep = document.getElementById('BoxBreathingKeep');
    let num3 = 0;
  

    BoxBreathingOpen.addEventListener('click', () => {
      if (isBreathing === true) {
        document.getElementById('BoxBreathingRest').click();
        num3 ++;
        BoxBreathingTime.value = num3;
      } else {
        document.getElementById('BoxBreathingKeep').click();
        num3 ++;
        BoxBreathingTime.value = num3;
      }
    });

    BoxBreathingKeep.addEventListener('click', () => {
      Pausing = false;
      isBreathing = true;
      BoxBreathingTimeToCountDown = 4 * 1000;
      BoxBreathingProgressing.set(0);
      document.getElementById('BoxBreathingStart').click();
    });
    
    BoxBreathingRest.addEventListener('click', () => {
      Pausing = false;
      isBreathing = false;
      BoxBreathingTimeToCountDown = 4 * 1000;
      BoxBreathingProgressing.set(1);
      document.getElementById('BoxBreathingStart').click();
    });

    //レム仮眠・昼寝
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
      RemSleepProgressing.set(0);
      RemSleepTimer.textContent = "15:00";
    });

    RemSleepKeep.addEventListener('click', () => {
      RemSleepRemoveModalWindow();
      RemSleepTimeToCountDown = 15 * 60 * 1000;
      RemSleepProgressing.set(0);
      document.getElementById('RemSleepStart').click();
    });

    RemSleepMask.addEventListener('click', () => {
      RemSleepRemoveModalWindow();
      RemSleepTimeToCountDown = 15 * 60 * 1000;
      RemSleepProgressing.set(0);
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

    //時間記録・編集・保存
    const BoxBreathingTime = document.getElementById('BoxBreathingTime');
    const BoxBreathingEdit = document.getElementById('BoxBreathingEdit');
    const BoxBreathingSave = document.getElementById('BoxBreathingSave');
    const RemSleepTime = document.getElementById('RemSleepTime');
    const RemSleepEdit = document.getElementById('RemSleepEdit');
    const RemSleepSave = document.getElementById('RemSleepSave');

    BoxBreathingEdit.addEventListener('click', () => {
      BoxBreathingTime.readOnly = false;
    })

    BoxBreathingTime.addEventListener('change', () => {
      BoxBreathingSave.disabled = false;
    })

    RemSleepEdit.addEventListener('click', () => {
      RemSleepTime.readOnly = false;
    })

    RemSleepTime.addEventListener('change', () => {
      RemSleepSave.disabled = false;
    })

    //プログレスバー
    const BoxBreathingProgressing = new ProgressBar.SemiCircle(BoxBreathingBar, {
      strokeWidth: 1.5,
      easing: 'linear',
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 0.8,
      svgStyle: {margin: 'auto'},
    });
    
    let num4 = 0;
    const RemSleepProgressing = new ProgressBar.SemiCircle(RemSleepBar, {
      strokeWidth: 1.5,
      easing: 'linear',
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 0.8,
      svgStyle: {margin: 'auto'},
      step: (state, bar) => {
        const RemSleepBarValue = bar.value();
        if (RemSleepBarValue == 1) {
          num4++;
          RemSleepTime.value = num4;
        }
      }
    });    
  }
  
  window.addEventListener('load', timer)
}