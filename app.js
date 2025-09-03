// DI AERO Dashboard JavaScript

// Application data
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

// Application state
let currentPage = 'dashboard';
let sidebarCollapsed = false;
let darkMode = false;
let notificationPanelOpen = false;
let activityChart = null;

// DOM elements
let sidebar, mainContent, menuToggle, themeToggle, notificationBtn, notificationPanel, closeNotifications, breadcrumb, loadingOverlay;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Get DOM elements
  sidebar = document.getElementById('sidebar');
  mainContent = document.getElementById('mainContent');
  menuToggle = document.getElementById('menuToggle');
  themeToggle = document.getElementById('themeToggle');
  notificationBtn = document.getElementById('notificationBtn');
  notificationPanel = document.getElementById('notificationPanel');
  closeNotifications = document.getElementById('closeNotifications');
  breadcrumb = document.getElementById('breadcrumb');
  loadingOverlay = document.getElementById('loadingOverlay');

  // Show loading overlay briefly
  setTimeout(() => {
    if (loadingOverlay) {
      loadingOverlay.classList.add('hidden');
    }
  }, 1500);

  // Set up event listeners
  setupEventListeners();
  
  // Initialize navigation
  setupNavigation();
  
  // Populate initial data
  populateAllPages();
  
  // Initialize charts
  initializeCharts();
  
  // Start real-time updates
  startRealTimeUpdates();
  
  // Check for mobile
  checkMobileView();
}

function setupEventListeners() {
  // Menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleSidebar);
  }
  
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Notification panel
  if (notificationBtn) {
    notificationBtn.addEventListener('click', toggleNotificationPanel);
  }
  if (closeNotifications) {
    closeNotifications.addEventListener('click', toggleNotificationPanel);
  }
  
  // Logo click to return to dashboard
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => navigateToPage('dashboard'));
    logo.style.cursor = 'pointer';
  }
  
  // Window resize
  window.addEventListener('resize', checkMobileView);
  
  // Outside click to close notification panel
  document.addEventListener('click', function(e) {
    if (notificationPanelOpen && notificationPanel && !notificationPanel.contains(e.target) && notificationBtn && !notificationBtn.contains(e.target)) {
      toggleNotificationPanel();
    }
  });
}

function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pageName = this.getAttribute('data-page');
      if (pageName) {
        navigateToPage(pageName);
      }
    });
  });
}

function navigateToPage(pageName) {
  console.log('Navigating to:', pageName); // Debug log
  
  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  const targetNavLink = document.querySelector(`[data-page="${pageName}"]`);
  if (targetNavLink) {
    targetNavLink.classList.add('active');
  }
  
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
    page.style.display = 'none';
  });
  
  // Show target page
  const targetPage = document.getElementById(`${pageName}-page`);
  console.log('Target page element:', targetPage); // Debug log
  
  if (targetPage) {
    targetPage.classList.add('active');
    targetPage.style.display = 'block';
  } else {
    console.error('Page not found:', `${pageName}-page`);
    // Fallback to dashboard
    const dashboardPage = document.getElementById('dashboard-page');
    if (dashboardPage) {
      dashboardPage.classList.add('active');
      dashboardPage.style.display = 'block';
    }
  }
  
  // Update breadcrumb
  updateBreadcrumb(pageName);
  
  // Update current page
  currentPage = pageName;
  
  // Close sidebar on mobile
  if (window.innerWidth <= 768 && sidebar) {
    sidebar.classList.remove('open');
  }
  
  // Refresh page-specific content
  refreshPageContent(pageName);
}

function updateBreadcrumb(pageName) {
  const pageNames = {
    'dashboard': 'Dashboard',
    'flight-ops': 'Flight Operations',
    'drone-fleet': 'Drone Fleet',
    'mission-planning': 'Mission Planning',
    'ai-detection': 'AI Detection',
    'weather': 'Weather Center',
    'agents': 'Agent Control',
    'blockchain': 'Chain of Custody',
    'settings': 'Settings',
    'reports': 'Reports'
  };
  
  if (breadcrumb) {
    breadcrumb.textContent = pageNames[pageName] || 'Dashboard';
  }
}

function refreshPageContent(pageName) {
  // Refresh specific page content when navigated to
  switch (pageName) {
    case 'dashboard':
      populateDashboard();
      break;
    case 'flight-ops':
      populateFlightOps();
      break;
    case 'drone-fleet':
      populateDroneFleet();
      break;
    case 'ai-detection':
      populateAIDetection();
      break;
    case 'weather':
      populateWeather();
      break;
    case 'agents':
      populateAgents();
      break;
    case 'blockchain':
      populateBlockchain();
      break;
  }
}

