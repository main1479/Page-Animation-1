function $(selector) {
	const self = document.querySelector(selector);

	return self;
}

window.addEventListener('DOMContentLoaded', () => {
	// init some data
	const pages = ['index.html', 'page2.html', 'page3.html', 'page4.html'];
	let currentPageIndex = 0;
	firstPageAnim();
	// ==================================
	// selecting Elements
	// ==================================
	const btnNext = $('.toggle__next');
	const btnPrev = $('.toggle__prev');

	btnNext.addEventListener('click', function () {
		fetchPage(pages[++currentPageIndex], true);

		if (currentPageIndex > 0) {
			btnNext.style = 'opacity: 1; visibility: visible;';
			btnPrev.style = 'opacity: 1; visibility: visible;';
		}
		if (currentPageIndex === pages.length - 1) {
			btnNext.style = 'opacity: 0; visibility: hidden;';
		}
	});

	btnPrev.addEventListener('click', function () {
		fetchPage(pages[--currentPageIndex], false);
		if (currentPageIndex === 0) {
			btnPrev.style = 'opacity: 0; visibility: hidden;';
		}
		if (currentPageIndex !== 0 && currentPageIndex < pages.length - 1) {
			btnPrev.style = 'opacity: 1; visibility: visible;';
			btnNext.style = 'opacity: 1; visibility: visible;';
		}
	});

	async function fetchPage(page, isNext) {
		let baseUrl = `${window.location.protocol}//${window.location.hostname}`;
		if(window.location.port){
			baseUrl += `:${window.location.port}`;
		}

		if (pages.indexOf(window.location.pathname.slice(1)) === -1) {
			baseUrl +=`${window.location.pathname}`;
		}
		const res = await fetch(`${baseUrl}/${page}`);
		const data = await res.text();
		let markup = new DOMParser().parseFromString(data, 'text/html');
		currentPageIndex = pages.indexOf(page);

		if (isNext) {
			if (currentPageIndex === 1) await firstPageOutAnim();
			if (currentPageIndex === 2) await secondPageOutAnim('left');
			if (currentPageIndex === 3) await thirdPageOutAnim('left');
		}

		if (!isNext) {
			if (currentPageIndex === 0) await secondPageOutAnim('right');
			if (currentPageIndex === 1) await thirdPageOutAnim('right');
			if (currentPageIndex === 2) await fourthPageOutAnim('right');
		}

		$('.container').appendChild(markup.querySelector('.row'));
		if (isNext) {
			if (currentPageIndex === 1) secondPageAnim('left');
			if (currentPageIndex === 2) thirdPageAnim('left');
			if (currentPageIndex === 3) fourthPageAnim('left');
		}
		if (!isNext) {
			if (currentPageIndex === 0) await firstPageAnim();
			if (currentPageIndex === 1) await secondPageAnim('right');
			if (currentPageIndex === 2) await thirdPageAnim('right');
			// if (currentPageIndex === 3) await fourthPageOutAnim('right');
		}
	}
});

function firstPageAnim() {
	anime
		.timeline({
			easing: 'easeInOutQuad',
		})
		.add({
			targets: 'h2.heading span, .btn__explore',
			translateX: [-400, 0],
			opacity: [0, 1],
			delay: anime.stagger(100),
			duration: 1000,
		})
		.add(
			{
				targets: '.collection',
				translateY: [200, 0],
				opacity: [0, 1],
				delay: anime.stagger(200),
				duration: 800,
			},
			'-=1000'
		)
		.add(
			{
				targets: '.content__top',
				width: [0, '100%'],
				duration: 1000,
			},
			'-=1000'
		)
		.add({
			targets: '.right__img',
			translateX: [-400, 0],
			opacity: [0, 1],
			duration: 800,
		});
}
function firstPageOutAnim() {
	return new Promise((resolve, reject) => {
		anime
			.timeline({
				easing: 'easeInOutQuad',
			})
			.add({
				targets: 'h2.heading span, .btn__explore',
				translateX: [0, -400],
				opacity: [1, 0],
				delay: anime.stagger(100),
				duration: 1000,
			})
			.add(
				{
					targets: '.collection',
					translateY: [0, 200],
					opacity: [1, 0],
					delay: anime.stagger(200),
					duration: 800,
				},
				'-=1000'
			)
			.add(
				{
					targets: '.content__top',
					width: 0,
					duration: 1000,
				},
				'-=1000'
			)
			.add({
				targets: '.right__img',
				translateX: [0, -400],
				opacity: [1, 0],
				duration: 800,
				complete: (anime) => {
					$('.row').remove();
					return resolve(this);
				},
			});
	});
}

function secondPageAnim(direction) {
	anime
		.timeline({
			easing: 'easeInOutQuad',
		})
		.add({
			targets:
				'h2.heading span, .product__title, .product__price, .btn, .product__img, .product__card',

			translateX: direction === 'left' ? [400, 0] : [-400, 0],
			opacity: [0, 1],
			delay: anime.stagger(100),
			duration: 1000,
		});
}

function secondPageOutAnim(direction) {
	return new Promise((resolve, reject) => {
		anime
			.timeline({
				easing: 'easeInOutQuad',
			})
			.add({
				targets:
					'h2.heading span, .product__title, .product__price, .btn, .product__img, .product__card',

				translateX: direction === 'left' ? [0, -400] : [0, 400],
				opacity: [1, 0],
				delay: anime.stagger(100),
				duration: 1000,
				complete: (anime) => {
					$('.row').remove();
					return resolve();
				},
			});
	});
}

function thirdPageAnim(direction) {
	anime
		.timeline({
			easing: 'easeInOutQuad',
		})
		.add({
			targets: 'h2.heading span, h3.heading-sub, .btn, .customer__card',

			translateX: direction === 'left' ? [400, 0] : [-400, 0],
			opacity: [0, 1],
			delay: anime.stagger(100),
			duration: 1000,
		});
}

function thirdPageOutAnim(direction) {
	return new Promise((resolve, reject) => {
		anime
			.timeline({
				easing: 'easeInOutQuad',
			})
			.add({
				targets: 'h2.heading span, h3.heading-sub, .btn, .customer__card',

				translateX: direction === 'left' ? [0, -400] : [0, 400],
				opacity: [1, 0],
				delay: anime.stagger(100),
				duration: 1000,
				complete: (anime) => {
					$('.row').remove();
					return resolve();
				},
			});
	});
}

function fourthPageAnim(direction) {
	anime
		.timeline({
			easing: 'easeInOutQuad',
		})
		.add({
			targets:
				'h2.heading span, h3.heading-sub, .input-group, .email, .message, .btn, .content__top',

			translateX: direction === 'left' ? [400, 0] : [-400, 0],
			opacity: [0, 1],
			delay: anime.stagger(100),
			duration: 1000,
		});
}

function fourthPageOutAnim(direction) {
	return new Promise((resolve, reject) => {
		anime
			.timeline({
				easing: 'easeInOutQuad',
			})
			.add({
				targets:
					'h2.heading span, h3.heading-sub, .input-group, .email, .message, .btn, .content__top',

				translateX: direction === 'left' ? [0, -400] : [0, 400],
				opacity: [1, 0],
				delay: anime.stagger(100),
				duration: 1000,
				complete: anime => {
					$('.row').remove();
					return resolve();
				}
			});
	});
}
