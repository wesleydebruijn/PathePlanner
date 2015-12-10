(function () {
	'use strict';
	angular
		.module('angular-owl-carousel', [])
		.directive('owlCarousel', [
			'$parse',
			owlCarouselDirective
		]);

	function owlCarouselDirective($parse) {

		var owlOptions = [
			'items',
			'margin',
			'loop',
			'center',
			'mouseDrag',
			'touchDrag',
			'pullDrag',
			'freeDrag',
			'merge',
			'mergeFit',
			'autoWidth',
			'startPosition',
			'URLhashListener',
			'nav',
			'navRewind',
			'navText',
			'slideBy',
			'dots',
			'dotsEach',
			'dotData',
			'lazyLoad',
			'lazyContent',
			'autoplay',
			'autoplayTimeout',
			'autoplayHoverPause',
			'smartSpeed',
			'fluidSpeed',
			'autoplaySpeed',
			'dotsSpeed',
			'dragEndSpeed',
			'callbacks',
			'responsive',
			'responsiveRefreshRate',
			'responsiveBaseElement',
			'responsiveClass',
			'video',
			'videoHeight',
			'videoWidth',
			'animateOut',
			'animateIn',
			'fallbackEasing',
			'info',
			'nestedItemSelector',
			'itemElement',
			'stageElement',
			'navContainer',
			'dotsContainer',
			// Classes
			'themeClass',
			'baseClass',
			'itemClass',
			'centerClass',
			'activeClass',
			'navContainerClass',
			'navClass',
			'controlsClass',
			'dotClass',
			'dotsClass',
			'autoHeightClass',
			// Callbacks
			'onInitialize',
			'onInitialized',
			'onResize',
			'onResized',
			'onRefresh',
			'onRefreshed',
			'onDrag',
			'onDragged',
			'onTranslate',
			'onTranslated',
			'onChange',
			'onChanged',
			'onStopVideo',
			'onPlayVideo',
			'onLoadLazy',
			'onLoadedLazy'
		];

		return {
			restrict: 'A',
			transclude: true,
			link: function (scope, element, attributes, controller, $transclude) {

				var options = {
					margin: 10,
          autoWidth:true,
					items: 1,
					pullDrag: false,
					nav: false,
					navText: ["&laquo;", "&raquo;"],
					responsive:{
			        0:{
			          items:1,
								nav: false
			        },
							300: {
								items: 2,
								nav: false
							},
			        600:{
			          items:3,
								nav: false
			        },
							900: {
								items: 4,
								nav: false
							},
							1200: {
								items: 5,
								nav: false
							},
			        1500:{
			          items:8,
								nav: false
			        }
			    },
				},
					$element = $(element),
					owlCarousel = null,
					propertyName = attributes.owlCarousel;

				for (var i = 0; i < owlOptions.length; i++) {
					var opt = owlOptions[i];
					if (attributes[opt] !== undefined) {
						options[opt] = $parse(attributes[opt])();
					}
				}

				scope.$watchCollection(propertyName, function (newItems, oldItems) {

					if (owlCarousel) {
						owlCarousel.destroy();
					}
					$element.empty();

					for (var i in newItems) {
						$transclude(function (clone, scope) {
							scope.item = newItems[i];
							$element.append(clone[1]);
						});
					}

					$element.owlCarousel(options);
					owlCarousel = $element.data('owlCarousel');
					$element.on('mousewheel', '.owl-stage', function (e) {
							if (e.deltaY>0) {
									$element.trigger('next.owl');
							} else {
									$element.trigger('prev.owl');
							}
							e.preventDefault();
					});
				});
			}
		};
	}

})();