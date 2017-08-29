$(document).ready(function() {

	var mobileNav = 0;

	console.log('The window.innerHeight is: ' + window.innerHeight + 'px');

	$(function() {
		if (isTouchDevice()) {

			orientationChange();

			window.addEventListener("orientationchange", function() {
				orientationChange();
			}, false);


			$('head').append('<link rel="stylesheet" href="css/mobile.css" type="text/css" />');

			$('#secondary-nav > .sideMenuLink > a').each(function() {

				// console.log($(this).html());

				if ($(this).html().toLowerCase() == $('#page-heading').html().toLowerCase()) {

					var subMenuOptions = $(this).parent().next().children();
		
					if (subMenuOptions) {

						subMenuOptions.children().each(function() {

							if ($(this).children().html().toLowerCase() == $('.main-content h2:first').html().toLowerCase()) {

								$('#mobile-circle-nav-container ul').append('<li>' + $(this).children().html() + '</li>');

							} else {

								$('#mobile-circle-nav-container ul').append($(this));

							}

							$('#mobile-circle-nav-container').css('margin-bottom', '10vw');

							
						})

					};

					// travel up the DOM one stage from <a> tag selected then find a .sidemenu sibling

					// if there is none then cancel, as it means it's just a normal menu option


				};
			})
			
			$( "body" ).on( "swiperight", showMainMenu );
			$( "body" ).on( "swipeleft", hideMainMenu );

			$( ".secondary-nav-container .sideMenuLink" ).each(function() {

				if($(this).children('.fa')) {
					$(this).children('.fa').remove();
				}

				if($(this).siblings('.sideSubMenu')) {
					$(this).siblings('.sideSubMenu').remove();
				}

			});

			$('.mobile-nav-button').on('click', function() {
				$('.secondary-nav-container').addClass('extended').removeClass('collapse');
				$('body').css('overflow', 'hidden');
			})

			$('.mobile-nav-close').on('click', function() {
				$('.secondary-nav-container').addClass('collapse').removeClass('extended');
				$('body').css('overflow', 'visible');
			})

			/* Possible to not activate the function when selecting text / <p> tags?? */


			// console.log($('#page-heading').html());

			


		} else {

			$( ".sideMenuLink" ).each(function() {

				if($(this).next().attr('class') == 'sideSubMenu') {

					var linkText = $(this).children('a').html();
					$(this).children('a').remove();
					$(this).prepend(linkText);

				}

			  	
			});

		}
	});

	var submenuHeight = 0;

	$(window).resize(function() {
		
		var windowSize = $(window).width();
			$('#top-search-form').css('display', "none");
			if (windowSize <= 1629) {
	            $('#search').animate({width: '3.7vw', left: '-3vw'}, 350, function() {
				      searchRunning = 0;
				  });
	        }
	        else {
	            $('#search').animate({width: '60.27px', left: '-48.9px'}, 350, function() {
				      searchRunning = 0;
				  });
	        }
	
		search = 0;

	    
	    $("#search").css({
			transition : 'background-color 500ms ease-in-out, color 500ms ease-in-out',
			"background-color": "transparent",
			"color": "#FFF"
		});

	    var i = 0;

	    $('#login-submenu li').each(function() {
	    	// console.log('Number ' + i + ' = padding-top:' + parseInt($(this).css('padding-top'), 10) + ', line-height:' + parseInt($(this).css('line-height'), 10) + ', padding-bottom:' + parseInt($(this).css('padding-bottom'), 10))
	    	submenuHeight = submenuHeight + parseInt($(this).css('padding-top'), 10) + parseInt($(this).css('line-height'), 10) + parseInt($(this).css('padding-bottom'), 10);
	    })

	    $('#login-submenu').css('height', submenuHeight + (submenuHeight * .115));

	    submenuHeight = 0;

	}).resize()

	$('.hamburger').click(function() {
		if($(this).hasClass( "is-active" )) {
			hideMainMenu()
		} else {
			showMainMenu()
		}
	})

	$('.sideMenuLink').click(function(){
		var thisSubMenu = $(this).next();
		var rootSubMenu = $(this).closest('.side-menu');
		if($(this).next().attr('class') == 'sideSubMenu') {
			if(thisSubMenu.css( "display" ) != 'block'){
				rootSubMenu.find('.sideSubMenu').stop(true, true).slideUp('slow');
				rootSubMenu.find('.fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
				thisSubMenu.stop(true, true).slideDown('slow');
				$(this).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
				if($(this).parent().attr('id') == 'accordian') {
					$('.active-accordian').removeClass('active-accordian');
					$(this).addClass('active-accordian');
				}
			} else {
				$('.active-accordian').removeClass('active-accordian');
				rootSubMenu.find('.sideSubMenu').stop(true, true).slideUp('slow');
				rootSubMenu.find('.fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
				if($(this).parent().attr('id') == 'accordian') {
					$('.active-accordian').removeClass('active-accordian');
				}
			}

		}
		
	})

	

	$('#advanced-search').click(function(){

		if($('#advanced-search-container').css('display') == 'block') {
			console.log('The advanced search is extended.');
			$('#advanced-search-container').slideUp('slow');
			$(this).html('Advanced Search <i class="fa fa-chevron-down" aria-hidden="true"></i>');
		} else {
			console.log('The advanced search is collapsed.');
			$('#advanced-search-container').slideDown('slow');
			$(this).html('Simple Search <i class="fa fa-chevron-up" aria-hidden="true"></i>');
		}

		
	})

	$('#login').hover(function() {
			$('#login-submenu').css('background-color', '#FFF');
			$('#login').css({backgroundColor : '#FFF', border: '2px solid #DDD'});
			$('#login p').css('color', '#6e6e70');
			$('#login-submenu').stop().slideDown();
			
		}, function() {
			$('#login-submenu').stop().slideUp(function() {
			$('#login-submenu').css('background-color', 'none');
			$('#login').css({backgroundColor : 'transparent', border: '2px solid #FFF'});
			$('#login p').css('color', '#FFF');
		});
	});

	$('.search-dropdown').hover(function() {
			var targID = $(this).attr('id');
			var newID = targID.replace("dropdown", "search");
			$('#' + newID).stop().slideDown();
		}, function() {
			var targID = $(this).attr('id');
			var newID = targID.replace("dropdown", "search");
			$('#' + newID).stop().slideUp();

		});

	$('#search-icon').click(searchFunction);

	$('#searchBox').keypress(function (e) {
		if (e.which == 13) {
			searchFunction()
		}
	});

	$('#search').on("mouseover", onSearch)
	$('#search').on("mouseout", offSearch)

	$(document).click(function() {
		$('#top-search-form').css('display', "none");
		var windowSize = $(window).width();
        if (windowSize <= 1629) {
            $('#search').animate({width: '3.7vw', left: '-3vw'}, 350);
        }
        else {
            $('#search').animate({width: '60.27px', left: '-48.9px'}, 350);
        }
		search = 0;
		$('#top-search-form input').val('');
		offSearch()
		hideMainMenu()
	});

	$("#search").click(function(e) {
		e.stopPropagation(); // This is the preferred method.
		return false;        // This should not be used unless you do not want
		// any click events registering inside the div
	});

	$("#main-side-menu").click(function(e) {
		e.stopPropagation(); // This is the preferred method.
		// return false;        // This should not be used unless you do not want
		// any click events registering inside the div
	});

	$("#hamburger-container").click(function(e) {
		e.stopPropagation(); // This is the preferred method.
		return false;        // This should not be used unless you do not want
		// any click events registering inside the div
	});

	$('.search-dropdown li').click(function(){
		var targValue = $(this).html();
		var gparentID = $(this).parent().parent().attr('id');
		var category = gparentID.split('-');
		$('#chosen-' + category[0]).html(targValue);
		$('.search-submenu').hide();
	})


	$(function(){
		$('.checkbox').on('click',function(){
			$(this).toggleClass('checked')
		})
	});

	$(function(){
		if($('#accordian')) {
			var pageHeading = $('#page-heading').attr('class');
			var thisSection = pageHeading.split('-main-color');
			$('#accordian').find('.sideMenuLink').addClass(thisSection[0] + '-sub-color');
			$('#accordian').find('.fa').addClass(thisSection[0] + '-sub-color');
		}

	});

	
}); /*END OF $(DOCUMENT).READY(FUNCTION(){}*/

var search = 0;
var searchRunning = 0;
var scrollThreshold = 0;

$(window).scroll(function() {

	 var navHeight =  120;

	 $('.pulse-down').fadeOut('slow');

	if($('.hamburger').hasClass( "is-active" )) {
		hideMainMenu();
	}
 
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
       
		if ($(window).scrollTop() > navHeight && scrollThreshold == 0) {

			$('#header').css({position:'fixed', top: '-114px', backgroundColor: '#333'});
			$('#header').animate({top: '0px'}, 300);

			scrollThreshold = 1;

		} else if ($(window).scrollTop() == 0 && scrollThreshold == 1) {

			$('#header').css({backgroundColor: 'transparent', position:'absolute', top: '0px'});

			scrollThreshold = 0;

		} else if ($(window).scrollTop() < navHeight && scrollThreshold == 1) {

			$('#header').css({backgroundColor: 'transparent'});

			$( "#header" ).animate({
			    top: '-114px',
			    backgroundColor: 'transparent'
			  }, 300, function() {
			    $('#header').css({position:'absolute', top: '0px'});
			  });

			scrollThreshold = 0;

		}
    }, 100));
});

