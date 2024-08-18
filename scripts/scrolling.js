document.addEventListener("DOMContentLoaded", function () {
    var controller = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        triggerElement: "#trigger1", duration: "100%",
        triggerHook: 0
    })
        .setPin("#media", { pushFollowers: false })
        .addIndicators({ name: "1 (duration: 300)" }) // add indicators (requires plugin)
        .addTo(controller);
})
