document.addEventListener("DOMContentLoaded", function () {
  const makeFilter = document.getElementById("makeFilter");
  const carList = document.getElementById("carList");
  const loading = document.getElementById("loading");
  const apiUrl = "https://exam.razoyo.com/api/cars";

  //Function to fetch car data from API
function fetchCars(make = "") {
    let url = apiUrl;
    if (make) {
        url += `?make=${make}`;
    }
    loading.style.display = "block"; // Show loading indicator
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch car data');
            }
            return response.json();
        })
        .then(data => {
            renderCars(data);
            renderMakeOptions(data.makes); // Call function to render make options
        })
        .catch(error => console.error('Error fetching car data:', error))
        .finally(() => {
            loading.style.display = "none"; // Hide loading indicator
        });
}

// Function to render make options in select dropdown
function renderMakeOptions(makes) {
    makeFilter.innerHTML = ""; // Clear previous options
    makes.forEach(make => {
        const option = document.createElement("option");
        option.value = make;
        option.textContent = make;
        makeFilter.appendChild(option);
    });
}
  // Function to render cars on the page
  function renderCars(data) {
      carList.innerHTML = ""; // Clear previous car list
      data.cars.forEach(car => {
          const carElement = document.createElement("div");
          carElement.classList.add("car");
          carElement.innerHTML = `
              <img src="${car.image}" alt="${car.make} ${car.model}">
              <div>
                  <p><strong>${car.make}</strong></p>
                  <button class="openBtn" data-id="${car.id}">Open</button>
                  <div class="carDetails" style="display: none;"></div>
              </div>
          `;
          carList.appendChild(carElement);
      });
  }

  // Event delegation for "Open" button click
  carList.addEventListener("click", function (event) {
      if (event.target.classList.contains("openBtn")) {
          const carId = event.target.getAttribute("data-id");
          const carElement = event.target.closest(".car");
          fetchCarDetails(carId, carElement);
      }
  });

  // Function to fetch and display car details
  function fetchCarDetails(carId, carElement) {
      const token = localStorage.getItem("Your-Token");
      console.log(token);
      const url = `https://exam.razoyo.com/api/cars/${carId}`;
      console.log(url);
      fetch(url, {
          headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      })
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Failed to fetch car details: ${response.status} ${response.statusText}`);
              }
              return response.json();
          })
          .then(data => {
              const detailsElement = carElement.querySelector(".carDetails");
              detailsElement.innerHTML = `
                  <img src="${data.image}" alt="${data.make} ${data.model}">
                  <p><strong>Year:</strong> ${data.year}</p>
                  <p><strong>Make:</strong> ${data.make}</p>
                  <p><strong>Model:</strong> ${data.model}</p>
                  <p><strong>MPG:</strong> ${data.mpg}</p>
                  <p><strong>Price:</strong> $${data.price}</p>
                  <p><strong>Seats:</strong> ${data.seats}</p>
              `;
              detailsElement.style.display = "block";
          })
          .catch(error => console.error('Error fetching car details:', error.message));
  }

  // Event listener for make filter change
  makeFilter.addEventListener("change", function () {
      const selectedMake = this.value;
      fetchCars(selectedMake);
  });

  // Initial load of cars when page loads
  fetchCars();
});
