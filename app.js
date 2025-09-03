/**
 * @file Main application logic for the DI AERO Dashboard.
 * @description This script manages the entire lifecycle and interactivity of the DI AERO frontend,
 * including UI rendering, event handling, real-time data simulation, and page navigation.
 * @author AI Architect
 * @version 2.0.1
 */

// ===================================================================================
//  APPLICATION DATA STORE
// ===================================================================================

/**
 * @const {object} applicationData
 * @description A centralized object containing all mock data for the dashboard demonstration.
 * This simulates a backend database or real-time data feed.
 */
const applicationData = {
  "activeFlights": [
    {"id": "FL001", "drone": "Mavic 3T-01", "pilot": "Sarah Johnson", "mission": "Roof Inspection", "status": "In Flight", "battery": 78, "altitude": 120, "latitude": 30.2241, "longitude": -92.0198, "startTime": "14:30", "duration": "25 min"},
    {"id": "FL002", "drone": "Mavic 3-02", "pilot": "Mike Rodriguez", "mission": "Infrastructure Survey", "status": "Pre-Flight", "battery": 95, "altitude": 0, "latitude": 30.2280, "longitude": -92.0165, "startTime": "15:00", "duration": "0 min"}
  ],
  "drones": [
    {"id": "DRN001", "model": "Mavic 3T", "serial": "3T240815001", "status": "In Flight", "battery": 78, "flightHours": 245.5, "lastMaintenance": "2025-08-15", "location": "Lafayette Regional Airport"},
    {"id": "DRN002", "model": "Mavic 3", "serial": "M3240820002", "status": "Available", "battery": 95, "flightHours": 187.2, "lastMaintenance": "2025-08-20", "location": "Drone Institute Hangar"},
    {"id": "DRN003", "model": "Mavic 3T", "serial": "3T240810003", "status": "Maintenance", "battery": 0, "flightHours": 312.8, "lastMaintenance": "2025-07-28", "location": "Maintenance Bay 1"},
    {"id": "DRN004", "model": "Mavic 3 Enterprise", "serial": "ME240825004", "status": "Charging", "battery": 45, "flightHours": 98.6, "lastMaintenance": "2025-08-25", "location": "Charging Station A"}
  ],
  "weather": {
    "location": "Lafayette, Louisiana",
    "temperature": 78,
    "humidity": 65,
    "windSpeed": 8,
    "windDirection": "SW",
    "visibility": 10,
    "condition": "Partly Cloudy",
    "flightCategory": "VFR",
    "alerts": []
  },
  "detections": [
    {"id": "DET001", "timestamp": "14:45:23", "class": "Hot Spot", "confidence": 0.92, "temperature": 156, "location": "Roof Section A", "verified": false, "alert": true},
    {"id": "DET002", "timestamp": "14:44:18", "class": "Person", "confidence": 0.87, "temperature": 98.6, "location": "Ground Level", "verified": true, "alert": false},
    {"id": "DET003", "timestamp": "14:43:45", "class": "Vehicle", "confidence": 0.94, "temperature": 105, "location": "Parking Area", "verified": true, "alert": false}
  ],
  "agents": [
    {"name": "Nova", "type": "Flight Coordinator", "status": "Active", "currentTask": "Monitoring FL001 mission parameters", "responseTime": 145, "successRate": 98.5},
    {"name": "Marla", "type": "Mission Analyzer", "status": "Active", "currentTask": "Analyzing thermal data patterns", "responseTime": 230, "successRate": 96.2},
    {"name": "Rhea", "type": "Risk Evaluator", "status": "Standby", "currentTask": "Weather pattern analysis", "responseTime": 180, "successRate": 99.1},
    {"name": "Val", "type": "Validation Agent", "status": "Active", "currentTask": "Verifying detection accuracy", "responseTime": 125, "successRate": 97.8},
    {"name": "HAIL-M", "type": "Health Monitor", "status": "Active", "currentTask": "System health diagnostics", "responseTime": 95, "successRate": 99.5}
  ],
    "missions": [
    {"id": "MISS001", "name": "Post-Storm Roof Survey", "type": "Thermal Inspection", "area": "Residential District", "waypoints": 15, "estimatedDuration": 45, "status": "Active"},
    {"id": "MISS002", "name": "Infrastructure Assessment", "type": "Visual Survey", "area": "Downtown Lafayette", "waypoints": 22, "estimatedDuration": 60, "status": "Planned"},
    {"id": "MISS003", "name": "Emergency Response Training", "type": "Search Pattern", "area": "Training Facility", "waypoints": 8, "estimatedDuration": 30, "status": "Template"}
  ],
  "notifications": [
    {"id": "NOT001", "type": "Weather Alert", "message": "Wind speeds increasing to 12 mph - monitor active flights", "priority": "Medium", "timestamp": "14:42:15"},
    {"id": "NOT002", "type": "Detection Alert", "message": "High-temperature anomaly detected in Roof Section A", "priority": "High", "timestamp": "14:45:23"},
    {"id": "NOT003", "type": "Maintenance Due", "message": "Mavic 3T-003 requires scheduled maintenance", "priority": "Low", "timestamp": "09:15:00"}
  ],
  "users": [
    {"id": "USR001", "name": "Sarah Johnson", "role": "Senior Pilot", "part107": "4928301", "status": "Active", "currentFlight": "FL001"},
    {"id": "USR002", "name": "Mike Rodriguez", "role": "Pilot", "part107": "4928302", "status": "Pre-Flight", "currentFlight": "FL002"},
    {"id": "USR003", "name": "Dr. Lisa Chen", "role": "Instructor", "part107": "4928303", "status": "Available", "currentFlight": null},
    {"id": "USR004", "name": "James Wilson", "role": "Supervisor", "part107": "4928304", "status": "Monitoring", "currentFlight": "Supervising"}
  ],
  "blockchain": [
    {"id": "BLK001", "hash": "0x7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730", "type": "Flight Started", "timestamp": "14:30:00", "verified": true},
    {"id": "BLK002", "hash": "0x8e976f06ad3c5f757c8b0f5a7d6e9c8b4a3d2e1f0c9b8a7d6e5f4c3b2a1d0e9f", "type": "Detection Created", "timestamp": "14:45:23", "verified": true},
    {"id": "BLK003", "hash": "0x9f087e17be4d6f868d9c1f6b8e7f0d9c5b4e3f2e1d0c9b8a7e6f5d4c3b2a1e0f", "type": "Media Upload", "timestamp": "14:44:50", "verified": true}
  ]
};

