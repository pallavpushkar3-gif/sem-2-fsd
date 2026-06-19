document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Stop the page from refreshing

    var isValid = true;

    // Get field values
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();

    // Check name
    if (name === "") {
      document.getElementById("name").classList.add("invalid");
      document.getElementById("name-error").classList.add("show");
      isValid = false;
    } else {
      document.getElementById("name").classList.remove("invalid");
      document.getElementById("name-error").classList.remove("show");
    }

    // Check email (must contain @ and .)
    var emailOk = email.includes("@") && email.includes(".");
    if (!emailOk) {
      document.getElementById("email").classList.add("invalid");
      document.getElementById("email-error").classList.add("show");
      isValid = false;
    } else {
      document.getElementById("email").classList.remove("invalid");
      document.getElementById("email-error").classList.remove("show");
    }

    // Check message length
    if (message.length < 10) {
      document.getElementById("message").classList.add("invalid");
      document.getElementById("message-error").classList.add("show");
      isValid = false;
    } else {
      document.getElementById("message").classList.remove("invalid");
      document.getElementById("message-error").classList.remove("show");
    }

    // If all checks passed, show success
    if (isValid) {
      document.getElementById("success-msg").style.display = "block";
      document.getElementById("contact-form").reset();
    }
  });