function toggleSidebar() {
  if (window.innerWidth <= 768) {
    if (sidebar) {
      sidebar.classList.toggle('open');
    }
  } else {
    sidebarCollapsed = !sidebarCollapsed;
    if (sidebar && mainContent) {
      if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
      } else {
        sidebar.classList.remove('collapsed');
        mainContent.classList.remove('expanded');
      }
    }
  }
}

function toggleTheme() {
  darkMode = !darkMode;
  document.documentElement.setAttribute('data-color-scheme', darkMode ? 'dark' : 'light');
  
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

function toggleNotificationPanel() {
  notificationPanelOpen = !notificationPanelOpen;
  if (notificationPanel) {
    notificationPanel.classList.toggle('open', notificationPanelOpen);
  }
}

function checkMobileView() {
  if (window.innerWidth <= 768) {
    if (sidebar && mainContent) {
      sidebar.classList.remove('collapsed');
      mainContent.classList.remove('expanded');
      sidebarCollapsed = false;
    }
  }
}

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

function populateDashboard() {
  // Active flights
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
              <div class="battery-fill ${flight.battery < 30 ? 'critical' : flight.battery < 50 ? 'warning' : ''}" 
                   style="width: ${flight.battery}%"></div>
            </div>
          </div>
          <div class="status status--${flight.status === 'In Flight' ? 'success' : 'warning'}">${flight.status}</div>
        </div>
      </div>
    `).join('');
  }

  // Weather display
  const weatherDisplay = document.getElementById('weatherDisplay');
  if (weatherDisplay) {
    const weather = applicationData.weather;
    weatherDisplay.innerHTML = `
      <div class="weather-main">
        <div class="weather-icon">
          <i class="fas fa-cloud-sun"></i>
        </div>
        <div>
          <div class="weather-temp">${weather.temperature}°F</div>
          <div class="weather-condition">${weather.condition}</div>
        </div>
      </div>
      <div class="weather-details">
        <div class="weather-item">
          <span>Wind</span>
          <span>${weather.windSpeed} mph ${weather.windDirection}</span>
        </div>
        <div class="weather-item">
          <span>Humidity</span>
          <span>${weather.humidity}%</span>
        </div>
        <div class="weather-item">
          <span>Visibility</span>
          <span>${weather.visibility} mi</span>
        </div>
        <div class="weather-item">
          <span>Flight Category</span>
          <span class="status status--success">${weather.flightCategory}</span>
        </div>
      </div>
    `;
  }

  // Fleet summary
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

  // Recent detections
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

  // System health
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
    activeFlightCount.textContent = 
      `${applicationData.activeFlights.filter(f => f.status === 'In Flight').length} Active`;
  }
}

function populateFlightOps() {
  // Telemetry data
  const telemetryData = document.getElementById('telemetryData');
  if (telemetryData) {
    const activeFlight = applicationData.activeFlights.find(f => f.status === 'In Flight');
    
    if (activeFlight) {
      telemetryData.innerHTML = `
        <div class="telemetry-group">
          <h4>Position & Navigation</h4>
          <div class="telemetry-items">
            <div class="telemetry-item">
              <span class="telemetry-label">Altitude</span>
              <span class="telemetry-value">${activeFlight.altitude} ft</span>
            </div>
            <div class="telemetry-item">
              <span class="telemetry-label">Latitude</span>
              <span class="telemetry-value">${activeFlight.latitude}°</span>
            </div>
            <div class="telemetry-item">
              <span class="telemetry-label">Longitude</span>
              <span class="telemetry-value">${activeFlight.longitude}°</span>
            </div>
            <div class="telemetry-item">
              <span class="telemetry-label">Ground Speed</span>
              <span class="telemetry-value">25 mph</span>
            </div>
          </div>
        </div>
        <div class="telemetry-group">
          <h4>System Status</h4>
          <div class="telemetry-items">
            <div class="telemetry-item">
              <span class="telemetry-label">Battery</span>
              <span class="telemetry-value">${activeFlight.battery}%</span>
            </div>
            <div class="telemetry-item">
              <span class="telemetry-label">Signal</span>
              <span class="telemetry-value">-62 dBm</span>
            </div>
            <div class="telemetry-item">
              <span class="telemetry-label">Temperature</span>
              <span class="telemetry-value">72°F</span>
            </div>
            <div class="telemetry-item">
              <span class="telemetry-label">Flight Time</span>
              <span class="telemetry-value">${activeFlight.duration}</span>
            </div>
          </div>
        </div>
      `;
    }
  }
}

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
          <div class="drone-status ${drone.status.toLowerCase().replace(' ', '-')}">${drone.status}</div>
        </div>
        <div class="drone-details">
          <div class="drone-detail">
            <span class="drone-detail-label">Battery</span>
            <span class="drone-detail-value">${drone.battery}%</span>
          </div>
          <div class="drone-detail">
            <span class="drone-detail-label">Flight Hours</span>
            <span class="drone-detail-value">${drone.flightHours}</span>
          </div>
          <div class="drone-detail">
            <span class="drone-detail-label">Last Maintenance</span>
            <span class="drone-detail-value">${drone.lastMaintenance}</span>
          </div>
          <div class="drone-detail">
            <span class="drone-detail-label">Location</span>
            <span class="drone-detail-value">${drone.location}</span>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function populateAIDetection() {
  const detectionFeed = document.getElementById('detectionFeed');
  if (detectionFeed) {
    detectionFeed.innerHTML = applicationData.detections.map(detection => `
      <div class="detection-item ${detection.alert ? 'alert' : ''}">
        <div class="detection-info">
          <div class="detection-class">${detection.class}</div>
          <div class="detection-meta">
            ${detection.location} • ${detection.timestamp} • 
            ${detection.temperature ? `${detection.temperature}°F` : ''}
          </div>
        </div>
        <div class="detection-metrics">
          <div class="detection-confidence">${(detection.confidence * 100).toFixed(0)}%</div>
          ${detection.verified ? '<i class="fas fa-check-circle" style="color: var(--color-success);"></i>' : '<i class="fas fa-clock" style="color: var(--color-warning);"></i>'}
        </div>
      </div>
    `).join('');
  }
}

function populateWeather() {
  const currentWeather = document.getElementById('currentWeather');
  if (currentWeather) {
    const weather = applicationData.weather;
    
    currentWeather.innerHTML = `
      <div class="weather-main">
        <div class="weather-icon">
          <i class="fas fa-cloud-sun"></i>
        </div>
        <div>
          <div class="weather-temp">${weather.temperature}°F</div>
          <div class="weather-condition">${weather.condition}</div>
          <div class="weather-location">${weather.location}</div>
        </div>
      </div>
      <div class="weather-details">
        <div class="weather-item">
          <span>Wind Speed</span>
          <span>${weather.windSpeed} mph</span>
        </div>
        <div class="weather-item">
          <span>Wind Direction</span>
          <span>${weather.windDirection}</span>
        </div>
        <div class="weather-item">
          <span>Humidity</span>
          <span>${weather.humidity}%</span>
        </div>
        <div class="weather-item">
          <span>Visibility</span>
          <span>${weather.visibility} mi</span>
        </div>
      </div>
    `;
  }

  const flightConditions = document.getElementById('flightConditions');
  if (flightConditions) {
    const weather = applicationData.weather;
    const conditions = [
      { label: 'Flight Category', value: weather.flightCategory, status: 'success' },
      { label: 'Wind Conditions', value: weather.windSpeed < 15 ? 'Good' : 'Marginal', status: weather.windSpeed < 15 ? 'success' : 'warning' },
      { label: 'Visibility', value: weather.visibility >= 3 ? 'Good' : 'Poor', status: weather.visibility >= 3 ? 'success' : 'error' },
      { label: 'Overall', value: 'Go for Flight', status: 'success' }
    ];

    flightConditions.innerHTML = conditions.map(condition => `
      <div class="condition-item">
        <span class="condition-label">${condition.label}</span>
        <span class="condition-value status status--${condition.status}">${condition.value}</span>
      </div>
    `).join('');
  }
}

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
        <div class="agent-metrics">
          <div class="agent-metric">
            <span>Response Time</span>
            <span>${agent.responseTime}ms</span>
          </div>
          <div class="agent-metric">
            <span>Success Rate</span>
            <span>${agent.successRate}%</span>
          </div>
        </div>
        <div class="agent-current-task">
          <strong>Current Task:</strong><br>
          ${agent.currentTask}
        </div>
      </div>
    `).join('');
  }
}