// ===================================================================================
//  APPLICATION STATE & CONFIGURATION
// ===================================================================================

let currentPage = 'dashboard';
let sidebarCollapsed = false;
let darkMode = false;
let notificationPanelOpen = false;
let activityChart = null;
let map = null;
let missionMap = null;
let droneMarkers = {};
const mapboxAccessToken = 'pk.eyJ1IjoicnVzc2VsbHJhbmRvbCIsImEiOiJjbWY0YjBvN2MwM2t4Mm1vcDNzN3dvNXV3In0.n4Z3wKdA_zBl5mx38ElyUA';

// DOM Element Cache
const dom = {};

// ===================================================================================
//  INITIALIZATION
// ===================================================================================

/**
 * Initializes the application after the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', initializeApp);

/**
 * Main initialization function. Caches DOM elements, sets up listeners,
 * and populates the initial view.
 */
function initializeApp() {
  cacheDOMElements();
  showLoadingScreen();
  setupEventListeners();
  setupNavigation();
  populateAllPages();
  initializeCharts();
  startRealTimeUpdates();
  checkMobileView();
}

/**
 * Caches frequently accessed DOM elements to improve performance.
 */
function cacheDOMElements() {
  dom.sidebar = document.getElementById('sidebar');
  dom.mainContent = document.getElementById('mainContent');
  dom.menuToggle = document.getElementById('menuToggle');
  dom.themeToggle = document.getElementById('themeToggle');
  dom.notificationBtn = document.getElementById('notificationBtn');
  dom.notificationPanel = document.getElementById('notificationPanel');
  dom.closeNotifications = document.getElementById('closeNotifications');
  dom.breadcrumb = document.getElementById('breadcrumb');
  dom.loadingOverlay = document.getElementById('loadingOverlay');
  dom.logo = document.querySelector('.logo');
}

