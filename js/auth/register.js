import { backendurl, successNotification, errorNotification } from "../utils/utils.js";
// Form Register


const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
    e.preventDefault();
    // console.log('hakdog');
    
  // disable button
  document.querySelector("#form_register button").disabled = true;

  //get values of form (input, text area,select) put it as form data
  const formData = new FormData(form_register);

  //fetch api user registered endpoint
  const response = await fetch(backendurl + "/api/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    //get response if 200-299 status code
  if (response.ok) {
    form_register.reset();

    successNotification("Registered Successfully.", 5);
  }
  // get response if 422 status code
   else if (response.status == 422) {
    const json = await response.json();
    
    errorNotification(json.message, 5);
  }

  //enable button
  document.querySelector("#form_register button").disabled = false;
};