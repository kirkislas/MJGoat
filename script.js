window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

function toggleMenu() {
  const menuToggle = document.querySelector(".menuToggle");
  const navigation = document.querySelector(".navigation");
  menuToggle.classList.toggle("active");
  navigation.classList.toggle("active");
}

function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function validateForm() {
  var nameElement = document.forms["contactForm"]["name"];
  var emailElement = document.forms["contactForm"]["email"];
  var messageElement = document.forms["contactForm"]["message"];

  var name = nameElement ? nameElement.value : "";
  var email = emailElement ? emailElement.value : "";
  var message = messageElement ? messageElement.value : "";

  if (!name || !email || !message) {
    showError("Please fill out all required fields");
    return false;
  }

  if (!validateEmail(email)) {
    showError("Please enter a valid email address");
    return false;
  }

  var prohibitedWords = ["Lebron", "James"];

  function containsProhibitedWord(fieldValue) {
    return prohibitedWords.some((prohibitedWord) =>
      fieldValue.toLowerCase().includes(prohibitedWord.toLowerCase())
    );
  }
  if ([name, email, message].some(containsProhibitedWord)) {
    showError("Lebron submissions are prohibited");
    return false;
  }
  return true;
}

function showError(message) {
  var status = document.getElementById("formStatus");
  status.innerHTML = message;
}

function onSubmit(event) {
  event.preventDefault();

  var recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    alert("Please complete the reCAPTCHA challenge.");
    return;
  }

  if (validateForm()) {
    handleSubmit(event);
  }
}

async function handleSubmit(event) {
  var status = document.getElementById("formStatus");
  var data = new FormData(event.target);

  fetch(event.target.action, {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        event.target.reset();
      } else {
        response
          .json()
          .then((data) => {
            if (data.errors) {
              status.innerHTML = data.errors
                .map((error) => error.message)
                .join(", ");
            } else {
              status.innerHTML =
                "Oops! There was a problem submitting your form";
            }
          })
          .catch(() => {
            status.innerHTML = "Oops! There was a problem submitting your form";
          });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
      alert("Please complete the reCAPTCHA challenge.");
      return;
    }
    if (validateForm()) {
      handleSubmit(event);
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll("video");

  videos.forEach(function (video) {
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    video.setAttribute("loop", "");

    video
      .play()
      .then(() => {
        console.log("Autoplay started!");
      })
      .catch((error) => {
        console.error("Error trying to autoplay video: ", error);
      });
    video.addEventListener("click", function () {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  });
});

// Get all images with the class 'modalImage'
var images = document.getElementsByClassName("modalImage");

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - the image tag for the popup
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

// Loop through all images and bind onclick event
for (var i = 0; i < images.length; i++) {
  var img = images[i];
  img.onclick = function (evt) {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt; // You can set the 'alt' attribute on your images if you want to use it as a caption
  };
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};