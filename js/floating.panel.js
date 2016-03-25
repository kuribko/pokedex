var floatingPanel = "#right-part";
var parent = "#main";

$(document).ready(function () {
    topPanel = parseInt($(floatingPanel).css("top"));//.substring(0,$(name).css("top").indexOf("px")));
    $(window).scroll(function () {
        var newPanelTop = topPanel + $(document).scrollTop();
        var panelHeight = parseInt($(floatingPanel).css("height"));
        if ($(document).height() > (newPanelTop + panelHeight + 100)) {
            $(floatingPanel).animate({top: newPanelTop + "px"}, {duration: 200, queue: false});
        }
    });

    var adaptRight = function () {
        var panelRight = $(document).width() - (parseInt($('#content').offset().left) + parseInt($('#content').css('width'))) + "px";
        console.log(panelRight);
        $(floatingPanel).css({'right': panelRight});

    }

    adaptRight();
    $(window).resize(adaptRight());

});