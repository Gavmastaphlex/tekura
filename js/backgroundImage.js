$(document).ready(function() {



    var totalimages = $(".background-image").length;
	var slidenum = 0;
	var slidenext = 0;
	var changeSpeed = 1000; /* in milliseconds */
    var backgroundDelay = 5000; /* in milliseconds */

    var windowSize;
    var backgroundTimer;
    var $backgroundImages = $('#homepage-container').find('.background-image');
    $backgroundImages.hide().eq(0).show();

    var smallScreenToBig = 0;

    // windowSize  = $(window).width();

    // if (windowSize > 563) {
    //     var backgroundTimer = setTimeout(changeBackground, backgroundDelay);
    //     $backgroundImages.hide().eq(0).show();
    //     console.log('The initial if statement has been activated - the first condition (window size > 563)');
    // } else {

    //     $backgroundImages.hide();
    //     clearTimeout(backgroundTimer);

    //     console.log('The initial if statement has been activated - the second condition (the window size must be less or equal to 563)');
    // }

    
    $(window).resize(function() {
        clearTimeout(backgroundTimer);
        windowSize  = $(window).width();
        // console.log('The windowsize is: ' + windowSize + 'px');
        if (windowSize > 563) {

            if (smallScreenToBig == 1) {
                $backgroundImages.hide().eq(slidenum).show();
                smallScreenToBig = 0;
            };

            backgroundTimer = setTimeout(changeBackground, backgroundDelay);
            // console.log('The window resize if statement is being activated - the first condition (window size > 563)');
        } else {

            $backgroundImages.hide();
            clearTimeout(backgroundTimer);
            // console.log('The window resize if statement has been activated - the second condition (the window size must be less or equal to 563)');
            smallScreenToBig = 1;
        }

    }).resize()

	
	var nextNum;

	
	    // $backgroundImages.eq(0).css('z-index', '1');

	function changeBackground() {
	    
        slidenext = slidenum + 1;
        if(slidenext >= totalimages){
        	slidenext = 0
        };

        // console.log('The slideNum is ' + slidenum);
        // console.log('The slideNext is ' + slidenext);

        $backgroundImages.eq(slidenext).fadeIn(changeSpeed);
        $backgroundImages.eq(slidenext).css('z-index', '1');
        
        $backgroundImages.eq(slidenum).delay(changeSpeed).fadeOut(changeSpeed);
		$backgroundImages.eq(slidenum).css('z-index', '0');

        slidenum++;
        if(slidenum >= totalimages){
      		slidenum = 0;
        } 

        if (windowSize > 563) {
            backgroundTimer = setTimeout(changeBackground, backgroundDelay);
            // console.log('The if statement in the changeBackground function is being activated - the first condition (window size > 563)');
        } else {
            $backgroundImages.hide();
            clearTimeout(backgroundTimer);
            // console.log('The if statement in the changeBackground function is being activated - the second condition (the window size must be less or equal to 563)');
        }

        
        
	};

});