if (document.URL.match( /study/ ) || document.URL.match( /game/ ) || document.URL.match( /relax/ ) || document.URL.match( /training/ )) {
  
  function modal_window() {
    const open = document.getElementById('open');
    const rest = document.getElementById('rest');
    const modal = document.getElementById('modal');
    const mask = document.getElementById('mask');
    
    open.addEventListener('click', () => {
      mask.classList.remove('hidden');
      modal.classList.remove('transform', '-translate-y-5');
    });

    rest.addEventListener('click', () => {
      mask.classList.add('hidden');
      modal.classList.add('transform', '-translate-y-5');
    });
  }
  
  window.addEventListener('load', modal_window)
}