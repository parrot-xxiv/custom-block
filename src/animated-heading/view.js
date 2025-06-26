import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
	const animatedHeadings = document.querySelectorAll('.wp-block-animated-heading');

	animatedHeadings.forEach((block) => {
		const heading = block.querySelector('h1, h2, h3, h4, h5, h6');
		if (!heading) return;

		const animation = block.dataset.animation || 'fadeInUp';
		const duration = parseFloat(block.dataset.duration) || 1;
		const delay = parseFloat(block.dataset.delay) || 0;
		const triggerOnScroll = block.dataset.triggerScroll !== 'false';

		// Set initial state
		gsap.set(heading, getInitialState(animation));

		// Create animation
		const tl = gsap.timeline({ paused: true });
		tl.to(heading, {
			...getFinalState(animation),
			duration: duration,
			delay: delay,
			ease: getEase(animation),
		});

		if (triggerOnScroll) {
			ScrollTrigger.create({
				trigger: block,
				start: 'top 80%',
				onEnter: () => tl.play(),
				onLeaveBack: () => tl.reverse(),
			});
		} else {
			// Play immediately with delay
			setTimeout(() => tl.play(), delay * 1000);
		}
	});
});

function getInitialState(animation) {
	switch (animation) {
		case 'fadeInUp':
			return { opacity: 0, y: 50 };
		case 'fadeInDown':
			return { opacity: 0, y: -50 };
		case 'fadeInLeft':
			return { opacity: 0, x: -50 };
		case 'fadeInRight':
			return { opacity: 0, x: 50 };
		case 'scaleIn':
			return { opacity: 0, scale: 0.5 };
		case 'rotateIn':
			return { opacity: 0, rotation: -180 };
		case 'bounceIn':
			return { opacity: 0, scale: 0.3 };
		case 'slideInUp':
			return { y: 100 };
		default:
			return { opacity: 0, y: 50 };
	}
}

function getFinalState(animation) {
	switch (animation) {
		case 'fadeInUp':
		case 'fadeInDown':
			return { opacity: 1, y: 0 };
		case 'fadeInLeft':
		case 'fadeInRight':
			return { opacity: 1, x: 0 };
		case 'scaleIn':
			return { opacity: 1, scale: 1 };
		case 'rotateIn':
			return { opacity: 1, rotation: 0 };
		case 'bounceIn':
			return { opacity: 1, scale: 1 };
		case 'slideInUp':
			return { y: 0 };
		default:
			return { opacity: 1, y: 0 };
	}
}

function getEase(animation) {
	switch (animation) {
		case 'bounceIn':
			return 'bounce.out';
		case 'scaleIn':
			return 'back.out(1.7)';
		case 'rotateIn':
			return 'power2.out';
		default:
			return 'power2.out';
	}
}
