
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

document.addEventListener('DOMContentLoaded', () => {
	const headingBlocks = document.querySelectorAll(
		'.wp-block-custom-blocks-dynamic-heading'
	);

	headingBlocks.forEach((block) => {
		const heading = block.querySelector('.dynamic-heading-item');
		if (!heading) return;

		const animationType = heading.dataset.animationType;
		const dynamicWords = JSON.parse(heading.dataset.dynamicText || '[]');

		const staticText = heading.querySelector('.static-text-inner');
		const dynamicText = heading.querySelector('.dynamic-text-inner');

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: heading,
				start: 'top 85%',
				toggleActions: 'play none none none',
			},
		});

		const animationProps = {
			'fade-in': { opacity: 0 },
			'fade-in-up': { opacity: 0, y: 50 },
			'fade-in-down': { opacity: 0, y: -50 },
			'slide-in-left': { opacity: 0, x: -100 },
			'slide-in-right': { opacity: 0, x: 100 },
			'scale-up': { opacity: 0, scale: 0.5 },
			'rotate-in': { opacity: 0, rotation: -90 },
			'bounce-in': { opacity: 0, scale: 0.3, ease: 'elastic.out(1, 0.5)' },
		};

		if (animationType in animationProps) {
			tl.from(heading, { ...animationProps[animationType], duration: 1, ease: 'power3.out' });
		} else if (animationType === 'slide-in-up' || animationType === 'slide-in-down') {
			gsap.set(heading.querySelectorAll('.static-text-wrapper, .dynamic-text-wrapper'), { overflow: 'hidden' });
			const targets = [staticText, dynamicText].filter(Boolean);
			if (targets.length > 0) {
				tl.from(targets, {
					yPercent: animationType === 'slide-in-up' ? 100 : -100,
					stagger: 0.1,
					duration: 1,
					ease: 'power3.out',
				});
			}
		} else {
			tl.from(heading, { opacity: 0, duration: 1, ease: 'power3.out' });
		}

		if (dynamicText && dynamicWords.length > 1) {
			let wordIndex = 0;
			const cycleWords = () => {
				wordIndex = (wordIndex + 1) % dynamicWords.length;
				gsap.to(dynamicText, {
					duration: 0.8,
					text: dynamicWords[wordIndex],
					ease: 'none',
				});
			};

			tl.add(gsap.delayedCall(2, () => {
				setInterval(cycleWords, 2500);
			}));
		}
	});
});


