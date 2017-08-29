var timer = setTimeout(moveRight, 4000); 

	var slideCount = $('#slider ul li').length; /* =4 */
	var slideWidth = $('#slider ul li').width(); /* =500px */
	var slideHeight = $('#slider ul li').height(); /* =300px */
	var sliderUlWidth = slideCount * slideWidth; /* 4 x 500px = 2000px */
    var leftMargin = slideWidth - (slideWidth / 4); /* 500px - 125px = 375px */
    var containerWidth = slideWidth + (slideWidth / 2);
	
	$('#slider').css({ width: containerWidth, height: slideHeight }); /* width:500px, height:300px */
	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - leftMargin }); /* width:2000px, marginLeft: -500px */
    $('#slider ul li:last-child').prependTo('#slider ul'); /*  */

    $(function(){
        $(".control_prev").bind("click", moveLeft);
        $(".control_next").bind("click", moveRight);
    });

    function moveLeft(event) {
        clearTimeout(timer);
        timer = setTimeout(moveRight, 4000); 
        $(".control_prev").unbind("click");
        $('#slider ul li:last-child').prependTo('#slider ul');
        var currentMarginLeft = parseInt($('#slider ul').css('marginLeft'))
        var newMarginLeft = currentMarginLeft - slideWidth;
        $('#slider ul').css({marginLeft: newMarginLeft}); /* width:2000px, marginLeft: -500px */
        var newLeft = parseInt($('#slider ul').css('left')) + slideWidth
        $('#slider ul').animate({
            left: newLeft
        }, 500, function () {
            $('#slider ul').css('left', '');
            $('#slider ul').css('margin-left', currentMarginLeft);
            $(".control_prev").bind("click", moveLeft);
        });
    };

    function moveRight(event) {
        clearTimeout(timer);
        timer = setTimeout(moveRight, 4000); 
        $(".control_next").unbind("click");
        var newLeft = parseInt($('#slider ul').css('left')) - slideWidth
        $('#slider ul').animate({
            left: newLeft
        }, 500, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
            $(".control_next").bind("click", moveRight);
        });
    };