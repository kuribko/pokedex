$(document).ready(function () {

    var adaptButtonWidth = function () {
        var listWidth = parseInt($('.list').css('width'));
        var itemWidth = parseInt($('.item').css('width'));
        var itemMargin = parseInt($('.item').css('margin'));
        var itemsInRow = (listWidth - listWidth % (itemWidth+itemMargin*2)) / (itemWidth+itemMargin*2);

        var buttonWidth = itemWidth * itemsInRow + (itemMargin * 2 * (itemsInRow - 1))-itemMargin;
        console.log('list width:' + listWidth + '; item width: ' + itemWidth + '; items in row: ' + itemsInRow + '; item margin: ' + itemMargin);
        console.log('button width: '+buttonWidth);
        $('#load-more-button').css({'width': buttonWidth+'px'});

        //var panelRight = $(document).width() - (parseInt($('#content').offset().left) + parseInt($('#content').css('width'))) + "px";
        //$(floatingPanel).css({'right': panelRight});
    }

    adaptButtonWidth();
    $(window).resize(function () {
        adaptButtonWidth();
    });

});