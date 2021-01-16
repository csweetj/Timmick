if (document.URL.match( /tag_list/ ) || document.URL.match( /users/ )) {
  function isCurrentPage() {
    let page = document.getElementById('current');
    page.classList.remove('hover:bg-indigo-500', 'hover:text-white');
    page.classList.add('bg-indigo-200');
  }
  window.addEventListener('load', isCurrentPage)
}
