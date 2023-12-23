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
    showError("Lebron submissions are not good enough!");
    return false;
  }
  return true;
}

function showError(message) {
  var status = document.getElementById("formStatus");
  status.innerHTML = message;
  status.className = "error";
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

  try {
    const response = await fetch(event.target.action, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      status.innerHTML = "Thank you for your submission!";
      status.className = "success"; // Add success class
      event.target.reset();
      grecaptcha.reset();
    } else {
      const responseData = await response.json();
      if (responseData.errors) {
        status.innerHTML = responseData.errors
          .map((error) => error.message)
          .join(", ");
      } else {
        status.innerHTML = "Oops! There was a problem submitting your form";
      }
      status.className = "error"; // Add error class
    }
  } catch (error) {
    status.innerHTML = "Oops! There was a problem submitting your form";
    status.className = "error"; // Add error class
  }

  return response;
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

var modal = document.getElementById("myModal");

var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

var span = document.getElementsByClassName("close")[0];

document.querySelectorAll(".modalImage").forEach(function (img) {
  img.addEventListener("click", function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt; //
  });
});

function closeModal() {
  modal.style.display = "none";
}

span.addEventListener("click", closeModal);
span.addEventListener("touchstart", closeModal);

modalImg.addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    closeModal();
  }
});

window.addEventListener("touchstart", function (event) {
  if (event.target == modal) {
    closeModal();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Handle autoplay and user interactions for videos in '.victims .imgBx'
  const videoContainers = document.querySelectorAll(".victims .imgBx");

  videoContainers.forEach(function (container) {
    var video = container.querySelector("video");
    var thumbnail = container.querySelector(".video-thumbnail");
    var playButton = container.querySelector(".play-button");

    function removeThumbnailAndPlay() {
      if (thumbnail) {
        thumbnail.style.display = "none";
      }
      if (playButton) {
        playButton.style.display = "none";
      }
      video.play();
    }

    if (thumbnail) {
      thumbnail.addEventListener("click", removeThumbnailAndPlay);
    }
    if (playButton) {
      playButton.addEventListener("click", removeThumbnailAndPlay);
    }

    video
      .play()
      .then(() => {
        removeThumbnailAndPlay(); // Autoplay started, hide thumbnail and play button
      })
      .catch((error) => {
        console.log("Autoplay was prevented. Click to play."); // Autoplay prevented
      });
  });
});
