// Set the backend URL
const backendurl = 'http://hotel-backend.test';

// Function to fetch room data from the API
async function fetchRoomData() {
  try {
    const response = await fetch(`${backendurl}/api/room`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching room data:', error);
    return [];
  }
}

// Function to generate room cards dynamically
async function generateRoomCards() {
  const roomsContainer = document.getElementById('rooms');
  const roomsData = await fetchRoomData();

  // Clear existing content inside the rooms container
  roomsContainer.innerHTML = '';

  const row = document.createElement('div');
  row.className = 'row';

  roomsData.forEach(room => {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 my-3';

    const card = document.createElement('div');
    card.className = 'card border-0 shadow';
    card.style = 'max-width: 350px; margin: auto';

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = room.image || 'assets/img/rooms/1.jpg'; // Use default image if room.image is not provided

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body text-center'; // Center-align card content

    const roomName = document.createElement('h5');
    roomName.textContent = room.room_name || 'Room Name';

    const price = document.createElement('h6');
    price.className = 'mb-4';
    price.textContent = `₱${room.price || '0'} per night`;

    const details = document.createElement('div');
    details.className = 'details mb-4';

    const roomNumberLabel = document.createElement('h6');
    roomNumberLabel.className = 'mb-1';
    roomNumberLabel.textContent = 'Room Number';

    const roomNumber = document.createElement('span');
    roomNumber.textContent = room.id || 'N/A'; // Use room.id as the Room Number

    const detailsLabel = document.createElement('h6');
    detailsLabel.className = 'mb-1';
    detailsLabel.textContent = 'Details';

    const detailsText = document.createElement('span');
    detailsText.textContent = room.details || 'No details available.';

    const bookNowButton = document.createElement('a');
    bookNowButton.href = 'booking_confirmation.html';
    bookNowButton.className = 'btn btn-sm text-white custom-bg shadow-none d-flex justify-content-center'; // Center-align the button
    bookNowButton.textContent = 'Book Now';

    // Append elements to the DOM
    details.appendChild(roomNumberLabel);
    details.appendChild(roomNumber);
    details.appendChild(detailsLabel);
    details.appendChild(detailsText);

    cardBody.appendChild(roomName);
    cardBody.appendChild(price);
    cardBody.appendChild(details);
    cardBody.appendChild(bookNowButton);

    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
  });

  // Append the row to the rooms container
  roomsContainer.appendChild(row);
}

// Fetch and generate room cards when the page loads
document.addEventListener('DOMContentLoaded', generateRoomCards);
