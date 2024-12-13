document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const tableBody = document.querySelector('#listings-table tbody');
    const listingIdInput = document.getElementById('listing-id');
    const nameInput = document.getElementById('name');
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');
  
    const fetchListings = async () => {
      const response = await fetch('/admin/listings');
      const data = await response.json();
      tableBody.innerHTML = '';
      data.forEach((listing) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${listing.id}</td>
          <td>${listing.name}</td>
          <td>${listing.latitude}</td>
          <td>${listing.longitude}</td>
          <td>
            <button onclick="editListing(${listing.id}, '${listing.name}', ${listing.latitude}, ${listing.longitude})">Edit</button>
            <button onclick="deleteListing(${listing.id})">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    };
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = listingIdInput.value;
      const name = nameInput.value;
      const latitude = latitudeInput.value;
      const longitude = longitudeInput.value;
  
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/admin/listings/${id}` : '/admin/listings';
  
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, latitude, longitude }),
      });
  
      form.reset();
      fetchListings();
    });
  
    window.deleteListing = async (id) => {
      await fetch(`/admin/listings/${id}`, { method: 'DELETE' });
      fetchListings();
    };
  
    window.editListing = (id, name, latitude, longitude) => {
      listingIdInput.value = id;
      nameInput.value = name;
      latitudeInput.value = latitude;
      longitudeInput.value = longitude;
    };
  
    fetchListings();
  });
  