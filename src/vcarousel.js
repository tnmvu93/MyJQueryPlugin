;$(document).ready(function() {
	$('#goLeft').vCarousel({
		action: 'goLeft',
	}); 

	$('#goRight').vCarousel({
		action: 'goRight',
	});

	$('.photo-paging a').vCarousel({
		action: 'chooseImage',
		
		initFunction: function () {
			$('.photo-paging a').first().addClass('active-img');
		}
	});
});