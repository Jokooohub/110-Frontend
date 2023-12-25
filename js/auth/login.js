import { backendurl, successNotification, errorNotification } from "../utils/utils.js";

const form_login = document.getElementById("form_login");

form_login.onsubmit = async (e) => {
    e.preventDefault();
    
  // disable button
  document.querySelector("#form_login button").disabled = true;

  //get values of form (input, text area,select) put it as form data
  const formData = new FormData(form_login);

  //fetch api user registered endpoint
  const response = await fetch(backendurl + "/api/login", {
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
    localStorage.setItem("user_id",json.user.id);
    
    form_login.reset();

    successNotification("Login Successfully.", 5);

    window.location.pathname = "/homepage.html"
  }
  // get response if 422 status code
   else if (response.status == 422) {
    const json = await response.json();
    
    errorNotification(json.message, 5);
  }

  //enable button
  document.querySelector("#form_login button").disabled = false;
};