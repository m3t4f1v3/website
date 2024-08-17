document.getElementById("smiley-toggle").addEventListener("click", function () {
    document.getElementById("right-sidebar").toggleAttribute("shown")
    // this.toggleAttribute("spinning")
    smiley = document.getElementById("smiley")
    clip = document.getElementById("logo-clipping")
    if (smiley.hasAttribute("sidebar-open")) {

        smiley.setAttribute("dropping", "")
        setTimeout(() => {
            clip.setAttribute("clipping", "")
        }, 150)

        setTimeout(() => {
            // Change the image after the spin completes
            smiley.src = "images/logos/edsmiley.png";

            // smiley.style.opacity = "1"; // Fade the new image in
            // smiley.classList.remove("spinning"); // Remove the spinning class

        }, 500); // Adjust the timeout duration to match the transition time
    } else {
        clip.removeAttribute("clipping")
        smiley.removeAttribute("dropping")
        setTimeout(() => {
            // Change the image after the spin completes
            smiley.src = "images/logos/edsideeye.png";
            // smiley.style.opacity = "1"; // Fade the new image in
            // smiley.classList.remove("spinning"); // Remove the spinning class
        }, 300); // Adjust the timeout duration to match the transition time
    }

    smiley.toggleAttribute("sidebar-open")
})

function getRandomCharInRange(min, max) {
    return String.fromCharCode(Math.floor(Math.random() * (max - min + 1)) + min);
}

function scrambleText(text, start) {
    const textToScramble = text.slice(start)
    return text.slice(0, start) + Array.from(textToScramble).map(char => {
        const charCode = char.charCodeAt(0);

        // Japanese characters (Hiragana and Katakana)
        if (charCode >= 12353 && charCode <= 12538) {
            return getRandomCharInRange(12353, 12438); // Random Hiragana and Katakana
        }

        // Chinese characters
        if (charCode >= 19968 && charCode <= 40959) {
            return getRandomCharInRange(19968, 40959); // Random Chinese characters
        }

        // Russian characters
        if (charCode >= 1025 && charCode <= 1103) {
            return getRandomCharInRange(1025, 1103); // Random Cyrillic characters
        }

        // Uppercase English characters
        if (charCode >= 65 && charCode <= 90) {
            return getRandomCharInRange(65, 90);
        }

        // Lowercase English characters
        if (charCode >= 97 && charCode <= 122) {
            return getRandomCharInRange(97, 122);
        }

        // Roman numerals
        if (8544 <= charCode && charCode <= 8584) {
            return getRandomCharInRange(8544, 8584)
        }

        return char; // Preserve characters not in these ranges
    }).join('');
}

// scrambling
Array.from(document.getElementsByClassName("scrambled-text-multilingual")).forEach(element => {
    const originalText = element.innerText;
    element.innerText = scrambleText(originalText, 0)
    delay = 50 + 50* Math.random()
    descrablingState = 0 // scrambled, descrambling, descrambled
    // descramblingEnded = false
    var timeout = 0
    function descramble(start) {
        // console.log(start)
        const scrambledText = scrambleText(originalText, start);
        element.innerText = scrambledText;
        if (start == originalText.length) {
            descrablingState = 2 // descrambled
        } else {
            timeout = setTimeout(() => descramble(start + 1, delay), delay);
        }
    }
    element.addEventListener("mouseover", function () {
        if (descrablingState == 0) {
            descramble(0)
            descrablingState = 1
            // descramblingStarted = true
        }
    });
    element.addEventListener("click", function () {
        // console.log("skipped ")
        clearTimeout(timeout)
        descrablingState = 2
        element.innerText = originalText;
    })
});

preview = document.getElementById("preview")

Array.from(document.getElementsByClassName("media-grid-item")).forEach(element => {
    element.addEventListener("mouseover", function () {
        title = element.getAttribute("data-title")
        if (!preview.src.includes(title)) preview.src = `images/posters/gifs/${title}.gif`
    })
})