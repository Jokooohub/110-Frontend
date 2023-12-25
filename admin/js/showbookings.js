document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from the API endpoint
    fetch("http://hotel-backend.test/api/booking")
      .then((response) => response.json())
      .then((data) => {
        // Call a function to populate the table with the received data
        populateTable(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
  
  function populateTable(data) {
    const tableBody = document.getElementById("table-data");
  
    // Clear existing table rows
    tableBody.innerHTML = "";
  
    // Loop through the data and create table rows
    data.forEach((booking, index) => {
      const row = tableBody.insertRow();
  
      // Add cells with booking information
      const cells = [
        index + 1,
        booking.booking_id,
        booking.firstname,
        booking.lastname,
        booking.phone_number,
        booking.checkin,
        booking.checkout,
        // booking.user_id,
        booking.room_id,
      ];
  
      // Append cells to the row
      cells.forEach((cellData) => {
        const cell = row.insertCell();
        cell.textContent = cellData;
      });
  
    });
  }
  
  function handleAssignRoom(bookingId) {
    // Implement the logic to handle room assignment here
    // You can open the modal and use the bookingId for further processing
    // For simplicity, you can just log the bookingId for now
    console.log("Assign Room clicked for booking ID:", bookingId);
  }