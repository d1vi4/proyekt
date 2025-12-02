function showNotification(elementId, message) {
  const element = document.getElementById(elementId);
  const messageDiv = element.querySelector("div");
  
  if (message) {
    messageDiv.innerText = message;
  }

  element.classList.remove("scale-0");
  element.classList.add("scale-100");

  setTimeout(() => {
    closeNotification(elementId);
  }, 5000);
}

function closeNotification(elementId) {
  const element = document.getElementById(elementId);
  element.classList.remove("scale-100");
  element.classList.add("scale-0");
}

document.addEventListener("DOMContentLoaded", function () {
  let formElement = document.getElementById("auth-form");
  if (!formElement) return;

  const inputFields = {
    name: {
      id: "user-name",
      errorId: "name-error",
      validation: (value) => value.trim() !== "",
    },
    surname: {
      id: "user-surname",
      errorId: "surname-error",
      validation: (value) => value.trim() !== "",
    },
    email: {
      id: "user-email",
      errorId: "email-error",
      validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    },
    username: {
      id: "user-username",
      errorId: "username-error",
      validation: (value) => value.trim() !== "",
    },
    password: {
      id: "user-password",
      errorId: "password-error",
      validation: (value) => value.length >= 6,
    },
  };

  Object.values(inputFields).forEach((field) => {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.errorId);

    if (input && error) {
      input.addEventListener("input", function () {
        if (field.validation(this.value)) {
          this.classList.remove("input-error");
          this.classList.add("focus:border-indigo-500");
          error.classList.add("hidden");
        }
      });
    }
  });

  formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    let isValid = true;

    Object.values(inputFields).forEach((field) => {
      const input = document.getElementById(field.id);
      const error = document.getElementById(field.errorId);

      if (input && error) {
        if (!field.validation(input.value)) {
          input.classList.add("input-error");
          input.classList.remove("focus:border-indigo-500");
          error.classList.remove("hidden");
          isValid = false;
        } else {
          input.classList.remove("input-error");
          input.classList.add("focus:border-indigo-500");
          error.classList.add("hidden");
        }
      }
    });

    if (isValid) {
      const name = document.getElementById("user-name").value;
      const surname = document.getElementById("user-surname").value;
      const email = document.getElementById("user-email").value;
      const username = document.getElementById("user-username").value;
      const password = document.getElementById("user-password").value;

      const user = { name, surname, email, username, password };

      fetch("http://localhost:8081/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) =>
          response.json().then((data) => ({
            status: response.status,
            data,
          }))
        )
        .then((result) => {
          if (result.status >= 200 && result.status < 300) {
            showNotification("success-alert", "Registration successful! Redirecting...");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
          } else {
            showNotification("error-alert", result.data.message || "Registration failed"); 
          }
        })
        .catch((error) => {
          showNotification("error-alert", "Connection error occurred"); //githuba update ucun komment elxan cool man terefinden
        });
    }
  });
});