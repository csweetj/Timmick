$(window).on('scroll', function() {
  if(!document.URL.match(/tag_list/)){
    scrollHeight = $(document).height();
    scrollPosition = $(window).height() + $(window).scrollTop();
    if ( (scrollHeight - scrollPosition) / scrollHeight <= 0.05) {
      $('.jscroll').jscroll({
        contentSelector: '.jscroll',
        nextSelector: 'a.next',
        loadingHtml: '読み込み中'
      });
      $('.pagetop').fadeIn("slow");
    }
    else {
      $('.pagetop').fadeOut('slow');
    }
  }
});