console.log('global scope:', this);

function thisCheck() {
    // 'use strict'
    console.log('inside of thisCheck', this);
}

thisCheck();

const instanceOfThisCheck = new thisCheck();

const dog = {
    name: 'Trotsky',
    breed: "Bernedoodle",
    colors: ['black', 'grey'],
    thisCheck
}

dog.thisCheck();

document.querySelector("button").addEventListener('click', function(e) {
    console.log(this, e.target)
})

class Dog {
    constructor(name, breed, sound, ...colors) {
        this.name = name
        this.breed = breed
        this.sound = sound
        this.colors = [...colors]
    }

    speak(speakCount, speakSpeed) {
        setTimeout(() => {
            if (speakCount >= 0) {
                console.log(this)
                const newSpeak = document.createElement('h1');
                newSpeak.innerText =  `${this.name} the ${this.breed} says: ${this.sound.toUpperCase()}!! 🐩`;
                document.querySelector("body").append(newSpeak);
                speakCount--
                this.speak(speakCount, speakSpeed)
            }
        }, speakSpeed)
    }
}

const leopold = new Dog("Leopold", "Newphiepoo", "boof", "black", "white")
// leopold.speak(10, 500);

const cat = {
    name: "Chamomile",
    breed: "Russian Blue",
    knownFor: "excessive drooling while making biscuits"
}

thisCheck.apply(cat)

// A function that introduces the cat, using 'this' to refer to the cat object
function introduceCat(situation) {
    console.log(`This is ${this.name}, a beautiful ${this.breed} known for ${this.knownFor} especially when ${situation}.`);
}

// Using the 'call' method to invoke the function immediately, setting 'this' to the cat object,
introduceCat.call(cat, 'Extra Happy');

// Using the 'apply' method, similar to 'call'
introduceCat.apply(cat, ['In love mode']);

// Using the 'bind' method to create a new function with 'this' permanently set to the cat object
const introduceBoundCat = introduceCat.bind(cat);
// The function is not invoked immediately
introduceBoundCat('particularly excited');
