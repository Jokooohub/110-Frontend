// Set the backend URL
const backendurl = 'http://hotel-backend.test';

// Function to fetch and update room data
async function fetchAndPopulateRooms() {
  try {
    // Fetch data from the API endpoint
    const response = await fetch(`${backendurl}/api/room`);
    const data = await response.json();

    if (response.ok) {
      // If the response is successful, update the table
      populateTable(data);
    } else {
      // If there's an error in the response, show an error message
      errorNotification("Failed to fetch room data.", 5);
    }
  } catch (error) {
    // Handle any errors that might occur during the fetch call
    console.error('Error:', error);
    errorNotification("An error occurred while fetching room data.", 5);
  }
}

// Function to delete a room by its ID
async function deleteRoom(roomId) {
  try {
    const response = await fetch(`${backendurl}/api/room/${roomId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log(`Room with ID ${roomId} deleted successfully.`);
      // Refresh the room data after deletion
      fetchAndPopulateRooms();
    } else {
      console.error(`Error deleting room with ID ${roomId}`);
    }
  } catch (error) {
    console.error('Error deleting room:', error);
  }
}

// Function to populate the table with room data
function populateTable(data) {
  const roomDataContainer = document.getElementById("room-data");

  // Clear existing table rows
  roomDataContainer.innerHTML = "";

  // Iterate through the data and populate the table
  data.forEach((room, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${room.room_name}</td>
      <td>${room.price}</td>
      <td>${room.details}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteRoom(${room.id})">Delete</button>
      </td>
    `;
    roomDataContainer.appendChild(row);
  });
}

// Fetch and populate rooms when the page loads
document.addEventListener("DOMContentLoaded", fetchAndPopulateRooms);
