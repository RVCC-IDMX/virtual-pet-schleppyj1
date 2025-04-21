/**
 * pet.js
 *
 * This file should contain your Pet constructor function and prototype methods.
 * Export your Pet constructor and any necessary constants to be used in app.js.
 */

// TODO: Create a PetTypes object with different pet type options
// Example: const PetTypes = { CAT: 'cat', DOG: 'dog', ... }
const PetTypes = {
  COW: 'cow',
  CAT: 'cat',
  DOG: 'dog',
};

// TODO: Create a States object with different mood states
// Example: const States = { HAPPY: 'happy', SAD: 'sad', ... }
const States = {
  ECSTATIC: 'ecstatic',
  HAPPY: 'happy',
  CONTENT: 'content',
  NEUTRAL: 'neutral',
  BORED: 'bored',
  SAD: 'sad',
  MISERABLE: 'miserable'
};

/**
 * Pet constructor function
 *
 * TODO: Implement this constructor function that creates a virtual pet
 * @param {string} type - The type of pet.
 * @param {string} name - Name of the pet.
 * Initialize properties for tracking mood, state, and timestamps
 */
function Pet(type, name) {
  // TODO: Initialize basic properties (name, type)
  this.type = type || PetTypes.COW;
  this.name = name || 'Pet';

  // TODO: Initialize state properties (mood level, state)
  this.moodLevel = 80;
  this.state = States.HAPPY;
  this.lastFed = new Date();
  this.created = new Date();

  // TODO: Initialize speech-related properties
  this.isSpeaking = false;
  this.speechText = '';
  this.speechTimeout = null;

  // TODO: Call updateAppearance() to set initial appearance
  this.updateAppearance();
}

/**
 * Feed the pet
 *
 * TODO: Implement this method to feed the pet, which should:
 * - Increase the pet's mood level
 * - Update the last fed timestamp
 * - Update the pet's state
 * - Return a message about the feeding
 * @returns {string} - A message about feeding.
 */
Pet.prototype.feed = function () {
  // TODO: Implement feed functionality

  // Increases mood by 20 points, but caps at 100.
  this.moodLevel = Math.min(100, this.moodLevel, + 20);

  // Update the last time pet was fed.
  this.lastFed = new Date();

  // Update the pet's state.
  this.updateState();

  // Make the pet say something about being fed.
  this.speak('Yum! That was delicious!');

  // Returns a message about feeding.
  return `${this.name} has been fed and is ${this.state}!`;
};

/**
 * Check if the pet is hungry
 *
 * TODO: Implement this method to determine if the pet is hungry based on
 * how much time has passed since it was last fed
 * @returns {boolean} True if the pet is hungry.
 */
Pet.prototype.isHungry = function () {
  // TODO: Implement hunger check

  // Calculate time since the pet was last fed.
  const now = new Date();
  const timeSinceLastFed = now - this.lastFed;

  // Define the hunger threshold.
  const hungerTime = 60 * 1000;

  // Returns true if time since last fed is greater than the hunger threshold.
  if (timeSinceLastFed > hungerTime) {
    return true;
  }
};

/**
 * Update the pet's state based on mood level
 *
 * TODO: Implement this method to:
 * - Update the pet's mood based on time passed
 * - Set the appropriate state based on mood level
 * - Occasionally trigger random thoughts
 * - Update the pet's appearance
 * @returns {string} - The new state.
 */
Pet.prototype.updateState = function () {
  // TODO: Implement state update

  // Decreases mood if hungry
  if (this.hungry()) {
    this.moodLevel = Math.max(0, this.moodLevel - 2);
  }

  // Determine its mood state based on mood level ranges.
  if (this.mood >= 90) {
    this.state = States.ECSTATIC;
  } else if (this.mood >= 75) {
    this.state = States.HAPPY;
  } else if (this.mood >= 60) {
    this.state = States.CONTENT;
  } else if (this.mood >= 45) {
    this.state = States.NEUTRAL;
  } else if (this.mood >= 30) {
    this.state = States.BORED;
  } else if (this.mood >= 15) {
    this.state = States.SAD;
  } else {
    this.state = States.MISERABLE;
  }

  // Occasionally make the pet speak a random thought.
  if (Math.random() < 0.15 && !this.isSpeaking) {
    this.speakingRandomThought();
  }

  // Update pets appearance to match the new state.
  this.updateAppearance();

  // Returns the current state.
  return this.state;
};

