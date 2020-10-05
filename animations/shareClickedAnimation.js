window.onload = function () {

    // your code 
    var shareButton = document.getElementById("share-button");
    var shareButtonIcon = document.getElementById("share-button-icon");
    var shareButtonCircle = document.getElementById("share-button-circle");
    var sharePanel = document.getElementById("share-panel");
    var sharePanelText = document.getElementById("share-panel-text");
    var shareButtonState = Boolean(false);
    var socialIcons = document.getElementsByClassName("icon");

    var panelTl = new TimelineMax();

    panelTl.from(sharePanel, {
            opacity: 0,
            duration: 0.5,
            y: 5,
            onReverseComplete: function () {
                sharePanel.style.visibility = "hidden";
            }
        }).from(sharePanelText, {
            opacity: 0,
            y: 35,
            duration: 0.8,
            delay: -0.5
        }).from(socialIcons, {
            opacity: 0,
            x: -5,
            stagger: 0.1,
            delay: -0.3
        })
        .pause();

    shareButton.onclick = function () {
        shareButtonState = !shareButtonState;
        var panelVisible = (shareButtonState) ? sharePanelReveal() : sharePanelHide();
        console.log(panelVisible);
    };

    function sharePanelReveal() {
        shareButtonCircle.style.fill = "hsl(214, 17%, 51%)";
        shareButtonIcon.style.fill = "hsl(210, 46%, 95%)";
        sharePanel.style.visibility = "visible";
        panelTl.play();
        return "[debug] share panel revealed";
    }

    function sharePanelHide() {
        shareButtonCircle.style.fill = "hsl(210, 46%, 95%)";
        shareButtonIcon.style.fill = "hsl(214, 17%, 51%)";
        panelTl.reverse();
        return "[debug] share panel hidden";
    }
};