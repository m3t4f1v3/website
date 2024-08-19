gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
    const horizontalSection = document.querySelector('.horizontal-section');
    const sections = gsap.utils.toArray(".horizontal-item");

    // Log section count for debugging
    console.log('Number of sections:', sections.length);

    // Create the horizontal scroll timeline
    const horizontalTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: horizontalSection,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            start: "top top",
            end: () => "+=" + (horizontalSection.scrollWidth - window.innerWidth)
        }
    });

    horizontalTimeline.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        // opacity: 1,
    });
});

// Parallax effect for images
document.querySelectorAll('.parallax-image').forEach((image, i) => {

    gsap.to(image, {
        x: (i, target) => {
            const speed = 130 * (i + 1);
            return `${speed}%`;
        },
        y: (i, target) => {
            const speed = 130 * (i + 1);
            return `${speed}%`;
        },
        rotation: "-15deg",
        ease: 'none',
        scrollTrigger: {
            trigger: horizontalSection,
            start: "top bottom",
            scrub: 1,
            end: () => "+=" + (horizontalSection.scrollWidth - window.innerWidth)
        }
    });

    document.querySelectorAll('.parallax-preview').forEach((image, i) => {
        gsap.to(image, {
            x: (i, target) => {
                const speed = -120 * (i + 1);
                return `${speed}%`;
            },
            y: (i, target) => {
                const speed = -120 * (i + 1);
                return `${speed}%`;
            },
            rotation: "10deg",
            ease: 'none',
            scrollTrigger: {
                trigger: horizontalSection,
                start: "top bottom",
                scrub: 1,
                end: () => "+=" + (horizontalSection.scrollWidth - window.innerWidth)
            }
        });
    });
});
