import Terminal from "./Terminal";
import ImageModal from "./ImageModal";
import data from '../../data'
const terminal = new Terminal();
const emailForm = document.getElementById("email-form");
const sendBtn = document.getElementById("send-btn");
let imageModal;

const subitEmail = (e) => {
  e.preventDefault();
  sendBtn.classList.add("is-loading");
  const data = new URLSearchParams();
  for (const pair of new FormData(emailForm)) {
    data.append(pair[0], pair[1]);
  }
  fetch("/contact", {
    method: "POST",
    body: data
  }).then(response => {
    sendBtn.classList.remove("is-loading");
    emailForm.reset();
  });
}

const showModal = (e) => {
  const index = e.target.dataset.index;
  const images = data.projects[index].images;

  if (!images.length > 0) return;

  if (! imageModal) {
    imageModal = new ImageModal(document.getElementsByTagName("body")[0], images)
  } else {
     imageModal.build(document.getElementsByTagName("body")[0], images)
  }
   imageModal.show();
}

terminal.typeWriter(document.getElementById("demo"), "> Patrik Nilsson");

emailForm.addEventListener("submit", subitEmail);

const projectImgs = document.querySelectorAll('[data-project-img]');
projectImgs.forEach(projectImg => projectImg.addEventListener("click", showModal))

