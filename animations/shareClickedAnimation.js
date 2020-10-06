window.onload = function () {
  // --- VARIABLES ---

  //-> Elements
  var shareButton = document.getElementById("share-button"); //Whole button
  var shareButtonIcon = document.getElementById("share-button-icon"); //Button arrow icon svg
  var shareButtonCircle = document.getElementById("share-button-circle"); //Button background circle svg
  var sharePanel = document.getElementById("share-panel"); //Whole Share Panel
  var sharePanelText = document.getElementById("share-panel-text"); // "Share" panel text
  var socialIcons = document.getElementsByClassName("icon"); // Share panel social icons

  //-> State variables
  var shareButtonState = Boolean(false); // Variable to check if the button is clicked or not
  var shareButtonHoverEffectState = Boolean(true); // Variable to check wheter or not we enable the hover effect or not

  /*
  Note: If we don't use a variable for the hover effect, even when the share pannel is active, the hover will be enable.
          and will mess the colors of the button everytime the mouse pass over it
  */

  //------------------

  // --- PANEL ANIMATION CODE WITH GSAP ---

  //1- I create the timeline that will contain all the animations in order
  var panelTl = new TimelineMax();

  //2- ANIMATIONS DEFINITIONS (all the animations are ran one by one)
  panelTl
    //We start by animating the global share panel, the from method will be the starter states of the element, the finish states are the one defined in the stylesheet style.scss
    .from(sharePanel, {
      opacity: 0,
      duration: 0.5,
      y: 5,
      ease: Power3.easeOut,

      onReverseComplete: function () {
        /* This method is used to prevent the panel to not be visible for the eye, but be clicckable and pointed. 
        It makes the code easier because for the hiding animation we can only reverse the whole timeline without creating another one to hide the panel*/
        sharePanel.style.visibility = "hidden";
      },
    })

    //After that we animate the share text and the social icons.
    //As you can see, the delays are negative, so all the animation occur at the same time so it's nicer to look and faster to interact with the panel
    .from(sharePanelText, {
      opacity: 0,
      y: 35,
      duration: 0.5,
      delay: -0.5,
    })
    .from(socialIcons, {
      opacity: 0,
      x: -5,
      stagger: 0.1,
      delay: -0.3,
    })

    //I pause the animation directly so it doesn't start directly but only when the user click the share button
    .pause();

  //3 - EVENTS HANDLERS

  // --- REVEAL AND HIDING FUNCTION ---

  /*
    Note: To have a more readable code, I made those two functions, that return a debug message for the panel state.
    For each function, we change the state of the btton to say if it is clicked or not, we change the colors of the button, and set the visibility of the panel.

    Also, we change the disable the hover effect while the button is activated. Because we don't want it at that moment, only when the button is not activated.
  */
  function sharePanelReveal() {
    shareButtonHoverEffectState = !shareButtonHoverEffectState;
    shareButtonCircle.style.fill = "hsl(214, 17%, 51%)";
    shareButtonIcon.style.fill = "hsl(210, 46%, 95%)";
    sharePanel.style.visibility = "visible";
    panelTl.play();
    return "[debug] Share panel: revealed";
  }

  function sharePanelHide() {
    shareButtonHoverEffectState = true;
    shareButtonCircle.style.fill = "hsl(210, 46%, 95%)";
    shareButtonIcon.style.fill = "hsl(214, 17%, 51%)";
    panelTl.reverse();
    return "[debug] Share panel: hidden";
  }
  //------------------------------------

  //-> Button clicked ---
  shareButton.onclick = function () {
    shareButtonState = !shareButtonState; // On each click we toggle the state of shareButtonState (this variable is initialized at false, so the first click pass it to true)
    var panelVisible = shareButtonState ? sharePanelReveal() : sharePanelHide(); // Depending on the state of the button (clicked or not) we either reveal or hide the pannel.

    //Console log displaying the state of the pannel for debugging
    console.log(panelVisible);
  };

  //-> Button Hovered ---
  shareButton.onmouseenter = function () {
    if (shareButtonHoverEffectState) {
      shareButtonCircle.style.fill = "hsl(214, 17%, 51%)";
      shareButtonIcon.style.fill = "hsl(210, 46%, 95%)";
    }
  };

  shareButton.onmouseleave = function () {
    if (shareButtonHoverEffectState) {
      shareButtonCircle.style.fill = "hsl(210, 46%, 95%)";
      shareButtonIcon.style.fill = "hsl(214, 17%, 51%)";
    }
  };

  /* 
    Note: For the hover effect, at each entering or leaving event, we check the state of the hover Effect, if it is enabled, then the animation can occur 
  */
};