/**
 * Displays a loading animation for a brief period.
 */
function showLoadingScreen() {
  setTimeout(() => {
    dom.loadingOverlay?.classList.add('hidden');
  }, 1500);
}

// ===================================================================================
//  EVENT HANDLING
// ===================================================================================

/**
 * Sets up all primary event listeners for the application.
 */
function setupEventListeners() {
  dom.menuToggle?.addEventListener('click', toggleSidebar);
  dom.themeToggle?.addEventListener('click', toggleTheme);
  dom.notificationBtn?.addEventListener('click', toggleNotificationPanel);
  dom.closeNotifications?.addEventListener('click', toggleNotificationPanel);
  dom.logo?.addEventListener('click', () => navigateToPage('dashboard'));

  window.addEventListener('resize', checkMobileView);
  document.addEventListener('click', handleOutsideClicks);
}

/**
 * Closes the notification panel if a click occurs outside of it.
 * @param {Event} e - The click event object.
 */
function handleOutsideClicks(e) {
  const isOutsidePanel = notificationPanelOpen && 
                         dom.notificationPanel && 
                         !dom.notificationPanel.contains(e.target) && 
                         dom.notificationBtn && 
                         !dom.notificationBtn.contains(e.target);

  if (isOutsidePanel) {
    toggleNotificationPanel();
  }
}

// ===================================================================================
//  NAVIGATION & PAGE MANAGEMENT
// ===================================================================================

/**
 * Sets up navigation links to handle page transitions.
 */
function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageName = link.getAttribute('data-page');
      if (pageName) navigateToPage(pageName);
    });
  });
}

/**
 * Handles the logic for switching between different pages in the application.
 * @param {string} pageName - The identifier for the page to display.
 */
function navigateToPage(pageName) {
  currentPage = pageName;
  
  updateActiveNavLink(pageName);
  showTargetPage(pageName);
  updateBreadcrumb(pageName);
  
  if (window.innerWidth <= 768) dom.sidebar?.classList.remove('open');
  
  refreshPageContent(pageName);
  handleMapInitialization(pageName);
}

/**
 * Updates the visual state of the navigation links.
 * @param {string} pageName - The currently active page.
 */
function updateActiveNavLink(pageName) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === pageName);
  });
}

/**
 * Hides all pages and displays the target page.
 * @param {string} pageName - The page to display.
 */
function showTargetPage(pageName) {
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  
  const targetPage = document.getElementById(`${pageName}-page`);
  if (targetPage) {
    targetPage.style.display = 'block';
  } else {
    console.error(`Page not found: ${pageName}-page`);
    document.getElementById('dashboard-page').style.display = 'block'; // Fallback
  }
}

/**
 * Updates the breadcrumb navigation text.
 * @param {string} pageName - The current page name.
 */
function updateBreadcrumb(pageName) {
  const pageTitles = {
    'dashboard': 'Dashboard', 'flight-ops': 'Flight Operations', 'drone-fleet': 'Drone Fleet',
    'mission-planning': 'Mission Planning', 'ai-detection': 'AI Detection', 'weather': 'Weather Center',
    'agents': 'Agent Control', 'blockchain': 'Chain of Custody', 'settings': 'Settings', 'reports': 'Reports'
  };
  if (dom.breadcrumb) dom.breadcrumb.textContent = pageTitles[pageName] || 'Dashboard';
}

