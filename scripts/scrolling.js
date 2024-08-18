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
        ease: 'none'
    });

    // Define the data array
    const data = [
        {
            "rotation": "210deg",
            "colors": ["#101214", "#394e38", "#778843", "#deeb57", "#3d5a8a"]
        },
        {
            "rotation": "0deg",
            "colors": ["#212835", "#4c4043", "#815e4b", "#e8d7ac", "#b89c7a"]
        },
        {
            "rotation": "180deg",
            "colors": ["#070505", "#43352d", "#b6683b", "#cfba97", "#f4ed50"]
        },
        {
            "rotation": "0deg",
            "colors": ["#2b242a", "#59697b", "#1b3b60", "#1c4065", "#23476b",]
        },
        {
            "rotation": "90deg",
            "colors": ["#3383d9", "#d0efed", "#70a59f", "#deae7c", "#3cd59f"]
        }
        ,
        {
            "rotation": "45deg",
            "colors": ["#33333c", "#3a3a43", "#45444d", "#2c2d35", "#545057"]
        }
    ];

    // Create a ScrollTrigger instance for background color changes
    ScrollTrigger.create({
        trigger: horizontalSection,
        start: "top top",
        end: () => "+=" + (horizontalSection.scrollWidth - window.innerWidth),
        scrub: true,
        snap: 1 / (sections.length - 1),
        onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.floor(progress * (sections.length - 1));
            const nextIndex = Math.min(index + 1, sections.length - 1);
            const currentData = data[index % data.length];
            const nextData = data[nextIndex % data.length];

            // Calculate the blend ratio
            const ratio = (progress * (sections.length - 1)) - index;

            // Interpolate between the current and next color sets
            const interpolatedRotation = gsap.utils.interpolate(currentData.rotation, nextData.rotation, ratio);
            const interpolatedColors = currentData.colors.map((color, i) => {
                return gsap.utils.interpolate(color, nextData.colors[i], ratio);
            });

            gsap.to(horizontalSection, {
                background: `linear-gradient(${interpolatedRotation}, ${interpolatedColors.join(', ')})`,
                duration: 0.1, // Small duration to ensure smooth transition
                ease: 'none'
            });
        }
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
                scrub: true,
                end: () => "+=" + (horizontalSection.scrollWidth - window.innerWidth)
            }
        });
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
            rotation: "-10deg",
            ease: 'none',
            scrollTrigger: {
                trigger: horizontalSection,
                start: "top bottom",
                scrub: true,
                end: () => "+=" + (horizontalSection.scrollWidth - window.innerWidth)
            }
        });
    });
});
