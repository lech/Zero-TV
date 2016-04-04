# Zero-TV - As seen on [unattended.org](http://unattended.org/)!

--------------------------------------------------------------------------------

## About

Zero-TV is a flexible background player created in JavaScript using [jQuery](https://jquery.com/) and the [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) v3.

At the time, I wasn't able to find a modern background player which could be customized, so I decided to make one with a focus on playlist control. The player reads a static playlist array, shuffles it then begins playing once loaded.

The playlist is an array which supplies the `loadPlaylist` function and is stored in the following format:

```JAVASCRIPT
var playlist = [ 'Y62EgHvwa8k', '6ITD1tqXDII', 'rtChPB6NjJY' ];
```

There is one known [issue](#Troubleshooting) with this implementation if you are trying to load hundreds of videos. But for most cases I don't believe this should be a problem.

--------------------------------------------------------------------------------

 ## License
This project is covered under a [MIT License](LICENSE.md). Hack it up, go bonkers.

--------------------------------------------------------------------------------

## Troubleshooting

__*Some videos don't show or play.*__
* Check your playlist array and ensure that it's properly formatted. Check the console for other issues, it may also give clues why something isn't working.
* Some content authors may not want their videos to be embedded, are private or unavailable due to region restrictions. Use your own videos for best results.

__*My playlist of 500+ videos looks good, but nothing plays.*__
* When the playlist exceeds 145 items the player chokes and loops only the first video and refuses to play through the playlist. The YouTube Player API has no documentation on anything regarding any type of hard limits for the playlist size so I'm rather stumped by this one. Please enlighten me if you know of a solution or answer. Taking this from a static to dynamic format would probably solve this.

__*I can't click or close the advertisements!*__
* In the markup and styles there is a `#masking` layer which is placed over the entire window which captures an event for pausing and playing the video. You have a few options here:
	* Modify or remove this from the HTML/CSS if you want users to interact.
	* Use videos without ads.
* Users logged in with a Google Play / YouTube Red subscription won't see these advertisements.

__*All of these videos show up in my YouTube history!*__
* Duh.
