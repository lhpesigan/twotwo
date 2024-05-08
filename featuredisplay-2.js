class FeatureDisplay {
  constructor(containerSelector, options) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      return;
    }
    this.options = {
      animationType: "moveIn",
      animationDuration: 500,
      ...options,
    };
    // Query selector that targets both images and divs
    this.allTargets = this.container.querySelectorAll(".feature-image-wrapper img, .feature-image-wrapper div");

    this.setupEventListeners();
    this.showElementForRadio("feature1");
  }

  hideAllTargets() {
    this.allTargets.forEach((element) => {
      element.style.opacity = 0;
      element.style.visibility = "hidden";
      element.style.display = "none";
    });
  }

  showElementForRadio(radioId) {
    const elementSuffix = radioId.replace("feature", "");
    const imgToShow = document.getElementById(`image${elementSuffix}`);
    const divToShow = document.getElementById(`div${elementSuffix}`);
    this.hideAllTargets();
    [imgToShow, divToShow].forEach(element => {
      if (element) {
        element.style.display = "block";
        setTimeout(() => {
          element.style.visibility = "visible";
          element.style.opacity = 1;
          console.log('Before adding class:', element.classList.toString());
          element.classList.add(this.options.animationType);
          console.log('After adding class:', element.classList.toString());
        }, 10);
      }
    });
  }

  setupEventListeners() {
    this.container.addEventListener("click", (event) => {
      const target = event.target.closest(".feature-radio, .feature-list-item");

      if (!target) {
        return;
      }

      const radioId = target.tagName === "LABEL" ? target.getAttribute("for") : target.id;

      if (radioId) {
        this.showElementForRadio(radioId);
      }
    });
  }
}

export default FeatureDisplay;
