if (document.URL.match( /hobby/ )) {
  function timer() {
    
    //タイマー機能
    const GameTimer = document.getElementById('GameTimer');
    const GameStart = document.getElementById('GameStart');
    const HobbyTimer = document.getElementById('HobbyTimer');
    const HobbyStart = document.getElementById('HobbyStart');

    let startTime;
    let timeLeft;
    let GameTimeToCountDown = 60 * 60 * 1000;
    let HobbyTimeToCountDown = 30 * 60 * 1000;
    let timerId;
    let isRunning = false;
  
    function GameUpdateTimer(t) {
      let d = new Date(t);
      let m = d.getMinutes();
      let s = d.getSeconds();
      let timerString;
      m = ('0' + m).slice(-2);
      s = ('0' + s).slice(-2);
      timerString = m + ':' + s; 
      GameTimer.textContent = timerString;
      document.title = `ゲーミング (${timerString})`;
    }

    function HobbyUpdateTimer(t) {
      let d = new Date(t);
      let m = d.getMinutes();
      let s = d.getSeconds();
      let timerString;
      m = ('0' + m).slice(-2);
      s = ('0' + s).slice(-2);
      timerString = m + ':' + s; 
      HobbyTimer.textContent = timerString;
      document.title = `趣味NOW (${timerString})`;
    }
  
    function GameCountDown() {
      timerId = setTimeout(function() {
        timeLeft = GameTimeToCountDown - (Date.now() - startTime);
        if (timeLeft < 0) {
          isRunning = false;
          GameStart.textContent = 'Start';
          clearTimeout(timerId);
          timeLeft = 0;
          GameTimeToCountDown = 0;
          GameUpdateTimer(timeLeft);
          document.getElementById('GameOpen').click();
          return;
        }
        GameUpdateTimer(timeLeft);
        GameCountDown();
      }, 10);
    }
    
    function HobbyCountDown() {
      timerId = setTimeout(function() {
        timeLeft = HobbyTimeToCountDown - (Date.now() - startTime);
        if (timeLeft < 0) {
          isRunning = false;
          HobbyStart.textContent = 'Start';
          clearTimeout(timerId);
          timeLeft = 0;
          HobbyTimeToCountDown = 0;
          HobbyUpdateTimer(timeLeft);
          document.getElementById('HobbyOpen').click();
          return;
        }
        HobbyUpdateTimer(timeLeft);
        HobbyCountDown();
      }, 10);
    }
  
  
    GameStart.addEventListener('click', () => {
      if (isRunning === false) {
        isRunning = true;
        GameStart.textContent = 'Stop';
        HobbyMenu.classList.add('pointer-events-none', 'opacity-50');
        startTime = Date.now();
        GameCountDown();
        if (GameTimeToCountDown === 60 * 60 * 1000) {
          GameProgressing.animate(1, {duration: 60 * 60 * 1000});
        } else if (GameTimeToCountDown === 10 * 60 * 1000) {
          GameProgressing.animate(0, {duration: 10 * 60 * 1000});
        } else {
          GameProgressing.resume();
        }
      } else {
        isRunning = false;
        GameStart.textContent = 'Start';
        HobbyMenu.classList.remove('pointer-events-none', 'opacity-50');
        GameTimeToCountDown = timeLeft;
        clearTimeout(timerId);
        GameProgressing.pause();
      }
    });

    HobbyStart.addEventListener('click', () => {
      if (isRunning === false) {
        isRunning = true;
        HobbyStart.textContent = 'Stop';
        GameMenu.classList.add('pointer-events-none', 'opacity-50');
        startTime = Date.now();
        HobbyCountDown();
        if (HobbyTimeToCountDown === 30 * 60 * 1000) {
          HobbyProgressing.animate(1, {duration: 30 * 60 * 1000});
        } else if (HobbyTimeToCountDown === 5 * 60 * 1000) {
          HobbyProgressing.animate(0, {duration: 5 * 60 * 1000});
        } else {
          HobbyProgressing.resume();
        }
      } else {
        isRunning = false;
        HobbyStart.textContent = 'Start';
        GameMenu.classList.remove('pointer-events-none', 'opacity-50');
        HobbyTimeToCountDown = timeLeft;
        clearTimeout(timerId);
        HobbyProgressing.pause();
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
   
    // Rest.addEventListener('click', () => {
    //   timeToCountDown = 25 * 60 * 1000;
    //   updateTimer(timeToCountDown);
    // });

   
    //モーダルウィンドウ 
    //ポモドーロ テクニック
    const GameOpen = document.getElementById('GameOpen');
    const GameRest = document.getElementById('GameRest');
    const GameKeep = document.getElementById('GameKeep');
    const GameModal = document.getElementById('GameModal');
    const GameMask = document.getElementById('GameMask');
    
    function GameRemoveModalWindow() {
      GameMask.classList.add('hidden');
      GameModal.classList.add('hidden');
    }

    GameOpen.addEventListener('click', () => {
      GameMask.classList.remove('hidden');
      GameModal.classList.remove('hidden');
    });

    GameRest.addEventListener('click', () => {
      GameRemoveModalWindow();
      GameProgressing.set(1);
      GameTimeToCountDown = 10 * 60 * 1000;
      document.getElementById('GameStart').click();
    });

    GameKeep.addEventListener('click', () => {
      GameRemoveModalWindow();
      GameProgressing.set(0);
      GameTimeToCountDown = 60 * 60 * 1000;
      document.getElementById('GameStart').click();
    });

    GameMask.addEventListener('click', () => {
      GameRemoveModalWindow();
      GameProgressing.set(0);
      GameTimeToCountDown = 60 * 60 * 1000;
      GameTimer.textContent = "60:00";
      HobbyMenu.classList.remove('pointer-events-none', 'opacity-50');
    });

    //趣味
    const HobbyOpen = document.getElementById('HobbyOpen');
    const HobbyRest = document.getElementById('HobbyRest');
    const HobbyKeep = document.getElementById('HobbyKeep');
    const HobbyModal = document.getElementById('HobbyModal');
    const HobbyMask = document.getElementById('HobbyMask');

    function HobbyRemoveModalWindow() {
      HobbyMask.classList.add('hidden');
      HobbyModal.classList.add('hidden');
    }

    HobbyOpen.addEventListener('click', () => {
      HobbyMask.classList.remove('hidden');
      HobbyModal.classList.remove('hidden');
    });

    HobbyRest.addEventListener('click', () => {
      HobbyRemoveModalWindow();
      HobbyProgressing.set(1);
      HobbyTimeToCountDown = 5 * 60 * 1000;
      document.getElementById('HobbyStart').click();
    });

    HobbyKeep.addEventListener('click', () => {
      HobbyRemoveModalWindow();
      HobbyProgressing.set(0);
      HobbyTimeToCountDown = 30 * 60 * 1000;
      document.getElementById('HobbyStart').click();
    });

    HobbyMask.addEventListener('click', () => {
      HobbyRemoveModalWindow();
      HobbyProgressing.set(0);
      HobbyTimeToCountDown = 30 * 60 * 1000;
      HobbyTimer.textContent = "30:00";
      GameMenu.classList.remove('pointer-events-none', 'opacity-50');
    });



    //タブメニュー
    const GameMenu = document.getElementById('GameMenu');
    const HobbyMenu = document.getElementById('HobbyMenu');
    const Game = document.getElementById('Game');
    const Hobby = document.getElementById('Hobby');

    GameMenu.addEventListener('click', (e) => {
      e.preventDefault();
      Hobby.classList.add('hidden');
      HobbyMenu.classList.remove('bg-pink-600');
      HobbyMenu.classList.add('text-pink-600');
      Game.classList.remove('hidden');
      GameMenu.classList.remove('text-purple-600');
      GameMenu.classList.add('bg-purple-600');
      GameMenu.classList.add('text-white');
    });
    
    HobbyMenu.addEventListener('click', (e) => {
      e.preventDefault();
      Game.classList.add('hidden');
      GameMenu.classList.add('text-purple-600');
      GameMenu.classList.remove('bg-purple-600');
      Hobby.classList.remove('hidden');
      HobbyMenu.classList.remove('text-pink-600');
      HobbyMenu.classList.add('bg-pink-600');
      HobbyMenu.classList.add('text-white');
    });

    //時間記録・編集・保存
    const GameTime = document.getElementById('GameTime');
    const GameEdit = document.getElementById('GameEdit');
    const GameSave = document.getElementById('GameSave');
    const HobbyTime = document.getElementById('HobbyTime');
    const HobbyEdit = document.getElementById('HobbyEdit');
    const HobbySave = document.getElementById('HobbySave');

    GameEdit.addEventListener('click', () => {
      GameTime.readOnly = false;
    })

    GameTime.addEventListener('input', () => {
      GameSave.disabled = false;
    })

    HobbyEdit.addEventListener('click', () => {
      HobbyTime.readOnly = false;
    })

    HobbyTime.addEventListener('input', () => {
      HobbySave.disabled = false;
    })

        //プログレスバー
    let num7 = 0;
    const GameProgressing = new ProgressBar.Line(GameBar, {
      strokeWidth: 4,
      easing: 'linear',
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: {width: '100%', height: '100%'},
      step: (state, bar) => {
        const GameBarValue = bar.value();
        if (GameBarValue == 1) {
          num7 += 60;
          GameTime.value = num7;
          GameTime.readOnly = false;
          GameSave.disabled = false;
        }
      }
    });
    
    let num8 = 0;
    const HobbyProgressing = new ProgressBar.Line(HobbyBar, {
      strokeWidth: 4,
      easing: 'linear',
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: {width: '100%', height: '100%'},
      step: (state, bar) => {
        const HobbyBarValue = bar.value();
        if (HobbyBarValue == 1) {
          num8 += 30;
          HobbyTime.value = num8;
          HobbyTime.readOnly = false;
          HobbySave.disabled = false;
        }
      }
    });
  }
  
  window.addEventListener('load', timer)
}