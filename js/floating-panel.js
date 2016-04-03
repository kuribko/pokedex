var floatingPanel = "#right-part";
var parent = "#main";

$(document).ready(function () {
    var panelTop = parseInt($(floatingPanel).css("top"));
    $(window).scroll(function () {
        var newPanelTop = panelTop + $(document).scrollTop();
        $(floatingPanel).animate({top: newPanelTop + "px"}, {duration: 200, queue: false});
    });

    var adaptRight = function () {
        var panelRight = $(document).width() - (parseInt($('#content').offset().left) + parseInt($('#content').css('width'))) + "px";
        $(floatingPanel).css({'right': panelRight});
    }

    adaptRight();
    $(window).resize(function(){
        adaptRight();
    });

});