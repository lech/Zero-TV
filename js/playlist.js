function filteredYouTube(urlHash) {
	// grep a hash value for a valid YouTube URL and video ID
	var smallRegExp = /([a-zA-Z0-9_-]{11})/;
	var largeRegExp = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/;

	if (urlHash.length == 12) {
		var match = urlHash.match(smallRegExp);
	} else {
		var match = urlHash.match(largeRegExp);
	}

	if (match && match[1].length == 11) {
		return match[1];
	} else {
		return null;
	}
}

var videoHash = filteredYouTube(window.location.hash);

if (videoHash != null && videoHash.length == 11) {
	var playlist = [ videoHash ];
	// console.info('Playing submitted video: ', videoHash);
} else {

	// console.warn('The hash data was blank or invalid. Playing default playlist...');
	var playlist = [
		'Y62EgHvwa8k', // TV Color Bars - Distorted with Static and Timecode
		'u61F_qvdid0', // The Proper Way to End Your Film
		'EbuPaCgdO50', // Greatest ending known to movies
		'k4rpsE4WnpU', // vitas.wat
		'0123456789a', // This video is intentionally invalid.
		'oQaasxr3zWY', // Shieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeet
		'yr_Rpk9HR1g', // Super Марио Brothers
		'HSQ03mfV5ms', // ~xX[[MLG]PRO IE9 360 NO-REFRESH Xx~
		's_IHi3u7b8w', // Luke Squanchwalker
		'9hO8Cq5KPxc', // UNSEEN MOON FOOTAGE, WITH AUDIO
		'c9GU4P-1AWI', // Deer Fart.wmv
		'rtChPB6NjJY', // Bobby
		'i9TsmU9-e3E', // twolitarr
		'1mA7BbliyL8', // Congratulations! You are the 1.000.000 car crash!
		'W3abMUH_P1E', // Spiderman.mp4
		'i7gIpuIVE3k' // Garbage Day! (high quality)
	];
}