/**
 * Initializes or refreshes maps when their respective pages are loaded.
 * @param {string} pageName - The current page name.
 */
function handleMapInitialization(pageName) {
    const initOrRefresh = (mapInstance, initializer) => {
        setTimeout(() => {
            if (!mapInstance) initializer();
            else mapInstance.invalidateSize();
        }, 100);
    };

    if (pageName === 'flight-ops') initOrRefresh(map, initializeMap);
    if (pageName === 'mission-planning') initOrRefresh(missionMap, initializeMissionMap);
}


// ===================================================================================
//  UI TOGGLES & UPDATES
// ===================================================================================

/**
 * Toggles the sidebar visibility.
 */
function toggleSidebar() {
  if (window.innerWidth <= 768) {
    dom.sidebar?.classList.toggle('open');
  } else {
    sidebarCollapsed = !sidebarCollapsed;
    dom.sidebar?.classList.toggle('collapsed', sidebarCollapsed);
    dom.mainContent?.classList.toggle('expanded', sidebarCollapsed);
  }
}

/**
 * Toggles between light and dark color schemes.
 */
function toggleTheme() {
  darkMode = !darkMode;
  document.documentElement.setAttribute('data-color-scheme', darkMode ? 'dark' : 'light');
  dom.themeToggle.querySelector('i').className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
}

/**
 * Toggles the notification panel's visibility.
 */
function toggleNotificationPanel() {
  notificationPanelOpen = !notificationPanelOpen;
  dom.notificationPanel?.classList.toggle('open', notificationPanelOpen);
}

/**
 * Adjusts UI for mobile screen sizes.
 */
function checkMobileView() {
  if (window.innerWidth <= 768 && !sidebarCollapsed) {
    sidebarCollapsed = true; // Prevent incorrect state on resize
    dom.sidebar?.classList.remove('collapsed');
    dom.mainContent?.classList.remove('expanded');
  }
}

// ===================================================================================
//  DATA POPULATION & RENDERING
// ===================================================================================

/**
 * Populates all pages with their initial data.
 */
function populateAllPages() {
  populateDashboard();
  populateFlightOps();
  populateDroneFleet();
  populateAIDetection();
  populateWeather();
  populateAgents();
  populateBlockchain();
  populateNotifications();
}

/**
 * Calls the appropriate population function for the current page.
 * @param {string} pageName - The page to refresh.
 */
function refreshPageContent(pageName) {
  const pagePopulators = {
    'dashboard': populateDashboard, 'flight-ops': populateFlightOps, 'drone-fleet': populateDroneFleet,
    'ai-detection': populateAIDetection, 'weather': populateWeather, 'agents': populateAgents,
    'blockchain': populateBlockchain
  };
  pagePopulators[pageName]?.();
}

/**
 * Populates the dashboard with dynamic data.
 */
