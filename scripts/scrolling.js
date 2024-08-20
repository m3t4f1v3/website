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
            // snap: 1 / (sections.length - 1), // might be broken
            start: "top top",
            end: () => "+=" + (horizontalSection.scrollWidth - window.innerWidth),
            markers: { startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20 }
        }
    });

    horizontalTimeline.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        // opacity: 1,
    }, 0);

    const mediaBackgrounds = gsap.utils.toArray("#media-backgrounds img");

    // Set up a timeline for the media background images
    // const mediaBackgroundTimeline = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: horizontalSection,
    //         // pin: true,
    //         scrub: 1,
    //         start: "top top",
    //         end: () => "+=" + (horizontalSection.scrollWidth - window.innerWidth),
    //         markers: true // Enable markers for debugging
    //     }
    // });

    // Add each image to the mediaBackgroundTimeline
    //https://www.desmos.com/calculator/tx1bxcmvz9
    function gaussianDist(x, scale, average, stdev) {
        return scale*Math.exp(-((x-average)**2)/(2*stdev**2))
    }
    horizontalTimeline.fromTo(mediaBackgrounds,
        { opacity: 0 },
        {
            opacity: (i, target) => {
                return gaussianDist()
                // i / 6
                // return i
            },
            // duration: 1,
            ease: "none",
        }, 0);

    const parallaxImages = gsap.utils.toArray(".parallax-image");
    // Parallax effect for images
    // document.querySelectorAll('.parallax-image').forEach((image, i) => {
    horizontalTimeline.to(parallaxImages, {
        xPercent: (i, target) => {
            const speed = 20 * (i + 1);
            // return `${speed}%`;
            return speed
        },
        yPercent: (i, target) => {
            const speed = 20 * (i + 1);
            // return `${speed}%`;
            return speed
        },
        rotation: "-15deg",
        ease: 'none',
        // scrollTrigger: {
        //     trigger: horizontalSection,
        //     start: "top bottom",
        //     scrub: 1,
        //     end: () => "+=" + (horizontalSection.scrollWidth - window.innerWidth),
        //     markers
        // }
    }, 0);
    // });

    const parallaxPreviews = gsap.utils.toArray(".parallax-preview");
    // document.querySelectorAll('.parallax-preview').forEach((image, i) => {
    horizontalTimeline.to(parallaxPreviews, {
        xPercent: (i, target) => {
            const speed = -30 * (i + 1);
            // return `${speed}%`;
            return speed
        },
        yPercent: (i, target) => {
            const speed = -30 * (i + 1);
            // return `${speed}%`;
            return speed
        },
        rotation: "10deg",
        ease: 'none',
        // scrollTrigger: {
        //     trigger: horizontalSection,
        //     start: "top bottom",
        //     scrub: 1,
        //     end: () => "+=" + (horizontalSection.scrollWidth - window.innerWidth),
        // }
    }, 0);
    // });

});