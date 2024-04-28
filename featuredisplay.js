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
  this.allImages = this.container.querySelectorAll(".feature-image-wrapper img");

  this.setupEventListeners();
  this.showImageForRadio("feature1");
}


  hideAllImages() {

    this.allImages.forEach((image) => {

      image.style.opacity = 0;
      image.style.visibility = "hidden";
      image.style.display = "none";

    });
}

  showImageForRadio(radioId) {

    const imageId = radioId.replace("feature", "image");
    const imageToShow = document.getElementById(imageId);
    this.hideAllImages();
    if (imageToShow) {
      imageToShow.style.display = "block";
      setTimeout(() => {
        imageToShow.style.visibility = "visible";
        imageToShow.style.opacity = 1;
        console.log('Before adding class:', imageToShow.classList.toString());
        imageToShow.classList.add(this.options.animationType);
        console.log('After adding class:', imageToShow.classList.toString());
      }, 10);
    }
  }

  setupEventListeners() {

  this.container.addEventListener("click", (event) => {
    const target = event.target.closest(".feature-radio, .feature-list-item");

    if (!target) {

      return;
    }

    const radioId = target.tagName === "LABEL" ? target.getAttribute("for") : target.id;


    if (radioId) {
      this.showImageForRadio(radioId);
    }
  });
}

}

export default FeatureDisplay;
