 # Car Catalog Web App 🚘
This web application fetches and displays a catalog of cars from an external API. Users can view car listings, filter cars by category.

# API Reference
The API provides two endpoints:

# List cars

GET https://exam.razoyo.com/api/cars?make={make}
Returns a list of available cars based on the optional make query filter. The response also includes a list of all possible makes.
Get a car

GET https://exam.razoyo.com/api/cars/{id}
Retrieves the details of a specific car by its ID. Authentication is required using the Your-Token value from the "list cars" response.

# Getting Started
- Clone the repository.
- Right click index.html file
- Open it in your browser
# Usage
- Upon loading the page, you'll see a list of cars fetched from the API.
- Use the dropdown menu to filter cars by make.
# Technologies Used
Express.js
Axios
HTML, CSS, JavaScript
# Contributors
Hadiqa Aziz - Lead Developer
# License
This project is licensed under the MIT License. See the LICENSE file for details.