function populateDashboard() {
  // Active Flights
  const activeFlightsList = document.getElementById('activeFlightsList');
  if (activeFlightsList) {
    activeFlightsList.innerHTML = applicationData.activeFlights.map(flight => `
      <div class="flight-item">
        <div class="flight-info">
          <div class="flight-name">${flight.drone} - ${flight.mission}</div>
          <div class="flight-details">Pilot: ${flight.pilot} • ${flight.status} • ${flight.duration}</div>
        </div>
        <div class="flight-metrics">
          <div class="battery-indicator">
            <span>${flight.battery}%</span>
            <div class="battery-bar">
              <div class="battery-fill ${getBatteryClass(flight.battery)}" style="width: ${flight.battery}%"></div>
            </div>
          </div>
          <div class="status status--${getStatusClass(flight.status)}">${flight.status}</div>
        </div>
      </div>
    `).join('');
  }

  // Weather Widget
  const weatherDisplay = document.getElementById('weatherDisplay');
    if (weatherDisplay) {
        const weather = applicationData.weather;
        weatherDisplay.innerHTML = `
      <div class="weather-main">
        <div class="weather-icon"><i class="fas fa-cloud-sun"></i></div>
        <div>
          <div class="weather-temp">${weather.temperature}°F</div>
          <div class="weather-condition">${weather.condition}</div>
        </div>
      </div>
      <div class="weather-details">
        <div class="weather-item"><span>Wind</span><span>${weather.windSpeed} mph ${weather.windDirection}</span></div>
        <div class="weather-item"><span>Humidity</span><span>${weather.humidity}%</span></div>
        <div class="weather-item"><span>Visibility</span><span>${weather.visibility} mi</span></div>
        <div class="weather-item"><span>Flight Category</span><span class="status status--success">${weather.flightCategory}</span></div>
      </div>
    `;
    }

    // Fleet Summary
    const fleetSummary = document.getElementById('fleetSummary');
    if (fleetSummary) {
        const statusCounts = applicationData.drones.reduce((acc, drone) => {
            acc[drone.status] = (acc[drone.status] || 0) + 1;
            return acc;
        }, {});
        fleetSummary.innerHTML = `
      <div class="fleet-stat">
        <div class="fleet-stat-number">${statusCounts['In Flight'] || 0}</div>
        <div class="fleet-stat-label">Active</div>
      </div>
      <div class="fleet-stat">
        <div class="fleet-stat-number">${statusCounts['Available'] || 0}</div>
        <div class="fleet-stat-label">Available</div>
      </div>
      <div class="fleet-stat">
        <div class="fleet-stat-number">${statusCounts['Maintenance'] || 0}</div>
        <div class="fleet-stat-label">Maintenance</div>
      </div>
      <div class="fleet-stat">
        <div class="fleet-stat-number">${statusCounts['Charging'] || 0}</div>
        <div class="fleet-stat-label">Charging</div>
      </div>
    `;
    }

    // Recent Detections
    const recentDetections = document.getElementById('recentDetections');
    if (recentDetections) {
        recentDetections.innerHTML = applicationData.detections.slice(0, 3).map(detection => `
      <div class="detection-item ${detection.alert ? 'alert' : ''}">
        <div class="detection-info">
          <div class="detection-class">${detection.class}</div>
          <div class="detection-meta">${detection.location} • ${detection.timestamp}</div>
        </div>
        <div class="detection-confidence">${(detection.confidence * 100).toFixed(0)}%</div>
      </div>
    `).join('');
    }

    // System Health
    const systemHealth = document.getElementById('systemHealth');
    if (systemHealth) {
        const healthItems = [
            { label: 'AI Agents', status: 'success' },
            { label: 'Weather API', status: 'success' },
            { label: 'Blockchain', status: 'success' },
            { label: 'Communications', status: 'warning' }
        ];
        systemHealth.innerHTML = healthItems.map(item => `
      <div class="health-indicator">
        <div class="health-icon ${item.status}"></div>
        <div class="health-label">${item.label}</div>
      </div>
    `).join('');
    }

    // Update active flight count
    const activeFlightCount = document.getElementById('activeFlightCount');
    if (activeFlightCount) {
        activeFlightCount.textContent = `${applicationData.activeFlights.filter(f => f.status === 'In Flight').length} Active`;
    }
}

/**
 * Populates the flight operations page with telemetry data.
 */
