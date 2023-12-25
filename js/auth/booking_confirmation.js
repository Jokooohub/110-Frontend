import { backendurl, successNotification, errorNotification } from "../utils/utils.js";

const bookingForm = document.getElementById("booking_form");

bookingForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = bookingForm.querySelector("button[type='submit']");
  submitButton.disabled = true;

  try {
    const user_id = localStorage.getItem("user_id");
    // Get the room_id value from your application (replace with actual logic)
    const room_id = parseInt(3, 10);

    // Check if room_id is a valid integer
    if (!Number.isInteger(room_id)) {
      throw new Error('Room ID should be an integer.');
    }

    const formData = new FormData(bookingForm);
    formData.append("user_id", user_id);
    formData.append("room_id", room_id);

    const response = await fetch(`${backendurl}/api/booking`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (response.ok) {
      bookingForm.reset();
      successNotification("Booking Successful.", 5);
    } else {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorNotification(errorData.message, 5);
      } else {
        errorNotification("Failed to process the booking.", 5);
      }
    }
  } catch (error) {
    errorNotification(error.message || "An error occurred. Please try again later.", 5);
    console.error("Error during form submission:", error);
  } finally {
    submitButton.disabled = false;
  }
});
