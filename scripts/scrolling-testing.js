gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable)

document.addEventListener("DOMContentLoaded", function () {

    const eva01 = document.querySelector("#eva01")


    // const evaTimeline = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: eva01,
    //         pin: true,
    //         scrub: 1,
    //         // snap: 1 / (sections.length - 1), // might be broken
    //         start: "top top",
    //         // end: () => "+=" + (horizontalSection.scrollWidth - window.innerWidth),
    //         markers: { startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20 }
    //     }
    // })

    Draggable.create(".eva01-component", {
        type: "x,y",
        onDragEnd: function () {
            console.log(`Element ID: ${this.target.id}, X: ${this.x}, Y: ${this.y}`);
        }
    });
    // evaTimeline
    // .to("#eva01-head", { yPercent: -40 }, 0)
    // .to("#eva01-left-arm-cutoff", { yPercent: -20 }, 0)
    // .to("#eva01-right-arm-cutoff", { yPercent: -40 }, 0)
    // .to("#eva01-right-arm", { yPercent: -40 }, 0)
    // .to("#eva01-shoulder-blade", { yPercent: -40 }, 0)
    // .to("#eva01-torso", { yPercent: -40 }, 0)
    // Make elements draggable
    const components = document.querySelectorAll('.eva01-component');
    components.forEach(component => {
        Draggable.create(component, {
            // onDragEnd: updatePositions
            bounds: { top: 100, left: 0, width: "100%", height: "100%" }
        });
    });

    // function updatePositions() {
    //     components.forEach(component => {
    //         component.style.left = `${component._gsTransform.x}px`;
    //         component.style.top = `${component._gsTransform.y}px`;
    //     });
    // }

    function saveCSS() {
        const elements = document.querySelectorAll('.eva01-component');
        let cssContent = '';

        elements.forEach(el => {
            const matrix = getComputedStyle(el).transform;
            const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ').map(Number);
            const x = matrixValues[4];
            const y = matrixValues[5];
            // const z = matrixValues[6] || 0; // Default to 0 if not available

            // Assuming you want to convert based on the parent element's dimensions
            // const parent = el.parentElement;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Convert px to % based on the parent's dimensions
            // const xPercent = (x / windowWidth) * 100;
            // const yPercent = (y / windowHeight) * 100;

            // Construct the CSS content with percentages
            cssContent += `#${el.id} { transform: translate(${x.toFixed(2)}px, ${y.toFixed(2)}px); }\n`;
        });

        console.log(cssContent)
        // const blob = new Blob([cssContent], { type: 'text/css' });
        // const link = document.createElement('a');
        // link.href = URL.createObjectURL(blob);
        // link.download = 'positions.css';
        // link.click();
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'P' || e.key === 'p') {
            saveCSS();
        }
    });

    // const scrollHeight = eva01.scrollHeight;
    // const viewportHeight = window.innerHeight;
    // const endScrollPosition = scrollHeight - viewportHeight;

    // const evaTimeline = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: eva01,
    //         pin: true,
    //         scrub: 1,
    //         start: "top top",
    //         end: () => "+=" + endScrollPosition, // Ensure full content is scrolled
    //         markers: { startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20 }
    //     }
    // });

    // evaTimeline
    //     .from("#eva01-head", { yPercent: 100, duration: 1 }, 0)
    //     .from("#eva01-left-arm-cutoff", { yPercent: 100, duration: 1 }, 0)
    //     .from("#eva01-right-arm", { yPercent: 300, duration: 1 }, 0)
    //     .from("#eva01-shoulder-blade", { yPercent: 200, duration: 1 }, 0)
    //     .from("#eva01-torso", { yPercent: 400, duration: 1 }, 0);

})