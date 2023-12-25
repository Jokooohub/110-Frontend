// Set the backend URL
const backendUrl = 'http://hotel-backend.test';

// Function to show error notifications
function errorNotification(message, durationInSeconds) {
    const errorAlert = document.querySelector('.alert-danger');
    errorAlert.textContent = message;
    errorAlert.classList.remove('d-none');

    setTimeout(() => {
        errorAlert.classList.add('d-none');
    }, durationInSeconds * 1000);
}

// Function to fetch and update user data
async function fetchAndPopulateUsers() {
    try {
        // Fetch data from the API endpoint
        const response = await fetch(`${backendUrl}/api/user`);
        
        // Check if the response is in JSON format
        if (!response.headers.get('content-type')?.includes('application/json')) {
            throw new Error('Invalid response format');
        }

        const data = await response.json();

        if (response.ok) {
            // If the response is successful, update the user details
            populateUserDetails(data);
        } else {
            // Log the response text in case of an error
            console.error('Error in response:', await response.text());

            // If there's an error in the response, show an error message
            errorNotification("Failed to fetch user data.", 5);
        }
    } catch (error) {
        // Handle any errors that might occur during the fetch call
        console.error('Error:', error);
        errorNotification("An error occurred while fetching user data.", 5);
    }
}

// Function to populate the table with user data
function populateUserDetails(data) {
    const userDataContainer = document.getElementById("user-data");

    // Clear existing table rows
    userDataContainer.innerHTML = "";

    // Iterate through the data and populate the table
    data.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${user.first_name || ''}</td>
            <td>${user.last_name || ''}</td>
            <td>${user.email || ''}</td>
            <!-- Add any other user-specific columns as needed -->
        `;
        userDataContainer.appendChild(row);
    });
}

// Fetch and populate users when the page loads
document.addEventListener("DOMContentLoaded", fetchAndPopulateUsers);
