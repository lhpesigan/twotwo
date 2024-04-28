class FeatureDisplay {
  constructor(containerSelector, options) {
  this.container = document.querySelector(containerSelector);
  if (!this.container) {
    console.error('Container not found:', containerSelector);
    return;
  }
  this.options = {
    animationType: "moveIn",
    animationDuration: 500,
    ...options,
  };
  this.allImages = this.container.querySelectorAll(".feature-image-wrapper img");
  console.log('All images found:', this.allImages.length, this.allImages);
  this.setupEventListeners();
  this.showImageForRadio("feature1");
}


  hideAllImages() {
    console.log('Hiding all images');
    this.allImages.forEach((image) => {
      console.log(`Processing image: ${image.src}`);
      image.style.opacity = 0;
      image.style.visibility = "hidden";
      image.style.display = "none";
      console.log(`Styles after applying: display=${image.style.display}, visibility=${image.style.visibility}, opacity=${image.style.opacity}`);
    });
}

showImageForRadio(radioId) {
  const imageId = radioId.replace("feature", "image");
  const imageToShow = document.getElementById(imageId);
  this.hideAllImages();  // Ensure all other images are hidden before showing the new one
  if (imageToShow) {
    // Set display before visibility to prepare for animation
    imageToShow.style.display = "block";
    // Use a small timeout to ensure display change has taken effect before applying animation
    setTimeout(() => {
      imageToShow.style.visibility = "visible";
      imageToShow.style.opacity = 1;
      imageToShow.classList.add(this.options.animationType); // Apply the animation class as specified in the options
    }, 10);
  }
}


  setupEventListeners() {
  console.log('Setting up event listeners');
  this.container.addEventListener("click", (event) => {
    const target = event.target.closest(".feature-radio, .feature-list-item");
    console.log('Clicked inside container', target);
    if (!target) {
      console.log('No valid target found');
      return;
    }

    const radioId = target.tagName === "LABEL" ? target.getAttribute("for") : target.id;
    console.log('Derived radioId:', radioId);

    if (radioId) {
      this.showImageForRadio(radioId);
    }
  });
}

}

export default FeatureDisplay;
