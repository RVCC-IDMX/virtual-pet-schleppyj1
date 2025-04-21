/**
 * app.js
 *
 * Main application file that handles UI interactions and updates.
 * Import your Pet constructor and related constants from pet.js
 */

// TODO: Import the Pet constructor and related constants
import { Pet, PetTypes, States } from './pet.js';

// Application state variables
let currentPet = null;
const updateInterval = null;

/**
 * Initialize the application
 *
 * TODO: Implement this function to:
 * - Select and store DOM elements
 * - Populate the pet selector dropdown
 * - Set up event listeners
 * - Show the pet creation UI
 */
function initApp() {
  // TODO: Select DOM elements

  // DOM elements
  const elements = {
    petDisplay: document.getElementById('pet-display'),
    statusDisplay: document.getElementById('status-display'),
    petSelector: document.getElementById('pet-selector'),
    nameInput: document.getElementById('pet-name'),
    createButton: document.getElementById('create-pet'),
    feedButton: document.getElementById('feed-pet'),
    resetButton: document.getElementById('reset-pet'),
    infoDisplay: document.getElementById('info-display'),
    moodBar: document.getElementById('mood-bar')
  };

  // TODO: Populate pet selector dropdown
  populatePetSelector();

  // TODO: Set up event listeners
  setupEventListeners();

  // TODO: Show the pet creation UI
  showCreationUI();
}

/**
 * Populate the pet selector dropdown
 *
 * TODO: Implement this function to:
 * - Add an option for each pet type
 * - Set a default selected type
 */
function populatePetSelector() {
  // TODO: Implement pet selector population

  // Get the select element
  const selector = elements.petSelector;
  if (!selector) {
    return;
  }

  // Clear existing options
  selector.innerHTML = '';

  // Add option for each pet type
  Object.entries(PetTypes).forEach(([key, value]) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = key.charAt(0) + key.slice(1).toLowerCase();
    selector.appendChild(option);
  });

  // Default to cow
  selector.value = PetTypes.COW;
}

/**
 * Set up event listeners for buttons and interactions
 *
 * TODO: Implement this function to:
 * - Add event listeners for the create, feed, and reset buttons
 */
function setupEventListeners() {
  // TODO: Implement event listeners setup

  // Create new pet
  elements.createButton?.addEventListener('click', createNewPet);

  // Feed the pet
  elements.feedButton?.addEventListener('click', feedPet);

  // Reset pet
  elements.resetButton?.addEventListener('click', resetPet);
}

/**
 * Create a new pet based on form selections
 *
 * TODO: Implement this function to:
 * - Get the selected pet type and name
 * - Create a new Pet instance
 * - Update the UI to show the pet
 * - Start the update cycle
 */
function createNewPet() {
  // TODO: Implement pet creation

  // TODO: Get the selected pet type and name
  const type = elements.petSelector?.value || PetTypes.COW;
  let name = elements.nameInput?.value.trim() || '';

  // TODO: Default name if none provided
  if (!name) {
    name = type.charAt(0).toUpperCase() + type.slice(1);
  }

  // TODO: Create the pet
  currentPet = new Pet(type, name);

  // TODO: Update UI
  hideCreationUI();
  updatePetDisplay();
  startUpdateCycle();
}

/**
 * Hide the pet creation UI and show the pet interaction UI
 */
function hideCreationUI() {
  // TODO: Implement UI transition
  document.getElementById('pet-creation')?.classList.add('hidden');
  document.getElementById('pet-interaction')?.classList.remove('hidden');
}

/**
 * Show the pet creation UI and hide the pet interaction UI
 */
function showCreationUI() {
  // TODO: Implement UI transition

  document.getElementById('pet-creation')?.classList.remove('hidden');
  document.getElementById('pet-interaction')?.classList.add('hidden');
}

/**
 * Update the pet display and status elements
 *
 * TODO: Implement this function to:
 * - Update the pet's visual representation
 * - Update the status message
 * - Update the mood indicator
 * - Update the information display
 */
function updatePetDisplay() {
  // TODO: Implement display updates

  if (!currentPet) {
    return;
  }

  // TODO: Update pet display with appearance and state-based CSS
  if (elements.petDisplay) {
    elements.petDisplay.textContent = currentPet.appearance;
    elements.petDisplay.className = `pet-display pet-${currentPet.state}`;
  }

  // TODO: Update status display with pet's status message
  if (elements.statusDisplay) {
    elements.statusDisplay.textContent = currentPet.getStatusMessage();
  }

  // TODO: Update mood bar and info display
  updateMoodBar();
  updateInfoDisplay();
}

/**
 * Update the mood level display bar
 *
 * TODO: Implement this function to:
 * - Set the width of the mood bar based on the pet's mood level
 * - Change the color based on the mood level
 */
function updateMoodBar() {
  // TODO: Implement mood bar updates
  if (!elements.moodBar || !currentPet) {
    return;
  }

  // Set the width based on mood level
  elements.moodBar.style.width = `${currentPet.moodLevel}%`;

  // Set color based on mood level
  if (currentPet.moodLevel >= 75) {
    elements.moodBar.style.backgroundColor = '#4caf50'; // Green
  } else if (currentPet.moodLevel >= 45) {
    elements.moodBar.style.backgroundColor = '#ff9800'; // Orange
  } else {
    elements.moodBar.style.backgroundColor = '#f44336'; // Red
  }
}

/**
 * Update the information display panel
 *
 * TODO: Implement this function to:
 * - Show the pet's name, type, state, etc.
 * - Display the mood level bar
 * - Show timestamps for creation and last feeding
 */
function updateInfoDisplay() {
  // TODO: Implement info display updates
  if (!elements.infoDisplay || !currentPet) {
    return;
  }

  const lastFedTime = currentPet.lastFed.toLocaleTimeString();
  const createdTime = currentPet.created.toLocaleDateString();

  elements.infoDisplay.innerHTML = `


      Name:
      ${currentPet.name}




      Type:
      ${currentPet.type}




      Mood:
      ${currentPet.state} (${currentPet.moodLevel})




      Mood Level:












      Last Fed:
      ${lastFedTime}




      Created:
      ${createdTime}


  `;

  // Get the mood bar element after creating it
  elements.moodBar = document.getElementById('mood-bar');
  updateMoodBar();
}

/**
 * Feed the current pet
 *
 * TODO: Implement this function to:
 * - Call the pet's feed method
 * - Update the display with the new state
 */
function feedPet() {
  // TODO: Implement feeding interaction
  if (!currentPet) {
    return;
  }

  // Feed the pet
  const message = currentPet.feed();

  // Show feedback
  if (elements.statusDisplay) {
    elements.statusDisplay.textContent = message;
  }

  // Update the display
  updatePetDisplay();
}

/**
 * Reset the pet simulator
 *
 * TODO: Implement this function to:
 * - Clear the update interval
 * - Reset the current pet
 * - Clear the displays
 * - Show the creation UI
 */
function resetPet() {
  // TODO: Implement reset functionality
}

/**
 * Start the regular update cycle
 *
 * TODO: Implement this function to:
 * - Clear any existing update interval
 * - Set up a new interval that:
 *   - Updates the pet's state
 *   - Updates the display
 */
function startUpdateCycle() {
  // TODO: Implement update cycle

  // TODO: Clear any existing interval
  if (updateInterval) {
    clearInterval(updateInterval);
  }

  // TODO: Set up an interval to update the pet state and display every second
  updateInterval = setInterval(() => {
    if (currentPet) {
      currentPet.updateState();
      updatePetDisplay();
    }
  }, 1000); // 1,000 ms = 1 second
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
