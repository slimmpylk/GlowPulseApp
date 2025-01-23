# GlowPulseApp

GlowPulseApp is a mobile application that integrates with a Raspberry Pi server to monitor heart rate in real-time and control an SPI-controlled LED strip. The app allows users to connect to a heart rate monitor, configure heart rate zones, and visualize intensity levels through dynamic LED lighting.

---

## Features

- **Bluetooth Device Discovery**: Scan for available Bluetooth devices what Raspberry sees, including the heart rate monitor.
- **Device Connection**: Seamlessly connect to the selected Bluetooth device.
- **Heart Rate Zone Configuration**:
  - Configure heart rate zones by entering your maximum heart rate.
  - Automatically calculate zones based on percentages (50%-100% of HRmax).
- **REST API Integration**:
  - Communicates with the Raspberry Pi server via REST APIs.
  - Sends heart rate zones to the server.
  - Initiates LED control based on real-time heart rate data.
- **User-Friendly Interface**: Intuitive navigation and clear visual feedback for all actions.

---

## VIDEO



https://github.com/user-attachments/assets/3d9e9fb1-fb7c-4b9c-84ad-400f813e706c


---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/GlowPulseApp.git
   cd GlowPulseApp
   ```

2. **Install Dependencies**:
   - Ensure you have [Node.js](https://nodejs.org) and [React Native CLI](https://reactnative.dev/docs/environment-setup) installed.
   - Install project dependencies:
     ```bash
     npm install
     ```

3. **Start the Metro Bundler**:
   ```bash
   npx react-native start
   ```

4. **Run the App**:
   - For Android:
     ```bash
     press a
     ```
   - For iOS:
     ```bash
     press ios
     ```

---

## Configuration

### REST API Endpoints
GlowPulseApp communicates with the Raspberry Pi server using the following endpoints:

- **GET /devices**: Retrieves a list of available Bluetooth devices.
- **POST /connect**: Connects to a specific Bluetooth device using its address.
- **POST /zones**: Sends heart rate zones to the server in the following format:
  ```json
  {
    "zones": [
      {"zone": 1, "range": "50-60 bpm", "intensity": "Very light"},
      {"zone": 2, "range": "60-70 bpm", "intensity": "Light"},
      {"zone": 3, "range": "70-80 bpm", "intensity": "Moderate"},
      {"zone": 4, "range": "80-90 bpm", "intensity": "Hard"},
      {"zone": 5, "range": "90-100 bpm", "intensity": "Maximum"}
    ]
  }
  ```

### Environment Variables
If you need to configure the server URL, update the `SERVER_URL` constant in the app:

```javascript
const SERVER_URL = 'http://192.168.1.26:5000'; // Replace with your server's IP
```

---

## Usage

1. **Launch the App**:
   - Start the app on your device or emulator.

2. **Scan for Devices**:
   - Use the "Fetch Devices" button to scan for nearby Bluetooth devices.

3. **Connect to monitor**:
   - Select the heart rate monitor from the list.
   - The app will establish a connection via the server.

4. **Configure Heart Rate Zones**:
   - Enter your maximum heart rate in the "Heart Rate Zones" screen.
   - Zones will be calculated automatically and sent to the server.

5. **Monitor Heart Rate and LEDs**:
   - The Raspberry Pi will use real-time heart rate data to control the LED strip and you can see on which zone you are.

---

## Troubleshooting

1. **Unable to Fetch Devices**:
   - Ensure the Raspberry Pi server is running.
   - Verify the `SERVER_URL` in the app matches the server's IP address.

2. **Connection Fails**:
   - Ensure the Polar H10 is powered on and not connected to another device.

3. **Zones Not Updating**:
   - Verify the zones are sent successfully via the `/zones` endpoint.
   - Check the Raspberry Pi server logs for errors.

---

## Contributions

Contributions are welcome! Feel free to fork this repository, submit a pull request, or open an issue.