function populateFlightOps() {
  const telemetryData = document.getElementById('telemetryData');
  const activeFlight = applicationData.activeFlights.find(f => f.status === 'In Flight');
  if (telemetryData && activeFlight) {
    telemetryData.innerHTML = `
      <div class="telemetry-group">
        <h4>Position & Navigation</h4>
        <div class="telemetry-items">
          <div class="telemetry-item"><span>Altitude</span><span>${activeFlight.altitude.toFixed(1)} ft</span></div>
          <div class="telemetry-item"><span>Latitude</span><span>${activeFlight.latitude.toFixed(4)}°</span></div>
          <div class="telemetry-item"><span>Longitude</span><span>${activeFlight.longitude.toFixed(4)}°</span></div>
          <div class="telemetry-item"><span>Ground Speed</span><span>25 mph</span></div>
        </div>
      </div>
      <div class="telemetry-group">
        <h4>System Status</h4>
        <div class="telemetry-items">
          <div class="telemetry-item"><span>Battery</span><span>${activeFlight.battery.toFixed(0)}%</span></div>
          <div class="telemetry-item"><span>Signal</span><span>-62 dBm</span></div>
          <div class="telemetry-item"><span>Temperature</span><span>72°F</span></div>
          <div class="telemetry-item"><span>Flight Time</span><span>${activeFlight.duration}</span></div>
        </div>
      </div>
    `;
  }
}

/**
 * Populates the drone fleet page.
 */
function populateDroneFleet() {
    const fleetGrid = document.getElementById('fleetGrid');
    if (fleetGrid) {
        fleetGrid.innerHTML = applicationData.drones.map(drone => `
            <div class="drone-card">
                <div class="drone-header">
                    <div>
                        <div class="drone-model">${drone.model}</div>
                        <div class="drone-serial">${drone.serial}</div>
                    </div>
                    <div class="drone-status ${getStatusClass(drone.status)}">${drone.status}</div>
                </div>
                <div class="drone-details">
                    <div class="drone-detail"><span>Battery</span><span>${drone.battery}%</span></div>
                    <div class="drone-detail"><span>Flight Hours</span><span>${drone.flightHours}</span></div>
                    <div class="drone-detail"><span>Last Maintenance</span><span>${drone.lastMaintenance}</span></div>
                    <div class="drone-detail"><span>Location</span><span>${drone.location}</span></div>
                </div>
            </div>
        `).join('');
    }
}

/**
 * Populates the AI detection feed.
 */
function populateAIDetection() {
    const detectionFeed = document.getElementById('detectionFeed');
    if (detectionFeed) {
        detectionFeed.innerHTML = applicationData.detections.map(detection => `
            <div class="detection-item ${detection.alert ? 'alert' : ''}">
                <div class="detection-info">
                    <div class="detection-class">${detection.class}</div>
                    <div class="detection-meta">
                        ${detection.location} • ${detection.timestamp}
                        ${detection.temperature ? `• ${detection.temperature}°F` : ''}
                    </div>
                </div>
                <div class="detection-metrics">
                    <div class="detection-confidence">${(detection.confidence * 100).toFixed(0)}%</div>
                    <i class="fas ${detection.verified ? 'fa-check-circle' : 'fa-clock'}" 
                       style="color: var(--color-${detection.verified ? 'success' : 'warning'});"></i>
                </div>
            </div>
        `).join('');
    }
}

/**
 * Populates the weather page.
 */
function populateWeather() {
  const currentWeather = document.getElementById('currentWeather');
  if (currentWeather) {
    const weather = applicationData.weather;
    currentWeather.innerHTML = `
      <div class="weather-main">
        <i class="fas fa-cloud-sun weather-icon"></i>
        <div>
          <div class="weather-temp">${weather.temperature}°F</div>
          <div>${weather.condition}</div>
        </div>
      </div>
      <div class="weather-details">
        <div><span>Wind</span><span>${weather.windSpeed} mph ${weather.windDirection}</span></div>
        <div><span>Humidity</span><span>${weather.humidity}%</span></div>
        <div><span>Visibility</span><span>${weather.visibility} mi</span></div>
      </div>
    `;
  }
}

/**
 * Populates the agent control page.
 */
function populateAgents() {
    const agentsGrid = document.getElementById('agentsGrid');
    if (agentsGrid) {
        agentsGrid.innerHTML = applicationData.agents.map(agent => `
            <div class="agent-card">
                <div class="agent-header">
                    <div>
                        <div class="agent-name">${agent.name}</div>
                        <div class="agent-type">${agent.type}</div>
                    </div>
                    <div class="agent-status ${agent.status.toLowerCase()}">${agent.status}</div>
                </div>
                <div class="agent-current-task"><strong>Task:</strong> ${agent.currentTask}</div>
            </div>
        `).join('');
    }
}

