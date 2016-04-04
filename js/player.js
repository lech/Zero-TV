// https://developers.google.com/youtube/iframe_api_reference
var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// https://developers.google.com/youtube/player_parameters
var tv,
	playerDefaults = {
		autoplay: 1,
		loop: 1,
		autohide: 0,
		modestbranding: 1,
		rel: 0,
		fs: 0,
		showinfo: 0,
		controls: 0,
		disablekb: 1,
		enablejsapi: 0,
		iv_load_policy: 3
	};

	// Shuffle the array for good measure and interesting results
	// Function courtesy of - https://css-tricks.com/snippets/javascript/shuffle-array/
function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function onYouTubeIframeAPIReady() {
	tv = new YT.Player('tv', {
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange,
			'onError': onPlayerError
		}, playerVars: playerDefaults
	});
}

function onPlayerReady() {
	//tv.cuePlaylist(Shuffle(playlist)); start on state 5
	tv.loadPlaylist(Shuffle(playlist));
	tv.setPlaybackQuality('hires');
	tv.setLoop('true');
	tv.setVolume(20);
	fixedAspect();
}

function onPlayerStateChange(e) {
	// Debug: Monitor state changes.
	// -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
	// tv.addEventListener('onStateChange', function(e) { console.log('State:', e.data); });

	if (e.data === -1) {
		// Update the title of the current video.
		$('#nowplaying').html('<a href=\"http://youtu.be/' + tv.getVideoData().video_id + '\">' + tv.getVideoData().title + '</a>');
		// Show then hide the title after 2.5s
		$('#menu').addClass('visible');
		setTimeout(function(){ $('#menu').removeClass('visible'); }, 2500);

			console.info('State [' + e.data + ']: Unstarted.');

		// Debug: build a running list of videos played.
		// $('#debug').append('<a href=\"http://youtu.be/' + tv.getVideoData().video_id + '\">' + tv.getVideoData().title + '</a><br/>');
		// debug video information
		// console.log( tv.getVideoData().title, '');
		// console.log( tv.getVideoData().video_id, '');
		// console.log( tv.getVideoData().author, '');

	} else if (e.data === 0) {
			console.info('State [' + e.data + ']: Ended.');

	} else if (e.data === 1) {
		// Tell the player we're active and dial back the opacity.
		$('#tv').addClass('active');
			console.info('State [' + e.data + ']: Playing.');

	} else if (e.data === 2) {
			console.info('State [' + e.data + ']: Paused.');

	} else if (e.data === 3) {
			console.info('State [' + e.data + ']: Buffering.');

	} else if (e.data === 5) {
			console.info('State [' + e.data + ']: Cued.');

	}
}

function onPlayerError(e) {
	// Log errors. Do something or nothing. Red Screen of Death. Harikari. Your call.
	console.error('OH SHIT, MAN!: ERROR ( ' + e.data + ' ) DETECTED!');

	// Skip to the next video on any errors, if there's only one video stop.
	((playlist.length > 1) ? tv.nextVideo() : tv.stopVideo());

	if (e.data === 2) {
		console.warn('> ' + e.data + ': The request contains an invalid parameter value.');
	} else if (e.data === 5){
		console.warn('> ' + e.data + ': The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.');
	} else if (e.data === 100){
		console.warn('> ' + e.data + ': The video requested was not found, removed or made private.');
	} else if (e.data === 101){
		console.warn('> ' + e.data + ': The owner of the requested video does not allow it to be played in embedded players.');
	} else if (e.data === 150){
		console.warn('> ' + e.data + ': Same as Error 101. The owner of the requested video does not allow it to be played in embedded players.');
	}
}

function fixedAspect(){
	// Try and keep the aspect ratio 16:9 and vertically centered.
	var w = $(window).width();
	var h = $(window).height();
	var container = $('#bezel');
	var content = $('.screen');

	if (w/h>16/9) {
		tv.setSize(w, w/16*9);
			content.css('top', (container.height()-content.height())/2);
	} else {
		tv.setSize(h/9*16, h);
			content.css('top', (container.height()-content.height())/2);
	}
}

$(window).on('load resize fullscreenchange', function() {
	fixedAspect();
});
