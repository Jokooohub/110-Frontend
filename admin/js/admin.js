import { backendurl, successNotification, errorNotification } from "../../js/utils/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const admin_login = document.getElementById("admin_login");

  if (admin_login) {
    admin_login.onsubmit = async (e) => {
      e.preventDefault();

      // disable button
      document.querySelector("#admin_login button").disabled = true;

      //get values of form (input, text area,select) put it as form data
      const formData = new FormData(admin_login);

      //fetch api user registered endpoint
      const response = await fetch(backendurl + "/api/adminlogin", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      //get response if 200-299 status code
      if (response.ok) {
        const json = await response.json();
        console.log(json);

        localStorage.setItem("token", json.token);

        admin_login.reset();

        successNotification("Login Successfully.", 5);

        window.location.pathname = "admin/dashboard.html";
      }
      // get response if 422 status code
      else if (response.status == 422) {
        const json = await response.json();

        errorNotification(json.message, 5);
      }

      //enable button
      document.querySelector("#admin_login button").disabled = false;
    };
  } else {
    console.error("Element with ID 'admin_login' not found.");
  }
});
