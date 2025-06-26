import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger,TextPlugin);

document.addEventListener('DOMContentLoaded', () => {
    const headingBlocks = document.querySelectorAll('.wp-block-custom-blocks-dynamic-heading');

    headingBlocks.forEach(block => {
        const headings = block.querySelectorAll('.dynamic-heading-item');

        headings.forEach(heading => {
            const staticText = heading.querySelector('.static-text-inner');
            const dynamicWrapper = heading.querySelector('.dynamic-text-wrapper');
            const dynamicText = heading.querySelector('.dynamic-text-inner');
            const animationType = heading.dataset.animationType;
            const dynamicWords = JSON.parse(heading.dataset.dynamicText || '[]');

            if (!staticText || !dynamicText || dynamicWords.length === 0) return;

            // Set initial hidden states for animations
            gsap.set(dynamicWrapper, { overflow: 'hidden' });
            gsap.set(heading, { opacity: 1 }); // Ensure parent is visible

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%', // When the top of the trigger hits 85% down from the top of the viewport
                    toggleActions: 'play none none none', // Play the animation once
                    markers: false, // Set to true for debugging
                },
            });

            // --- Entrance Animation ---
            let entranceVars = { duration: 1, ease: 'power3.out' };
            switch (animationType) {
                case 'fade-in':
                    entranceVars.opacity = 0;
                    break;
                case 'fade-in-up':
                    entranceVars.opacity = 0;
                    entranceVars.y = 50;
                    break;
                case 'fade-in-down':
                    entranceVars.opacity = 0;
                    entranceVars.y = -50;
                    break;
                case 'slide-in-left':
                    entranceVars.opacity = 0;
                    entranceVars.x = -100;
                    break;
                case 'slide-in-right':
                    entranceVars.opacity = 0;
                    entranceVars.x = 100;
                    break;
                 case 'slide-in-up':
                    gsap.set(heading.querySelector('.static-text-wrapper'), { overflow: 'hidden' });
                    gsap.set(heading.querySelector('.dynamic-text-wrapper'), { overflow: 'hidden' });
                    tl.from([staticText, dynamicText], { yPercent: 100, stagger: 0.1, duration: 0.8, ease: 'power3.out' });
                    break;
                 case 'slide-in-down':
                    gsap.set(heading.querySelector('.static-text-wrapper'), { overflow: 'hidden' });
                    gsap.set(heading.querySelector('.dynamic-text-wrapper'), { overflow: 'hidden' });
                    tl.from([staticText, dynamicText], { yPercent: -100, stagger: 0.1, duration: 0.8, ease: 'power3.out' });
                    break;
                case 'scale-up':
                    entranceVars.opacity = 0;
                    entranceVars.scale = 0.5;
                    break;
                case 'rotate-in':
                    entranceVars.opacity = 0;
                    entranceVars.rotation = -90;
                    break;
                case 'bounce-in':
                    entranceVars.opacity = 0;
                    entranceVars.scale = 0.3;
                    entranceVars.ease = 'elastic.out(1, 0.5)';
                    break;
                default:
                     entranceVars.opacity = 0; // Default to fade-in
            }
            
            // Apply entrance animation if not a slide-up/down (they have custom timelines)
            if (animationType !== 'slide-in-up' && animationType !== 'slide-in-down' && animationType !== 'none') {
                tl.from(heading, entranceVars);
            }

            // --- Dynamic Text Cycling ---
            if (dynamicWords.length > 1) {
                let wordIndex = 0;
                const cycleWords = () => {
                    const nextIndex = (wordIndex + 1) % dynamicWords.length;

                    gsap.timeline()
                        .to(dynamicText, { yPercent: -100, duration: 0.5, ease: 'power2.in' })
                        .set(dynamicText, { text: dynamicWords[nextIndex], yPercent: 100 })
                        .to(dynamicText, { yPercent: 0, duration: 0.5, ease: 'power2.out' });
                    
                    wordIndex = nextIndex;
                };

                // Add the loop to the main timeline
                tl.add(gsap.delayedCall(2, () => { // Initial delay before cycling starts
                    setInterval(cycleWords, 2000); // Cycle every 2 seconds
                }));
            }
        });
    });
});