/**
 * Populates the blockchain/chain of custody page.
 */
function populateBlockchain() {
    const blockchainFeed = document.getElementById('blockchainFeed');
    if (blockchainFeed) {
        blockchainFeed.innerHTML = applicationData.blockchain.map(block => `
            <div class="blockchain-item">
                <div class="blockchain-info">
                    <div class="blockchain-type">${block.type}</div>
                    <div class="blockchain-hash">${block.hash.substring(0, 30)}...</div>
                    <div class="blockchain-timestamp">${block.timestamp}</div>
                </div>
                <div class="verification-status">
                    <i class="fas fa-check-circle"></i> Verified
                </div>
            </div>
        `).join('');
    }
}

/**
 * Populates the notifications panel.
 */
function populateNotifications() {
  const notificationList = document.getElementById('notificationList');
  if (notificationList) {
    notificationList.innerHTML = applicationData.notifications.map(n => `
      <div class="notification-item ${n.priority.toLowerCase()}">
        <div class="notification-header">
          <strong>${n.type}</strong>
          <span>${n.timestamp}</span>
        </div>
        <p>${n.message}</p>
      </div>
    `).join('');
  }
}

// ===================================================================================
//  CHARTS & MAPS
// ===================================================================================

/**
 * Initializes all charts on the dashboard.
 */
function initializeCharts() {
  const ctx = document.getElementById('activityChart')?.getContext('2d');
  if (ctx && !activityChart) {
    activityChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        datasets: [{
          label: 'Active Flights',
          data: [0, 1, 3, 5, 2, 1],
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
          x: { grid: { color: 'rgba(255, 255, 255, 0.1)' } }
        }
      }
    });
  }
}

/**
 * Initializes the main flight operations map.
 */
function initializeMap() {
    if (document.getElementById('flightMapContainer') && !map) {
        map = L.map('flightMapContainer').setView([30.2241, -92.0198], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '© Mapbox',
            maxZoom: 18,
            accessToken: mapboxAccessToken
        }).addTo(map);
        updateMapMarkers();
    }
}

/**
 * Initializes the mission planning map.
 */
function initializeMissionMap() {
    if (document.getElementById('missionMapContainer') && !missionMap) {
        missionMap = L.map('missionMapContainer').setView([30.2241, -92.0198], 14);
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '© Mapbox',
            maxZoom: 18,
            accessToken: mapboxAccessToken
        }).addTo(missionMap);

        const waypoints = [{ lat: 30.23, lng: -92.02 }, { lat: 30.225, lng: -92.01 }, { lat: 30.22, lng: -92.025 }];
        waypoints.forEach((wp, i) => L.marker([wp.lat, wp.lng]).addTo(missionMap).bindPopup(`Waypoint ${i + 1}`));
        
        const latlngs = waypoints.map(wp => [wp.lat, wp.lng]);
        const polyline = L.polyline(latlngs, {color: 'red'}).addTo(missionMap);
        missionMap.fitBounds(polyline.getBounds());
    }
}

/**
 * Updates drone markers on the flight map.
 */
function updateMapMarkers() {
    if (!map) return;
    applicationData.activeFlights.forEach(flight => {
        const { latitude, longitude, drone, id, mission } = flight;
        if (droneMarkers[id]) {
            droneMarkers[id].setLatLng([latitude, longitude]);
        } else {
            droneMarkers[id] = L.marker([latitude, longitude])
                                .addTo(map)
                                .bindPopup(`<b>${drone}</b><br>${mission}`);
        }
    });
}

// ===================================================================================
//  REAL-TIME DATA SIMULATION
// ===================================================================================

