const imagePicker = document.getElementById("imagePicker");
const postFileInput = document.querySelector("div.post-file-input input");
const imagePreview = document.querySelector("img.image-preview");
const imagePreviewContainer = document.querySelector("div.image-container");
imagePreviewContainer.style.display = "none";
console.log(imagePreviewContainer);
let imageSrc = null;
imagePicker.onclick = () => {
  console.log("cliked");
  postFileInput.click();
};
postFileInput.onchange = function (e) {
  imageSrc = null;
  const file = e.target.files[0];
  const fileReader = new FileReader();
  fileReader.onload = () => {
    imageSrc = fileReader.result;
    imagePreview.setAttribute("src", imageSrc);
    imagePreviewContainer.style.display = imageSrc ? "block" : "none";
  };
  fileReader.readAsDataURL(file);
};
