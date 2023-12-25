const backendURL = 'http://hotel-backend.test';

// Add an event listener to the form
const addRoomForm = document.getElementById('add_room_form');

addRoomForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Disable Button
  document.querySelector("#add_room_form button[type='submit']").disabled = true;
  document.querySelector(
    "#add_room_form button[type='submit']"
  ).innerHTML = `<div class="spinner-border me-2" role="status"></div><span>Loading...</span>`;

  // Get Values of Form (input, textarea, select) set it as form-data
  const formData = new FormData(addRoomForm);

  // Fetch API Add Room Endpoint
  try {
    const response = await fetch(`${backendURL}/api/room`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (response.ok) {
      const json = await response.json();

      // Reset the form
      addRoomForm.reset();

      // Show success notification
      successNotification('Room added successfully.');

      // Additional logic or redirection if needed
    } else {
      const json = await response.json();

      // Show error notification
      errorNotification(json.message || 'An error occurred.');
    }
  } catch (error) {
    console.error('Error:', error);

    // Show error notification
    errorNotification('An unexpected error occurred.');
  }

  // Enable Button
  document.querySelector("#add_room_form button[type='submit']").disabled = false;
  document.querySelector("#add_room_form button[type='submit']").innerHTML = `Submit`;
});

// Function to show success notification
function successNotification(message) {
  const successAlert = document.querySelector('.alert-success');
  successAlert.textContent = message;
  successAlert.classList.remove('d-none');
}

// Function to show error notification
function errorNotification(message) {
  const errorAlert = document.querySelector('.alert-danger');
  errorAlert.textContent = message;
  errorAlert.classList.remove('d-none');
}
