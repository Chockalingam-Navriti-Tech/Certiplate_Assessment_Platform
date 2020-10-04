# Video Popup #

A jQuery plugin for opening Vimeo and Youtube videos in a modal window.

 * Configurable embed settings.
 * Stylable with LESS (or CSS, whatever).


## Setup ##

Include jQuery and the videopopup js and css files in your HTML.

Make some links and add some video codes.

		<a href="#" class="my-video-links" data-vimeo="84215473">Vimeo</a>
		<a href="#" class="my-video-links" data-youtube="ppZzR-z8RqE">Youtube</a>

Do something like the following to make your links work:

    $('.my-video-links').videopopup({
		autoplay: true,
		color: '#f00'
	});


## Options ##

All options are optional. Defaults are shown below. Most options affect either Vimeo or Youtube links but you can specify them all together - it won't cause problems.

### Options for both ###

* autoplay (true)

### Options for Vimeo Links ###

* title (false)
* byline (false)
* portrait (false)
* color (#00adef)

### Options for Youtube links ###

* controls (true)
* showinfo (false)

### Events ###

You can use events like so:

    $('.my-link').videopopup().on('video:show', function() {
      console.log('This video is now showing.');
    });

#### Available events: ####

* video:show
* video:hide