/**
 * Make the pet speak a random thought based on its mood
 *
 * TODO: Implement this method to have the pet express a random thought
 * appropriate to its current mood
 */
Pet.prototype.speakRandomThought = function () {
  // TODO: Implement random thought generation

  //Implement phrases for current mood.
  const phrases = SpeechPhrases[this.state] || SpeechPhrases.neutral;

  // Pick a random phrase.
  const randomIndex = Math.floor(Math.random() * phrases.length);
  const phrase = phrases[randomIndex];

  // Make the pet speak the random phrase.
  this.speak(phrase);
};

/**
 * Make the pet say something
 *@param {string} text - The text to say.
 * TODO: Implement this method to display a speech bubble with text
 * and clear it after a few seconds
 */
Pet.prototype.speak = function (text) {
  // TODO: Implement speech functionality

  // Clear any existing speech timeout.
  if (this.speechTimeout) {
    clearTimeout(this.speechTimeout);
  }

  // Update speech related properties.
  this.isSpeaking = true;
  this.speechText = text;

  // Set timeout to clear speech bubble after four seconds.
  this.speechTimeout = setTimeout(() => {
    this.isSpeaking = false;
    this.speechText = '';
    this.updateAppearance();
  }, 4000);

  // Update appearance to show the speech bubble.
  this.updateAppearance();
};

/**
 * Get a status message based on the pet's current state
 *
 * TODO: Implement this method to return an appropriate message
 * describing the pet's current mood state
 * @returns {string} Status Message.
 */
Pet.prototype.getStatusMessage = function () {
  // TODO: Implement status message generation

  // Return an appropriate message based on the pet's state.
  switch (this.state) {
    case States.ECSTATIC:
      return `${this.name} is absolutely ecstatic!`;
    case States.HAPPY:
      return `${this.name} is very happy!`;
    case States.CONTENT:
      return `${this.name} is content.`;
    case States.NEUTRAL:
      return `${this.name} is doing okay.`;
    case States.BORED:
      return `${this.name} seems a bit bored.`;
    case States.SAD:
      return `${this.name} is feeling sad.`;
    case States.MISERABLE:
      return `${this.name} is miserable and very hungry!`;
    default:
      return `${this.name} is here.`;
  }
};

/**
 * Update the pet's appearance based on its type and state
 *
 * TODO: Implement this method to set the pet's appearance property
 * based on its current type and state
 * Include speech bubble if the pet is speaking
 */
Pet.prototype.updateAppearance = function () {
  // TODO: Implement appearance updates

  // TODO: Use the petArt object to get the right art for this pet type and state
  const typeArt = petArt[this.type] || petArt[PetTypes.COW];
  const art = typeArt[this.state] || typeArt[States.NEUTRAL];

  // TODO: If the pet is speaking, create a speech bubble
  if (this.isSpeaking && this.speechText) {
    const bubbleWidth = Math.min(40, Math.max(this.speechText.length + 4, 10));
    const topBubble = ' ' + '_'.repeat(bubbleWidth);
    const bottomBubble = ' ' + '-'.repeat(bubbleWidth);
    const textLine = '| ' + this.speechText.padEnd(bubbleWidth - 2, ' ') + ' |';

    this.appearance = `${topBubble}\n${textLine}\n${bottomBubble}\n \\\n  ${art}`;
  } else {
    // TODO: Otherwise, just set the pet art
    this.appearance = art;
  }
};

// TODO: Export the Pet constructor and any necessary constants
export { Pet, PetTypes, States };
