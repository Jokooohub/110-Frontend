import{
  backendurl,
  successNotification,
} from "../utils/utils.js";

// Logout Btn
const btn_logout = document.getElementById("btn_logout");
btn_logout.onclick = async () => {
  // Access Logout API Endpoint
  const response = await fetch(backendurl + "/api/logout", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  // Get response if 200-299 status code
  if (response.ok) {
    // Clear Tokens
    localStorage.clear();

    //successNotification("Logout Successful.");
    
    // Redirect Page
    window.location.pathname = "/index.html";
  }
  // Get response if 400 or 500 status code
  else {
    const json = await response.json();

    errorNotification(json.message, 10);
  }
};