function populateBlockchain() {
  const blockchainFeed = document.getElementById('blockchainFeed');
  if (blockchainFeed) {
    blockchainFeed.innerHTML = applicationData.blockchain.map(block => `
      <div class="blockchain-item">
        <div class="blockchain-info">
          <div class="blockchain-type">${block.type}</div>
          <div class="blockchain-hash">${block.hash}</div>
          <div class="blockchain-timestamp">${block.timestamp}</div>
        </div>
        <div class="verification-status">
          <i class="fas fa-check-circle"></i>
          <span>Verified</span>
        </div>
      </div>
    `).join('');
  }
}

function populateNotifications() {
  const notificationList = document.getElementById('notificationList');
  if (notificationList) {
    notificationList.innerHTML = applicationData.notifications.map(notification => `
      <div class="notification-item ${notification.priority.toLowerCase()}">
        <div class="notification-header">
          <span class="notification-type">${notification.type}</span>
          <span class="notification-time">${notification.timestamp}</span>
        </div>
        <div class="notification-message">${notification.message}</div>
      </div>
    `).join('');
  }
}

function initializeCharts() {
  // Activity Chart
  const ctx = document.getElementById('activityChart');
  if (ctx) {
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
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      }
    });
  }
}

function startRealTimeUpdates() {
  // Update telemetry every 2 seconds
  setInterval(() => {
    updateTelemetry();
  }, 2000);

  // Update battery levels every 30 seconds
  setInterval(() => {
    updateBatteryLevels();
  }, 30000);

  // Add new detections occasionally
  setInterval(() => {
    addRandomDetection();
  }, 45000);
}

