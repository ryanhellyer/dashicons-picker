/**
 * Dashicons Picker
 *
 * Based on: https://github.com/bradvin/dashicons-picker/
 */

( function ( $ ) {

	/**
	 *
	 * @returns {void}
	 */
	$.fn.dashiconsPicker = function () {

		/**
		 * Dashicons, in CSS order
		 *
		 * @type Array
		 */
		var icons = [
			'menu',
			'admin-site',
			'dashboard',
			'admin-media',
			'admin-page',
			'admin-comments',
			'admin-appearance',
			'admin-plugins',
			'admin-users',
			'admin-tools',
			'admin-settings',
			'admin-network',
			'admin-generic',
			'admin-home',
			'admin-collapse',
			'filter',
			'admin-customizer',
			'admin-multisite',
			'admin-links',
			'format-links',
			'admin-post',
			'format-standard',
			'format-image',
			'format-gallery',
			''
		];

		return this.each( function () {

			var button = $( this );

			button.on( 'click.dashiconsPicker', function () {
				createPopup( button );
			} );

			function createPopup( button ) {

				var target = $( button.data( 'target' ) ),
					popup  = $( '<div class="dashicon-picker-container"> \
						<div class="dashicon-picker-control" /> \
						<ul class="dashicon-picker-list" /> \
					</div>' )
						.css( {
							'top':  button.offset().top,
							'left': button.offset().left
						} ),
					list = popup.find( '.dashicon-picker-list' );

				for ( var i in icons ) {
					list.append( '<li data-icon="' + icons[i] + '"><a href="#" title="' + icons[i] + '"><span class="dashicons dashicons-' + icons[i] + '"></span></a></li>' );
				};

				$( 'a', list ).click( function ( e ) {
					e.preventDefault();
					var title = $( this ).attr( 'title' );
					target.val( 'dashicons-' + title );
					removePopup();
				} );

				var control = popup.find( '.dashicon-picker-control' );

				control.html( '<a data-direction="back" href="#"> \
					<span class="dashicons dashicons-arrow-left-alt2"></span></a> \
					<input type="text" class="" placeholder="Search" /> \
					<a data-direction="forward" href="#"><span class="dashicons dashicons-arrow-right-alt2"></span></a>'
				);

				$( 'a', control ).click( function ( e ) {
					e.preventDefault();
					if ( $( this ).data( 'direction' ) === 'back' ) {
						$( 'li:gt(' + ( icons.length - 26 ) + ')', list ).each( function () {
							$( this ).prependTo( list );
						} );
					} else {
						$( 'li:lt(25)', list ).each( function () {
							$( this ).appendTo( list );
						} );
					}
				} );

				popup.appendTo( 'body' ).show();

				$( 'input', control ).on( 'keyup', function ( e ) {
					var search = $( this ).val();
					if ( search === '' ) {
						$( 'li:lt(25)', list ).show();
					} else {
						$( 'li', list ).each( function () {
							if ( $( this ).data( 'icon' ).toLowerCase().indexOf( search.toLowerCase() ) !== -1 ) {
								$( this ).show();
							} else {
								$( this ).hide();
							}
						} );
					}
				} );

				$( document ).mouseup( function ( e ) {
					if ( ! popup.is( e.target ) && popup.has( e.target ).length === 0 ) {
						removePopup();
					}
				} );
			}

			function removePopup() {
				$( '.dashicon-picker-container' ).remove();
			}
		} );
	};

	$( function () {
		$( '.dashicons-picker' ).dashiconsPicker();
	} );

	$(document).on('widget-updated widget-added', function( event, $widget ){
		$widget.find( '.dashicons-picker' ).dashiconsPicker();
	});

}( jQuery ) );