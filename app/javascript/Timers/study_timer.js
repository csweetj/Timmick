if (document.URL.match( /study/ )) {
  function timer() {
    
    //タイマー機能
    const PomodoroTimer = document.getElementById('PomodoroTimer');
    const PomodoroStart = document.getElementById('PomodoroStart');
    const StudentTimer = document.getElementById('StudentTimer');
    const StudentStart = document.getElementById('StudentStart');

    let startTime;
    let timeLeft;
    let PomodoroTimeToCountDown = 25 * 60 * 1000;
    let StudentTimeToCountDown = 50 * 60 * 1000;
    let timerId;
    let isRunning = false;
  
    function PomodoroUpdateTimer(t) {
      let d = new Date(t);
      let m = d.getMinutes();
      let s = d.getSeconds();
      let timerString;
      m = ('0' + m).slice(-2);
      s = ('0' + s).slice(-2);
      timerString = m + ':' + s; 
      PomodoroTimer.textContent = timerString;
      document.title = `ポモドーロ (${timerString})`;
    }

    function StudentUpdateTimer(t) {
      let d = new Date(t);
      let m = d.getMinutes();
      let s = d.getSeconds();
      let timerString;
      m = ('0' + m).slice(-2);
      s = ('0' + s).slice(-2);
      timerString = m + ':' + s; 
      StudentTimer.textContent = timerString;
      document.title = `青春？... (${timerString})`;
    }
  
    function PomodoroCountDown() {
      timerId = setTimeout(function() {
        timeLeft = PomodoroTimeToCountDown - (Date.now() - startTime);
        if (timeLeft < 0) {
          isRunning = false;
          PomodoroStart.textContent = 'Start';
          clearTimeout(timerId);
          timeLeft = 0;
          PomodoroTimeToCountDown = 0;
          PomodoroUpdateTimer(timeLeft);
          document.getElementById('PomodoroOpen').click();
          return;
        }
        PomodoroUpdateTimer(timeLeft);
        PomodoroCountDown();
      }, 10);
    }
    
    function StudentCountDown() {
      timerId = setTimeout(function() {
        timeLeft = StudentTimeToCountDown - (Date.now() - startTime);
        if (timeLeft < 0) {
          isRunning = false;
          StudentStart.textContent = 'Start';
          clearTimeout(timerId);
          timeLeft = 0;
          StudentTimeToCountDown = 0;
          StudentUpdateTimer(timeLeft);
          document.getElementById('StudentOpen').click();
          return;
        }
        StudentUpdateTimer(timeLeft);
        StudentCountDown();
      }, 10);
    }
  
  
    PomodoroStart.addEventListener('click', () => {
      if (isRunning === false) {
        isRunning = true;
        PomodoroStart.textContent = 'Stop';
        StudentMenu.classList.add('pointer-events-none', 'opacity-50');
        startTime = Date.now();
        PomodoroCountDown();
        if (PomodoroTimeToCountDown === 25 * 60 * 1000) {
          PomodoroProgressing.animate(1, {duration: 25 * 60 * 1000});
        } else if (PomodoroTimeToCountDown === 5 * 60 * 1000) {
          PomodoroProgressing.animate(0, {duration: 5 * 60 * 1000});
        } else {
          PomodoroProgressing.resume();
        }
      } else {
        isRunning = false;
        PomodoroStart.textContent = 'Start';
        StudentMenu.classList.remove('pointer-events-none', 'opacity-50');
        PomodoroTimeToCountDown = timeLeft;
        clearTimeout(timerId);
        PomodoroProgressing.pause();
      }
    });

    StudentStart.addEventListener('click', () => {
      if (isRunning === false) {
        isRunning = true;
        StudentStart.textContent = 'Stop';
        PomodoroMenu.classList.add('pointer-events-none', 'opacity-50');
        startTime = Date.now();
        StudentCountDown();
        if (StudentTimeToCountDown === 50 * 60 * 1000) {
          StudentProgressing.animate(1, {duration: 50 * 60 * 1000});
        } else if (StudentTimeToCountDown === 10 * 60 * 1000) {
          StudentProgressing.animate(0, {duration: 10 * 60 * 1000});
        } else {
          StudentProgressing.resume();
        }
      } else {
        isRunning = false;
        StudentStart.textContent = 'Start';
        PomodoroMenu.classList.remove('pointer-events-none', 'opacity-50');
        StudentTimeToCountDown = timeLeft;
        clearTimeout(timerId);
        StudentProgressing.pause();
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
    //ポモドーロ テクニック
    const PomodoroOpen = document.getElementById('PomodoroOpen');
    const PomodoroRest = document.getElementById('PomodoroRest');
    const PomodoroKeep = document.getElementById('PomodoroKeep');
    const PomodoroModal = document.getElementById('PomodoroModal');
    const PomodoroMask = document.getElementById('PomodoroMask');
    
    function PomodoroRemoveModalWindow() {
      PomodoroMask.classList.add('hidden');
      PomodoroModal.classList.add('hidden');
    }

    PomodoroOpen.addEventListener('click', () => {
      PomodoroMask.classList.remove('hidden');
      PomodoroModal.classList.remove('hidden');
    });

    PomodoroRest.addEventListener('click', () => {
      PomodoroRemoveModalWindow();
      PomodoroTimeToCountDown = 5 * 60 * 1000;
      PomodoroProgressing.set(0.99);
      document.getElementById('PomodoroStart').click();
    });

    PomodoroKeep.addEventListener('click', () => {
      PomodoroRemoveModalWindow();
      PomodoroTimeToCountDown = 25 * 60 * 1000;
      PomodoroProgressing.set(0);
      document.getElementById('PomodoroStart').click();
    });

    PomodoroMask.addEventListener('click', () => {
      PomodoroRemoveModalWindow();
      PomodoroTimeToCountDown = 25 * 60 * 1000;
      PomodoroProgressing.set(0);
      PomodoroTimer.textContent = "25:00";
      StudentMenu.classList.remove('pointer-events-none', 'opacity-50');
    });

    //学生生活
    const StudentOpen = document.getElementById('StudentOpen');
    const StudentRest = document.getElementById('StudentRest');
    const StudentKeep = document.getElementById('StudentKeep');
    const StudentModal = document.getElementById('StudentModal');
    const StudentMask = document.getElementById('StudentMask');

    function StudentRemoveModalWindow() {
      StudentMask.classList.add('hidden');
      StudentModal.classList.add('hidden');
    }

    StudentOpen.addEventListener('click', () => {
      StudentMask.classList.remove('hidden');
      StudentModal.classList.remove('hidden');
    });

    StudentRest.addEventListener('click', () => {
      StudentRemoveModalWindow();
      StudentTimeToCountDown = 10 * 60 * 1000;
      StudentProgressing.set(0.99);
      document.getElementById('StudentStart').click();
    });

    StudentKeep.addEventListener('click', () => {
      StudentRemoveModalWindow();
      StudentTimeToCountDown = 50 * 60 * 1000;
      StudentProgressing.set(0);
      document.getElementById('StudentStart').click();
    });

    StudentMask.addEventListener('click', () => {
      StudentRemoveModalWindow();
      StudentTimeToCountDown = 5 * 60 * 1000;
      StudentProgressing.set(0);
      StudentTimer.textContent = "50:00";
      PomodoroMenu.classList.remove('pointer-events-none', 'opacity-50');
    });



    //タブメニュー
    const PomodoroMenu = document.getElementById('PomodoroMenu');
    const StudentMenu = document.getElementById('StudentMenu');
    const Pomodoro = document.getElementById('Pomodoro');
    const Student = document.getElementById('Student');

    PomodoroMenu.addEventListener('click', (e) => {
      e.preventDefault();
      Student.classList.add('hidden');
      StudentMenu.classList.remove('bg-blue-400');
      StudentMenu.classList.add('text-blue-400');
      Pomodoro.classList.remove('hidden');
      PomodoroMenu.classList.remove('text-blue-600');
      PomodoroMenu.classList.add('bg-blue-600');
      PomodoroMenu.classList.add('text-white');
    });
    
    StudentMenu.addEventListener('click', (e) => {
      e.preventDefault();
      Pomodoro.classList.add('hidden');
      PomodoroMenu.classList.add('text-blue-600');
      PomodoroMenu.classList.remove('bg-blue-600');
      Student.classList.remove('hidden');
      StudentMenu.classList.remove('text-blue-400');
      StudentMenu.classList.add('bg-blue-400');
      StudentMenu.classList.add('text-white');
    });

    //時間記録・編集・保存
    const PomodoroTime = document.getElementById('PomodoroTime');
    const PomodoroEdit = document.getElementById('PomodoroEdit');
    const PomodoroSave = document.getElementById('PomodoroSave');
    const StudentTime = document.getElementById('StudentTime');
    const StudentEdit = document.getElementById('StudentEdit');
    const StudentSave = document.getElementById('StudentSave');

    PomodoroEdit.addEventListener('click', () => {
      PomodoroTime.readOnly = false;
    })

    PomodoroTime.addEventListener('input', () => {
      PomodoroSave.disabled = false;
    })

    StudentEdit.addEventListener('click', () => {
      StudentTime.readOnly = false;
    })

    StudentTime.addEventListener('input', () => {
      StudentSave.disabled = false;
    })
    

    //プログレスバー
    let num1 = 0;
    const PomodoroProgressing = new ProgressBar.Line(PomodoroBar, {
      strokeWidth: 4,
      easing: 'linear',
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: {width: '100%', height: '100%'},
      step: (state, bar) => {
        const PomodoroBarValue = bar.value();
        if (PomodoroBarValue == 1) {
          num1 += 25;
          PomodoroTime.value = num1;
          PomodoroTime.readOnly = false;
          PomodoroSave.disabled = false;
        }
      }
    });

    let num2 = 0;
    const StudentProgressing = new ProgressBar.Line(StudentBar, {
      strokeWidth: 4,
      easing: 'linear',
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: {width: '100%', height: '100%'},
      step: (state, bar) => {
        const StudentBarValue = bar.value();
        if (StudentBarValue == 1) {
          num2 += 50;
          StudentTime.value = num2;
          StudentTime.readOnly = false;
          StudentSave.disabled = false;
        }
      }
    });
  }
  
  window.addEventListener('load', timer)
}