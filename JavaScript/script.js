// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute("href"));
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Scroll Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
});

document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});

// Show/Hide Back-to-Top Button
window.addEventListener("scroll", () => {
  const backToTopButton = document.querySelector(".back-to-top");
  if (backToTopButton) {
    if (window.scrollY > 500) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  }
});

// Scroll-Triggered Counter Animation
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");
  let hasAnimated = false;

  const animateCounters = () => {
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-count");
        const count = +counter.innerText.replace("+", "");
        const speed = 2000;

        const increment = target / speed;

        if (count < target) {
          counter.innerText = `${Math.ceil(count + increment)}+`;
          requestAnimationFrame(updateCount); // Use requestAnimationFrame for smoother animations
        } else {
          counter.innerText = `${target}+`;
        }
      };

      updateCount();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        animateCounters();
        hasAnimated = true;
      }
    });
  });

  const achievementSection = document.querySelector("#achievements");
  if (achievementSection) {
    observer.observe(achievementSection);
  }
});

// mail send

document
  .getElementById("contact-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("send_mail.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json(); // Parse JSON response

      const responseDiv = document.getElementById("form-response");
      responseDiv.classList.remove("success", "error"); // Clear previous classes
      responseDiv.textContent = result.message; // Set message

      // Determine success or error response
      if (result.status === "success") {
        responseDiv.classList.add("success"); // Add success class
      } else {
        responseDiv.classList.add("error"); // Add error class
      }

      // Show the message interactively
      responseDiv.classList.add("show"); // Add show class for visibility
      form.reset(); // Reset the form after successful submission

      // Hide the message after 5 seconds (optional)
      setTimeout(() => {
        responseDiv.classList.remove("show"); // Hide the message after delay
      }, 5000);
    } catch (error) {
      const responseDiv = document.getElementById("form-response");
      responseDiv.classList.add("error"); // Add error class
      responseDiv.textContent = "There was an error submitting the form.";
      responseDiv.classList.add("show"); // Show error message
    }
  });

document.getElementById("close-button").addEventListener("click", function () {
  // Show the popup message
  const popup = document.getElementById("popup");
  popup.style.display = "block";
});

// Function to handle the exit button click
document.getElementById("exit-button").addEventListener("click", function () {
  // Redirect to your desired URL
  window.location.href = "https://www.example.com"; // Change this to your desired URL
});