function updateTelemetry() {
  if (currentPage === 'flight-ops') {
    // Simulate slight changes in telemetry data
    const activeFlight = applicationData.activeFlights.find(f => f.status === 'In Flight');
    if (activeFlight) {
      // Small random changes
      activeFlight.altitude += Math.random() * 4 - 2;
      activeFlight.latitude += (Math.random() - 0.5) * 0.0001;
      activeFlight.longitude += (Math.random() - 0.5) * 0.0001;
      
      // Update display
      populateFlightOps();
    }
  }
}

function updateBatteryLevels() {
  // Simulate battery drain
  applicationData.activeFlights.forEach(flight => {
    if (flight.status === 'In Flight' && flight.battery > 20) {
      flight.battery = Math.max(20, flight.battery - Math.random() * 3);
    }
  });

  applicationData.drones.forEach(drone => {
    if (drone.status === 'In Flight' && drone.battery > 20) {
      drone.battery = Math.max(20, drone.battery - Math.random() * 3);
    } else if (drone.status === 'Charging' && drone.battery < 100) {
      drone.battery = Math.min(100, drone.battery + Math.random() * 5);
    }
  });

  // Update displays
  if (currentPage === 'dashboard') {
    populateDashboard();
  } else if (currentPage === 'drone-fleet') {
    populateDroneFleet();
  }
}

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

  // Add to beginning of array
  applicationData.detections.unshift(newDetection);
  
  // Keep only last 10 detections
  if (applicationData.detections.length > 10) {
    applicationData.detections = applicationData.detections.slice(0, 10);
  }

  // Update displays
  if (currentPage === 'dashboard') {
    populateDashboard();
  } else if (currentPage === 'ai-detection') {
    populateAIDetection();
  }

  // Add notification if it's an alert
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
    
    // Animate notification count
    const notificationCount = document.querySelector('.notification-count');
    if (notificationCount) {
      notificationCount.textContent = applicationData.notifications.length;
      notificationCount.style.animation = 'none';
      setTimeout(() => {
        notificationCount.style.animation = 'pulse 0.5s ease-in-out';
      }, 10);
    }
  }
}

// Utility functions
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m ${secs}s`;
  }
}

function getBatteryClass(battery) {
  if (battery < 20) return 'critical';
  if (battery < 50) return 'warning';
  return 'good';
}

function getStatusClass(status) {
  const statusMap = {
    'In Flight': 'success',
    'Available': 'info',
    'Maintenance': 'error',
    'Charging': 'warning',
    'Active': 'success',
    'Standby': 'warning',
    'Pre-Flight': 'warning'
  };
  
  return statusMap[status] || 'info';
}

// Export functions for potential external use
window.DiAero = {
  navigateToPage,
  toggleSidebar,
  toggleTheme,
  applicationData
};