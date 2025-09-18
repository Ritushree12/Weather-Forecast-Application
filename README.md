# Weather Forecast Application

A modern, responsive web application that provides current weather information and a 5-day forecast for any city, using the OpenWeatherMap API. Built with vanilla JavaScript, Tailwind CSS, and HTML.

## Features

- **City Search:** Enter any city to get real-time weather data.
- **Current Location:** Get weather for your current location using geolocation.
- **Recent Searches:** Dropdown for quick access to your last 5 searched cities.
- **Dynamic Backgrounds:** Weather-based background images for immersive experience.
- **Unit Toggle:** Switch between Celsius and Fahrenheit.
- **Weather Alerts:** Visual alerts for extreme weather conditions (heat/cold).
- **5-Day Forecast:** See a summarized forecast for the next 5 days.
- **Responsive Design:** Works on desktop and mobile devices.

## Getting Started

### Prerequisites

- Node.js (for Tailwind CSS build)
- Internet connection (for API and images)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <https://github.com/Ritushree12/Weather-Forecast-Application.git>
   cd "Weather forecast application"
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Build Tailwind CSS:**
   ```sh
   npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css
   ```
4. **Open `src/index.html` in your browser.**

### API Key

- The app uses a demo API key. For production, [get your own API key](https://openweathermap.org/api) and replace the value of `API_KEY` in `src/script.js`.

## Project Structure

```
assets/                # Weather images and favicon
src/
  index.html           # Main HTML file
  input.css            # Tailwind CSS input
  output.css           # Compiled CSS
  script.js            # Main JavaScript logic
package.json           # Project metadata
```

## Customization

- **Images:** Add or replace weather images in `assets/weather/`.
- **Styling:** Modify `src/input.css` and rebuild Tailwind for custom styles.

## Credits

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Weather images: Unsplash/Pexels (replace with your own if needed)

## License

This project is for educational and personal use.

## GitHub Repository

[View on GitHub](https://github.com/Ritushree12/Weather-Forecast-Application)
