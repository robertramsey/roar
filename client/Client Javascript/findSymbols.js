$(document).on('keyup', ".box", function(e) {
    if (e.keyCode == 32) {
        var text = $(this).text();
        var regexp = /(?=[@#])[*@#]\w+/g;
        var reg = /(?=[#])[*#]\w+/g;
        var exp = /(?=[@])[*@]\w+/g;
        var newText = text.replace(regexp, function(match) {
          if(match.match(exp)) {
            var removal = match.replace(/@/, "");
            return "<a href='" + removal + "'>" + match + "</a>";
          } else if (match.match(reg)) {
            var removal = match.replace(/#/, "");
            return "<a href='tags/" + removal + "'>" + match + "</a>";
          }
          });

        $(this).html(newText);
        setEndOfContenteditable(this);
    }
});

function setEndOfContenteditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)
    {
        range = document.createRange();
        range.selectNodeContents(contentEditableElement);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
    else if(document.selection)
    { 
        range = document.body.createTextRange();
        range.moveToElementText(contentEditableElement);
        range.collapse(false);
        range.select();
    }
}