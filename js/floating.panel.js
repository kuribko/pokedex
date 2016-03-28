var floatingPanel = "#right-part";
var parent = "#main";
var offsetFromBottom = 0;

$(document).ready(function () {
    var panelTop = parseInt($(floatingPanel).css("top"));//.substring(0,$(name).css("top").indexOf("px")));
    $(window).scroll(function () {
        var newPanelTop = panelTop + $(document).scrollTop();
        var panelHeight = parseInt($(floatingPanel).css("height"));
        //if ( parseInt($(document).height()) > (newPanelTop + panelHeight + offsetFromBottom)) {
        //    console.log("height"+parseInt($(document).height()) +' > '+ (newPanelTop +"+"+ panelHeight +"+"+ offsetFromBottom));
            $(floatingPanel).animate({top: newPanelTop + "px"}, {duration: 200, queue: false});
        //}
    });

    var adaptRight = function () {
        var panelRight = $(document).width() - (parseInt($('#content').offset().left) + parseInt($('#content').css('width'))) + "px";
        console.log("width: "+$(document).width() +'-'+ (parseInt($('#content').offset().left) +'+'+ parseInt($('#content').css('width'))) + "px");
        $(floatingPanel).css({'right': panelRight});
    }

    adaptRight();
    $(window).resize(function(){
        adaptRight();
    });

});