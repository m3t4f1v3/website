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
            snap: 1 / (sections.length - 1), // might be broken
            start: "top top",
            end: () => "+=" + (horizontalSection.scrollWidth - window.innerWidth),
            // markers: { startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20 }
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
    // function gaussianDist(x, scale, average, stdev) {
    //     return scale * Math.exp(-((x - average) ** 2) / (2 * stdev ** 2))
    // }
    // let animDuration = 2 * (sections.length);

    // Set up media background opacity transitions
    // very much broken, cba to fix it though
    // 12 = 2*sections.length
    mediaBackgrounds.forEach((mediaBackground, i) => {
        horizontalTimeline.to(mediaBackground, {
            opacity: 1,
            duration: 1 / 12,
            ease: "power1.inOut",
        }, Math.max(0, i - 0.5) / 12)
    });


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
            end: "center bottom",
            // end: () => "+=" + 2*(eva01.scrollHeight - window.innerHeight), // Ensure full content is scrolled
            markers: { startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20 }
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