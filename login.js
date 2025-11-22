function showNotification(elementId, message) {
  const element = document.getElementById(elementId);
  if (message) {
    element.querySelector("div").innerText = message;
  }
  element.classList.remove("scale-0");
  element.classList.add("scale-100");

  setTimeout(() => {
    closeNotification(elementId); //githuba update ucun komment elxan cool man terefinden
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

  let usernameField = document.getElementById("username-field");
  let passwordField = document.getElementById("password-field");
  let usernameError = document.getElementById("username-error");
  let passwordError = document.getElementById("password-error");

  formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    let isValid = true;

    if (!usernameField.value.trim()) {
      usernameField.classList.add("border-red-500");
      usernameError.classList.remove("hidden");
      isValid = false;
    } else {
      usernameField.classList.remove("border-red-500");
      usernameError.classList.add("hidden");
    }

    if (!passwordField.value) {
      passwordField.classList.add("border-red-500");
      passwordError.classList.remove("hidden");
      isValid = false;
    } else {
      passwordField.classList.remove("border-red-500");
      passwordError.classList.add("hidden");
    }

    if (isValid) {
      const username = usernameField.value.trim();
      const password = passwordField.value;

      fetch("http://195.26.245.5:9505/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((response) =>
          response.json().then((data) => ({
            status: response.status,
            data,
          }))
        )
        .then((result) => {
          if (result.status >= 200 && result.status < 300) {
            const token = result.data.body.token;

            fetch("http://195.26.245.5:9505/api/clients/get-details", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
              .then((detailsResponse) => {
                return detailsResponse.json().then((detailsData) => ({
                  status: detailsResponse.status,
                  detailsData,
                }));
              })
              .then((detailsResult) => {
                if (detailsResult.status >= 200 && detailsResult.status < 300) {
                  localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(detailsResult.detailsData)
                  );

                  localStorage.setItem("authToken", token);

                  showNotification(
                    "success-alert",
                    "Login successful! Redirecting..."
                  );
                  setTimeout(() => {
                    window.location.href = "index.html";
                  }, 3000);
                } else {
                  const errorMsg =
                    detailsResult.detailsData.message ||
                    "Failed to retrieve user details.";
                  showNotification("error-alert", errorMsg);
                }
              })
              .catch(() => {
                showNotification(
                  "error-alert",
                  "Failed to retrieve user details."
                );
              });
          } else {
            const errorMsg =
              result.data.message || "İstifadəçi adı və ya şifrə yanlışdır.";
            showNotification("error-alert", errorMsg);
          }
        })
        .catch(() => {
          showNotification(
            "error-alert",
            "An error occurred. Please try again."
          );
        });
    }
  });

  usernameField.addEventListener("input", function () {
    if (this.value.trim()) {
      this.classList.remove("border-red-500");
      usernameError.classList.add("hidden");
    }
  });

  passwordField.addEventListener("input", function () {
    if (this.value) {
      this.classList.remove("border-red-500");
      passwordError.classList.add("hidden");
    }
  });
});