/**
 * Starts intervals to simulate real-time data updates.
 */
function startRealTimeUpdates() {
  setInterval(updateTelemetry, 2000);
  setInterval(updateBatteryLevels, 30000);
  setInterval(addRandomDetection, 45000);
}

/**
 * Simulates changes in active flight telemetry.
 */
function updateTelemetry() {
  if (currentPage !== 'flight-ops') return;
  const activeFlight = applicationData.activeFlights.find(f => f.status === 'In Flight');
  if (activeFlight) {
    activeFlight.altitude += Math.random() * 4 - 2;
    activeFlight.latitude += (Math.random() - 0.5) * 0.0001;
    activeFlight.longitude += (Math.random() - 0.5) * 0.0001;
    populateFlightOps();
    updateMapMarkers();
  }
}

/**
 * Simulates battery level changes for drones.
 */
function updateBatteryLevels() {
  applicationData.drones.forEach(drone => {
    if (drone.status === 'In Flight' && drone.battery > 20) {
      drone.battery = Math.max(20, drone.battery - Math.random() * 3);
    } else if (drone.status === 'Charging' && drone.battery < 100) {
      drone.battery = Math.min(100, drone.battery + Math.random() * 5);
    }
  });

  if (currentPage === 'dashboard') populateDashboard();
  if (currentPage === 'drone-fleet') populateDroneFleet();
}

/**
 * Simulates the creation of a new AI detection event.
 */
function addRandomDetection() {
    const detectionTypes = ['Hot Spot', 'Person', 'Vehicle', 'Debris', 'Animal'];
    const locations = ['Roof Section A', 'Roof Section B', 'Ground Level', 'Parking Area', 'Garden Area'];

    const newDetection = {
        id: `DET${String(Date.now()).slice(-3)}`,
        timestamp: new Date().toLocaleTimeString(),
        class: detectionTypes[Math.floor(Math.random() * detectionTypes.length)],
        confidence: 0.7 + Math.random() * 0.3,
        temperature: 60 + Math.random() * 100,
        location: locations[Math.floor(Math.random() * locations.length)],
        verified: Math.random() > 0.5,
        alert: Math.random() > 0.7
    };

    applicationData.detections.unshift(newDetection);
    if (applicationData.detections.length > 10) {
        applicationData.detections.pop();
    }

    if (currentPage === 'dashboard') populateDashboard();
    if (currentPage === 'ai-detection') populateAIDetection();

    if (newDetection.alert) {
        const notification = {
            id: `NOT${String(Date.now()).slice(-3)}`,
            type: 'Detection Alert',
            message: `${newDetection.class} detected in ${newDetection.location}`,
            priority: 'High',
            timestamp: newDetection.timestamp
        };
        applicationData.notifications.unshift(notification);
        populateNotifications();
        
        const notificationCount = document.querySelector('.notification-count');
        if (notificationCount) {
            notificationCount.textContent = applicationData.notifications.length;
            notificationCount.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => notificationCount.style.animation = '', 500);
        }
    }
}


// ===================================================================================
//  UTILITY FUNCTIONS
// ===================================================================================

/**
 * Returns a CSS class based on battery percentage.
 * @param {number} battery - The battery percentage.
 * @returns {string} The corresponding CSS class ('critical', 'warning', or 'good').
 */
function getBatteryClass(battery) {
  if (battery < 30) return 'critical';
  if (battery < 50) return 'warning';
  return 'good';
}

/**
 * Returns a CSS class based on entity status.
 * @param {string} status - The status string (e.g., 'In Flight', 'Available').
 * @returns {string} The corresponding CSS class.
 */
function getStatusClass(status) {
  const statusMap = {
    'In Flight': 'success', 'Available': 'info', 'Maintenance': 'error',
    'Charging': 'warning', 'Active': 'success', 'Standby': 'warning',
    'Pre-Flight': 'warning'
  };
  return statusMap[status] || 'info';
}