function isTouchDevice() {
	return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function isAppleDevice() {
	return /iPhone|iPod/.test(navigator.userAgent)
}

function onSearch() {
	// console.log('onSearch activated, search = ' + search);
	$("#search").css({
		transition : 'background-color 500ms ease-in-out, color 500ms ease-in-out',
		"background-color": "#FFF",
		"color": "#6e6e70"
	});
}

function offSearch() {
	// console.log('offSearch activated, search = ' + search);
	if(search != 1) {
		$("#search").css({
			transition : 'background-color 500ms ease-in-out, color 500ms ease-in-out',
			"background-color": "transparent",
			"color": "#FFF"
		});
	}
}

function orientationChange() {

	var currentWidth = $('.main-content').css('width');
	$('iframe').css('width', currentWidth);

	
	if(window.innerWidth > window.innerHeight){

		if (isAppleDevice()) {
			$('.secondary-nav-container .sideMenuLink').css('line-height', '4.1vw');
			$('#secondary-nav').css('top', '14px');
		}

		console.log('Landscape view detected');


	} else {

		$('.secondary-nav-container .sideMenuLink').css('line-height', '1.8vw');
		$('#secondary-nav').css('top', '35px');

		console.log('Potrait view detected');

	}

}


function searchFunction() {
	
	event.preventDefault();

	var windowSize = $(window).width();

	if(searchRunning == 0) {

		searchRunning = 1;

		if(search == 0) {
			$('#top-search-form').css('display', "block");
			if (windowSize <= 1629) {
	            $('#search').animate({width: '30vw', left: '-29.3vw'}, 350, function() {
				      searchRunning = 0;
				  });
	        } else {
	            $('#search').animate({width: '489px', left: '-477.59px'}, 350, function() {
				      searchRunning = 0;
				  });
	        }
			search = 1;
		} else if (search == 1 && !$('#top-search-form input').val()) {
			$('#top-search-form').css('display', "none");
			if (windowSize <= 1629) {
	            $('#search').animate({width: '3.7vw', left: '-3vw'}, 350, function() {
				      searchRunning = 0;
				  });
	        } else {
	            $('#search').animate({width: '60.27px', left: '-48.9px'}, 350, function() {
				      searchRunning = 0;
				  });
	        }
			search = 0;
		} else {
			alert('Searching: ' + $('#top-search-form input').val());
			$('#top-search-form').css('display', "none");
			if (windowSize <= 1629) {
	            $('#search').animate({width: '3.7vw', left: '-3vw'}, 350, function() {
				      searchRunning = 0;
				  });
	        }
	        else {
	            $('#search').animate({width: '60.27px', left: '-48.9px'}, 350, function() {
				      searchRunning = 0;
				  });
	        }
	        
			search = 0;
			offSearch()
			$('#top-search-form input').val('');
		}
	}
};

function hideMainMenu() {


	$('.hamburger').removeClass( "is-active" );
	$('#main-side-menu').addClass('noHoriz').removeClass('horiz');
	$('#main-side-menu').addClass('noColor').removeClass('color');
	$('#menu-label').fadeIn("fast");



	var windowSize = $(window).width();
        if (windowSize <= 580) {
            
        }
        else {
            
        }

	
}

function showMainMenu() {
	$('.hamburger').addClass( "is-active" );
	$('#main-side-menu').addClass('horiz').removeClass('noHoriz');
	$('#main-side-menu').addClass('color').removeClass('noColor');
	$('#menu-label').fadeOut("fast");



	var windowSize = $(window).width();
        if (windowSize <= 580) {
            
        }
        else {
            
        }

}