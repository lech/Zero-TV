$('#zero, .close').on('click', function(){
	channelToggleAbout();
});

$('.nextvid').on('click', function() {
	channelNextVideo();
});

$('.prevvid').on('click', function() {
	channelPreviousVideo();
});

$('.playvid, #masking').on('click', function() {
	channelPlayPauseVideo();
});

$('.mute').on('click', function() {
	channelMuteVideo();
});

$('.loopvid').on('click', function() {
	channelLoopVideo();
});

function channelNextVideo() {
	tv.nextVideo();
	$('#tv').removeClass('inactive');
	$('.playvid').addClass('true');
}

function channelPreviousVideo() {
	tv.previousVideo();
	$('#tv').removeClass('inactive');
	$('.playvid').addClass('true');
}

function channelPlayPauseVideo() {
	$('.playvid').toggleClass('true');

	if ($('.playvid').hasClass('true')) {
		tv.playVideo();
		$('#tv').removeClass('inactive');
	} else {
		tv.pauseVideo();
		$('#tv').addClass('inactive');
	}
}

function channelMuteVideo() {
	$('.mute').toggleClass('true');

	if($('.mute').hasClass('true')) {
		tv.mute();
	} else {
		tv.unMute();
	}
}

function channelLoopVideo() {
	window.location = '#' + tv.getVideoData().video_id;
	setTimeout( location.reload(), 500);
}

function channelToggleAbout() {
	if ($('#about').hasClass('visible')) {
		$('#about').removeClass('visible');
			channelPlayPauseVideo();
	} else {
		$('#about').addClass('visible');
		if ($('.playvid').hasClass('true')) {
			channelPlayPauseVideo();
		}
	}
}

// Keyboard Shortcuts
$(document).keydown(function(e) {
	var volumeUp = (tv.getVolume()+10)/100;
	var volumeDn = (tv.getVolume()-10)/100;

	switch(e.which) {
		case 32: // space - Play+Pause Video
			channelPlayPauseVideo();
		break;

		case 37: // left - Previous Video
			channelPreviousVideo();
		break;

		case 38: // up - Volume Up
			updateVolume(0,volumeUp);
		break;

		case 39: // right - Next Video
			channelNextVideo();
		break;

		case 40: // down - Volume Down
			updateVolume(0,volumeDn);
		break;
		// Exit nicely
		default: return;
	}
	// Prevent default actions for keyboard
	e.preventDefault();
});

// VOLUME
// Grafted from another HTML5 video player made by Kenny and lightly modified.
// Source: http://www.inwebson.com/html5/custom-html5-video-controls-with-jquery/
var volumeDrag = false;

$('.volumegutter').on('mousedown', function(e) {
	volumeDrag = true;
	updateVolume(e.pageX);
});

$(document).on('mouseup', function(e) {
	if(volumeDrag) {
		volumeDrag = false;
		updateVolume(e.pageX);
	}
});

$(document).on('mousemove', function(e) {
	if(volumeDrag) {
		updateVolume(e.pageX);
	}
});

var updateVolume = function(x, vol) {
var volume = $('.volumegutter');
var percentage;

	if(vol) {
		percentage = vol * 100;
	} else {
		var position = x - volume.offset().left;
		// we don't need floating point volume values, round it out.
		percentage = Math.round(100 * position / volume.width());
	}
	if(percentage > 100) {
		percentage = 100;
	}
	if(percentage < 0) {
		percentage = 0;
	}
	// Update the everything
	$('.volumebar').css('width', percentage + '%');
		tv.volume = percentage / 100;
		tv.setVolume(percentage);
};
