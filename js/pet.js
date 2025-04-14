/**
 * pet.js
 *
 * This file should contain your Pet constructor function and prototype methods.
 * Export your Pet constructor and any necessary constants to be used in app.js.
 */

// TODO: Create a PetTypes object with different pet type options
// Example: const PetTypes = { CAT: 'cat', DOG: 'dog', ... }

// TODO: Create a States object with different mood states
// Example: const States = { HAPPY: 'happy', SAD: 'sad', ... }

/**
 * Pet constructor function
 * 
 * TODO: Implement this constructor function that creates a virtual pet
 * Parameters should include type and name
 * Initialize properties for tracking mood, state, and timestamps
 */
function Pet() {
  // TODO: Initialize basic properties (name, type)
  
  // TODO: Initialize state properties (mood level, state)
  
  // TODO: Initialize timestamps (created, last fed)
  
  // TODO: Initialize speech-related properties
  
  // TODO: Call updateAppearance() to set initial appearance
}

/**
 * Feed the pet
 * 
 * TODO: Implement this method to feed the pet, which should:
 * - Increase the pet's mood level
 * - Update the last fed timestamp
 * - Update the pet's state
 * - Return a message about the feeding
 */
Pet.prototype.feed = function() {
  // TODO: Implement feed functionality
};

/**
 * Check if the pet is hungry
 * 
 * TODO: Implement this method to determine if the pet is hungry based on
 * how much time has passed since it was last fed
 */
Pet.prototype.isHungry = function() {
  // TODO: Implement hunger check
};

/**
 * Update the pet's state based on mood level
 * 
 * TODO: Implement this method to:
 * - Update the pet's mood based on time passed
 * - Set the appropriate state based on mood level
 * - Occasionally trigger random thoughts
 * - Update the pet's appearance
 */
Pet.prototype.updateState = function() {
  // TODO: Implement state update
};

/**
 * Make the pet speak a random thought based on its mood
 * 
 * TODO: Implement this method to have the pet express a random thought
 * appropriate to its current mood
 */
Pet.prototype.speakRandomThought = function() {
  // TODO: Implement random thought generation
};

/**
 * Make the pet say something
 * 
 * TODO: Implement this method to display a speech bubble with text
 * and clear it after a few seconds
 */
Pet.prototype.speak = function(text) {
  // TODO: Implement speech functionality
};

/**
 * Get a status message based on the pet's current state
 * 
 * TODO: Implement this method to return an appropriate message
 * describing the pet's current mood state
 */
Pet.prototype.getStatusMessage = function() {
  // TODO: Implement status message generation
};

/**
 * Update the pet's appearance based on its type and state
 * 
 * TODO: Implement this method to set the pet's appearance property
 * based on its current type and state
 * Include speech bubble if the pet is speaking
 */
Pet.prototype.updateAppearance = function() {
  // TODO: Implement appearance updates
};

// TODO: Export the Pet constructor and any necessary constants
// export { Pet, PetTypes, States };
