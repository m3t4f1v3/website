gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
    const horizontalSection = document.querySelector('#media');
    const sections = gsap.utils.toArray(".horizontal-item");

    // Log section count for debugging
    // console.log('Number of sections:', sections.length);

    // Create the horizontal scroll timeline
    const horizontalTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: horizontalSection,
            pin: true,
            scrub: 1,
            snap: {
                snapTo: 1 / (sections.length - 1),
                // snapTo: 'labelsDirectional', // snap to the closest label in the timeline
                duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
                ease: 'power1.inOut' // the ease of the snap animation ("power3" by default)
            },
            start: "top top",
            end: () => "+=" + (horizontalSection.scrollWidth - window.innerWidth),
            // markers: true
        }
    });

    const mediaBackgrounds = gsap.utils.toArray("#media-backgrounds img");
    animDuration = 1 / (2 * (sections.length - 1)) // magic but seems to work
    mediaBackgrounds.forEach((mediaBackground, i) => {
        horizontalTimeline.to(mediaBackground,
            {
                opacity: 1,    // Ending state
                duration: animDuration,
                ease: "power1.inOut",
            },
            (i - 1) * animDuration
        ).addLabel(mediaBackground)
    });

    horizontalTimeline.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        // opacity: 1,
    }, 0);

    const parallaxImages = gsap.utils.toArray(".parallax-image");
    // Parallax effect for images
    // document.querySelectorAll('.parallax-image').forEach((image, i) => {
    horizontalTimeline.to(parallaxImages, {
        xPercent: (i, target) => {
            const speed = 10 * (i + 1);
            // return `${speed}%`;
            return speed
        },
        yPercent: (i, target) => {
            const speed = 10 * (i + 1);
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


    const eva01 = document.querySelector("#eva01")
    const eva01Components = document.querySelector("#eva01-components")

    // const scrollHeight = eva01.scrollHeight;

    const evaTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: eva01,
            pin: true,
            scrub: 1,
            // duration: "200%",
            // start: "top top",
            start: "center center",
            // end: "center bottom",
            // end: () => "+=" + 2*(eva01.scrollHeight - window.innerHeight), // Ensure full content is scrolled
            // markers: { startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20 }
        }
    });

    evaTimeline
        .from("#eva01-head", { yPercent: 30, duration: 1 }, 0)
        .from("#eva01-left-arm-cutoff", { xPercent: 40, yPercent: 30, rotation: "30deg", duration: 1 }, 0)
        .from("#eva01-right-arm", { xPercent: 40, yPercent: 35, rotation: "-15deg", duration: 1 }, 0)
        .from("#eva01-shoulder-blade", { yPercent: -20, duration: 1 }, 0)
        .from("#eva01-torso", { yPercent: 40, duration: 1 }, 0)
    // .to("#eva01", {backgroundPositionY: "50%"})
});