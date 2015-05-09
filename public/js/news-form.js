$(document).ready(function() {
  bkLib.onDomLoaded(function() {
    new nicEditor({fullPanel : true, iconsPath : '/img/nicEditorIcons.gif'}).panelInstance('desc');
  });
});