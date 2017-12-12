/**
 * Created by tommyzqfeng on 2017/12/12.
 */


/*-------------------------------------------------------------------------------
 PRE LOADER
 -------------------------------------------------------------------------------*/

$(window).load(function(){
  $('.preloader').fadeOut(1000); // set duration in brackets
});

$(document).ready(function(){
  var url = 'doc/resume.pdf';

  function renderPDF(url, canvasContainer, options) {
    var options = options || { scale: 1.5 };

    function renderPage(page) {
      var viewport = page.getViewport(options.scale);
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      canvas.height = viewport.height;
      canvas.width = viewport.width;
      canvasContainer.appendChild(canvas);

      page.render(renderContext);
    }

    function renderPages(pdfDoc) {
      for(var num = 1; num <= pdfDoc.numPages; num++)
        pdfDoc.getPage(num).then(renderPage);
    }
    PDFJS.disableWorker = true;
    PDFJS.getDocument(url).then(renderPages);
  }

  renderPDF(url, document.getElementById('holder'));
});