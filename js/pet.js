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
  BAT: 'bat'
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

// Speech phrases for different moods
const SpeechPhrases = {
  ecstatic: [
    'I\'m having the best day ever!',
    'This is amazing!',
    'I couldn\'t be happier!',
    'Best. Day. Ever!',
    'You\'re the greatest!'
  ],
  happy: [
    'I\'m so happy right now!',
    'What a wonderful day!',
    'You\'re awesome!',
    'Life is good!',
    'I\'m feeling great!'
  ],
  content: [
    'This is nice.',
    'I\'m pretty content.',
    'Things are going well.',
    'I\'m feeling good.',
    'No complaints here.'
  ],
  neutral: [
    'Just another day.',
    'I\'m okay, I guess.',
    'Nothing special happening.',
    'Meh, I\'m fine.',
    'Just hanging out.'
  ],
  bored: [
    'I\'m getting a bit bored...',
    'Is there anything to do?',
    'Kinda dull around here.',
    'I could use some attention.',
    'Not much going on.'
  ],
  sad: [
    'I\'m feeling a bit sad.',
    'Could use some cheering up.',
    'Having a rough day.',
    'I miss you.',
    'I could really use a snack.'
  ],
  miserable: [
    'I\'m really hungry...',
    'Please don\'t forget about me!',
    'I need some attention!',
    'I\'m not feeling well at all.',
    'Help! I need food!'
  ]
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

  // TODO: Increase mood by 20 points but cap at 100
  this.moodLevel = Math.min(100, this.moodLevel + 20);

  // TODO: Update the last fed time
  this.lastFed = new Date();

  // TODO: Update the pet's state
  this.updateState();

  // TODO: Make the pet say something about being fed
  this.speak('Yum! That was delicious!');

  // TODO: Return a message about the feeding
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

  // TODO: Calculate time since last fed
  const now = new Date();
  const timeSinceLastFed = now - this.lastFed; // Time in milliseconds

  // TODO: Define hunger threshold (1 minute in milliseconds)
  const hungerTime = 60 * 1000; // 1 minute in milliseconds

  // TODO: Return true if time since last fed is greater than hunger threshold
  return timeSinceLastFed > hungerTime;
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

  // TODO: Decrease mood if hungry
  if (this.isHungry()) {
    this.moodLevel = Math.max(0, this.moodLevel - 2);
  }

  // TODO: Determine state based on mood level ranges
  if (this.moodLevel >= 90) {
    this.state = States.ECSTATIC;
  } else if (this.moodLevel >= 75) {
    this.state = States.HAPPY;
  } else if (this.moodLevel >= 60) {
    this.state = States.CONTENT;
  } else if (this.moodLevel >= 45) {
    this.state = States.NEUTRAL;
  } else if (this.moodLevel >= 30) {
    this.state = States.BORED;
  } else if (this.moodLevel >= 15) {
    this.state = States.SAD;
  } else {
    this.state = States.MISERABLE;
  }

  // TODO: Occasionally make the pet speak a random thought
  if (Math.random() < 0.15 && !this.isSpeaking) { // 15% chance to speak when mood updates
    this.speakRandomThought();
  }

  // TODO: Update the pet's appearance to match the new state
  this.updateAppearance();

  // TODO: Return the current state
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

  // TODO: Clear any existing speech timeout
  if (this.speechTimeout) {
    clearTimeout(this.speechTimeout);
  }

  // TODO: Update speech-related properties
  this.isSpeaking = true;
  this.speechText = text;

  // TODO: Set a timeout to clear the speech bubble after 4 seconds
  this.speechTimeout = setTimeout(() => {
    this.isSpeaking = false;
    this.speechText = '';
    this.updateAppearance();
  }, 4000);

  // TODO: Update appearance to show the speech bubble
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
  // Mappings for different pet types and moods
  const petArt = {
    [PetTypes.CAT]: {
      [States.ECSTATIC]: '=^w^=',
      [States.HAPPY]: '=^.^=',
      [States.CONTENT]: '=0.0=',
      [States.NEUTRAL]: '=o.o=',
      [States.BORED]: '=-.-=',
      [States.SAD]: '=>.<=',
      [States.MISERABLE]: '=>A<='
      // ...other states
    },
    // ...other pet types
    [PetTypes.COW]: {
      [States.ECSTATIC]: '*^o^*',
      [States.HAPPY]: '*^w^*',
      [States.CONTENT]: '*0o0*',
      [States.NEUTRAL]: '*o.o*',
      [States.BORED]: '*-.-*',
      [States.SAD]: '*>.<*',
      [States.MISERABLE]: '*>A<*'
    },
    [PetTypes.DOG]: {
      [States.ECSTATIC]: '0^w^0',
      [States.HAPPY]: '0^.^0',
      [States.CONTENT]: '00.00',
      [States.NEUTRAL]: '0o.o0',
      [States.BORED]: '0-.-0',
      [States.SAD]: '0>.<0',
      [States.MISERABLE]: '0>A<0'
    },
    [PetTypes.BAT]: {
      [States.ECSTATIC]: '^0O0^',
      [States.HAPPY]: '^0U0^',
      [States.CONTENT]: '^0u0^',
      [States.NEUTRAL]: '^0.0^',
      [States.BORED]: '^o_o^',
      [States.SAD]: '^o,_,o^',
      [States.MISERABLE]: '^>,A,<^'
    }
  };

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
