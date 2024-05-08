class FeatureDisplay {
  constructor(containerSelector, options) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      return;
    }
    this.options = {
      animationType: "fd_moveIn",
      animationDuration: 500, // Consider this value for timing issues
      ...options,
    };
    this.allTargets = this.container.querySelectorAll(".feature-image-wrapper img, .feature-image-wrapper div");
    this.setupEventListeners();
    this.showElementForRadio("feature1");
  }

  hideAllTargets() {
    this.allTargets.forEach((element) => {
      element.classList.add("fd_hidden");
    });
  }

  showElementForRadio(radioId) {
    const elementSuffix = radioId.replace("feature", "");
    const imgToShow = document.getElementById(`image${elementSuffix}`);
    const divToShow = document.getElementById(`div${elementSuffix}`);
    this.hideAllTargets();
    setTimeout(() => { // Ensure all elements are hidden before showing new ones
      [imgToShow, divToShow].forEach(element => {
        if (element) {
          element.classList.remove("fd_hidden");
          element.classList.add(this.options.animationType); // Apply animation
        }
      });
    }, this.options.animationDuration); // Sync with CSS transition duration
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
