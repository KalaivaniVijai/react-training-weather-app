# react-training-weather-app
This project aims to create a lightweight, custom solution for quickly accessing weather information for any location.

**Why this project?**

Many of us have friends or family living in different parts of the country or around the world. It would be incredibly useful to have a fast and easy way to check the current and forecasted weather for various locations worldwide. While existing websites offer this functionality, they tend to be bulky and slow.

**Technical Details**

Here are the technologies Used:
**React:** JavaScript framework for building the user interface.
**Bootstrap:** CSS framework for styling and layout.
**OpenWeatherMap API:** Provides weather data.
API Doumentation: [OpenWeatherMap Current Weather API](https://openweathermap.org/current)

**Steps to Run the App Locally**

Clone the Repository
Clone the repository to your local machine using the following command:
git clone <repository-url>

**Install Dependencies**
Navigate to the project directory and install the required dependencies using npm or yarn:

cd <project-directory>
npm install

**API Key Configuration**

Sign up at OpenWeatherMap to get your API key.
Create a .env file in the root of the project and add your API key as follows:
REACT_APP_OPENWEATHERMAP_API_KEY=your_api_key_here

**Start the App**
After installing the dependencies and setting the API key, start the app by running:

npm start
This will launch the app in your default web browser at http://localhost:3000.

**Features Implemented:**
**App Structure:**

**Dashboard/Home Page:**
  Displays the current weather and weather icons for multiple locations.
  Users can add new locations to the dashboard.
  Clicking on a location will open its detailed weather information.

**Details Page:**
  Displays both current and forecasted weather for a single location.

**API Integration:**
  Data is fetched from the OpenWeatherMap Current Weather API.
  The app uses the current weather and forecast data to display weather information.

**Example API Request:**
  To fetch current weather for a location (e.g., New York), the request would look like this:
  https://api.openweathermap.org/data/2.5/weather?q=Cologne&appid=your_api_key

![image](https://github.com/user-attachments/assets/a0eaa036-82e5-4e93-8e58-4215e10b9907)

  
