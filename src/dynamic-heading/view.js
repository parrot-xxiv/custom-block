import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin); 

document.addEventListener('DOMContentLoaded', () => {
    // The selector is now for the block wrapper, not individual items
    const headingBlocks = document.querySelectorAll('.wp-block-custom-blocks-dynamic-heading');

    headingBlocks.forEach(block => {
        // Find the single heading item within the block
        const heading = block.querySelector('.dynamic-heading-item');
        if (!heading) return;

        const animationType = heading.dataset.animationType;
        const dynamicWords = JSON.parse(heading.dataset.dynamicText || '[]');
        
        // Elements for dynamic headings
        const staticText = heading.querySelector('.static-text-inner');
        const dynamicText = heading.querySelector('.dynamic-text-inner');
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heading,
                start: 'top 85%',
                toggleActions: 'play none none none',
                markers: false, 
            },
        });

        // --- Entrance Animation ---
        let entranceVars = { duration: 1, ease: 'power3.out' };
        let targets = heading; // Default target is the whole heading

        // Special handling for slide-up/down to animate inner parts
        if (animationType === 'slide-in-up' && staticText && dynamicText) {
             gsap.set(heading.querySelectorAll('.static-text-wrapper, .dynamic-text-wrapper'), { overflow: 'hidden' });
             targets = [staticText, dynamicText];
             entranceVars.yPercent = 100;
             entranceVars.stagger = 0.1;
        } else if (animationType === 'slide-in-down' && staticText && dynamicText) {
            gsap.set(heading.querySelectorAll('.static-text-wrapper, .dynamic-text-wrapper'), { overflow: 'hidden' });
            targets = [staticText, dynamicText];
            entranceVars.yPercent = -100;
            entranceVars.stagger = 0.1;
        } else {
             // Standard animations target the whole heading element
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
                case 'none':
                    // Do nothing for none
                    break;
                default:
                     entranceVars.opacity = 0;
            }
        }
        
        if (animationType !== 'none') {
             tl.from(targets, entranceVars);
        }

        // --- Dynamic Text Cycling ---
        // This will only run if there is a dynamicText element and more than one word.
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

            // Add the loop to the main timeline after the entrance animation completes
            tl.add(gsap.delayedCall(2, () => {
                setInterval(cycleWords, 2500);
            }));
        }
    });
});

