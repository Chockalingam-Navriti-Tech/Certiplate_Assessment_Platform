/**
 * Oh, hey there. Welcome to the code.
 */
(function ($) {
	$.fn.videopopup = function (action) {

	var elems = $(this);
		function makeURL(link) {
			if (link.data('type') === 'youtube') {
				return 'https://www.youtube.com/embed/' + link.data('youtube') + '?rel=0&amp;autoplay=' + (settings.autoplay ? '1' : '0') + '&amp;controls=' + (settings.controls ? '1' : '0') +  '&amp;showinfo=' + (settings.showinfo ? '1' : '0');
			} else {
				return 'https://player.vimeo.com/video/' + link.data('vimeo') + '?autoplay=' + (settings.autoplay ? '1' : '0') + '&amp;title=' + (settings.title ? '1' : '0') + '&amp;byline=' + (settings.byline ? '1' : '0') + '&amp;portrait=' + (settings.portrait ? '1' : '0') + '&amp;color=' + settings.color;
			}
		}

		function showPopup(link) {
			var iframe = $('<iframe />')
				.attr({
					frameborder: 0,
					src: makeURL(link),
					webkitallowfullscreen: 'webkitallowfullscreen',
					mozallowfullscreen: 'mozallowfullscreen',
					allowfullscreen: 'allowfullscreen'
				});

			var mask = $('<div />').attr('id', 'popup-mask').appendTo($('body'));
			var inner = $('<div />').attr('id', 'popup-inner').appendTo(mask);
			var closer = $('<a />').addClass('popup-close').html(settings.close_content).attr('href', '#').appendTo(inner).on('click', $.proxy(hidePopup, this));
			var content = $('<div />').attr('id', 'popup-content').append(iframe).appendTo(inner);

			mask.fadeIn(100);

			$(document).on('keyup', $.proxy(handleKeypress, this));
			$(this).trigger('video:show');
		}

		function handleKeypress(e) {
			e.preventDefault();

			if (e.which === 27) { // esc
				hidePopup.call(this);
			}
		}

		function hidePopup() {
			$('#popup-mask').fadeOut(function () {
				$('#popup-mask').remove();
			});

			$(document).off('keyup', $.proxy(handleKeypress, this));
			$(this).trigger('video:hide');
		}

		var settings = $.extend({
 				// Vimeo options
				autoplay: true,
				title:    false,
				byline:   false,
				portait:  false,
				color:    '#00adef',
				close_content: '<svg xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:cc="https://creativecommons.org/ns#" xmlns:rdf="https://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="https://www.w3.org/TR/SVG/" xmlns="https://www.w3.org/TR/SVG/" version="1.0" width="31" height="31" viewBox="0 0 31 31" id="Layer_1" xml:space="preserve"><metadata id="metadata3005"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="https://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs id="defs3003" /><path d="M 15.5,3 C 8.596,3 3,8.596 3,15.5 3,22.404 8.596,28 15.5,28 22.404,28 28,22.404 28,15.5 28,8.596 22.404,3 15.5,3 m 0,22.6565 C 9.8905,25.6565 5.3435,21.1095 5.3435,15.5 5.3435,9.8905 9.8905,5.344 15.5,5.344 c 5.6095,0 10.1565,4.5465 10.1565,10.156 0,5.6095 -4.547,10.1565 -10.1565,10.1565" id="path2997" style="fill:#ffffff" /><path d="M 11.610912,8.782485 8.782485,11.610912 12.671573,15.5 8.782485,19.389088 11.610912,22.217514 15.5,18.328427 19.389088,22.217514 22.217514,19.389088 18.328427,15.5 22.217514,11.610912 19.389088,8.782485 15.5,12.671573 z" id="path3009" style="fill:#ffffff;stroke:none" /></svg>',

				// Youtube options
				controls: true,
				showinfo: false
			}, (typeof action === 'object' ? action : {}));

		switch (action) {
			case 'show':
				showPopup.call(this, $(this).first());
				break;
			case 'hide':
				hidePopup.call(this);
				break;
			default:
				this.each(function () {
					$(this)
						.data('type', ($(this).data('youtube') ? 'youtube' : 'vimeo'))
						.on('click', function (e) {
							if (e.button === 0) { // Don't hijack middle click!
								e.preventDefault();
								showPopup.call(this, $(this));
							}
						});
				});
		}

		return this;
	};
}(jQuery));
