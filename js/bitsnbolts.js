 jQuery(document).ready(function($) {

 $.ajax({
    url: 'http://files.bitsnbolts.nl/js/highlight.pack.js.gz',
    dataType: 'script',
    cache: true, // otherwise will get fresh copy every page load
    success: function() {
      hljs.initHighlightingOnLoad();
    }
  });

});