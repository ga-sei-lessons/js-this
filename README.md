<img src="https://i.imgur.com/oY0P1r0.png" width="500">

# The What, Why & How<br>of `this`

## Learning Objectives

| Students will be able to:|
|---|
| Describe **what** `this` is |
| Explain **why** `this` is necessary |
| Determine **how** the value of `this` is set |

## Road Map

1. What is `this`?
2. Why `this` is Necessary?
3. Determining How the Value of `this` is Set
4. The Binding of `this` Within _Arrow Functions_
5. Good Advice
6. Essential Questions
7. Further Study

## 1. What is `this`?

**`this` is a keyword in JavaScript** available for use inside of functions/methods.

<details>
<summary>
❓ One more time... When is a function considered to be a method?
</summary>
<hr>

**When the function is "attached" or called on an object.** In other words, there's a dot to the left of it.

<hr>
</details>

The `this` keyword also exists in the **global** scope, however, its use within the global scope is unnecessary since it equals the `window` object.

The `this` keyword is a part of a function's **execution context**, which includes the code and everything that aids in its execution.

`this` has its value set by the JS engine automatically when a function is invoked.  This setting of a value is also known as "binding".

Although JavaScript automatically sets the value of `this` when a function/method is invoked, there are methods available on every non-arrow function object that allow the programmer to **explicitly** set the value of `this` to what the programmer wants it to be.

However, even though we _can_ change the value of `this`, doing so is not that common, so for now, we'll focus on learning the "rules" that JS uses to **automatically** set `this`.

Understanding `this` is important as a JavaScript developer and as a job-seeker because it's likely you'll be asked about `this` during an interview for a job that requires JS.

## 2. Why `this` is Necessary?

The mechanism provided by `this` is necessary in all object oriented programming languages to:

1. **Provide access to an object's properties & methods** from other methods within that object;<br>and...
2. **Implement code reuse**

#### Example - Provide access to an object's properties & methods

The example below demonstrates how `this` provides a way for methods to access the other properties & methods within that object:

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  intro() {
    return `Hello, I'm ${this.name}!`;
  }
}

const person = new Person('Katie');
person.intro(); //-> Hello, I'm Katie!
```

#### Example 2 - Implement code reuse

During the JS Classes lesson we learned about _prototype methods_, which are defined once, but able to be called by every instance (object) of that class.

This efficient code reuse is made possible by `this` and the [prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

Imagine a poorly written class that constructs sprites for a game:

```js
class Sprite {
  constructor(color, pos) {
    this.color = color;
    this.pos = pos;
    this.move = function(direction) {...};
    this.rotate = function(direction) {...};
    this.accelerate = function() {...};
    this.checkCollision = function() {...};
  }
}
```

In the app, there may be tens, hundreds, even thousands of Sprite instances; and if so, as written above, each sprite would have it's own copy of every method - the code for the functions will be duplicated over and over again...
	
However, when we code those methods properly as shown below, only a single instance of each method exists in memory:

```js
class Sprite {
  constructor(color, pos) {
    this.color = color;
    this.pos = pos;
  }
	
  move(direction) {
    switch (direction) {
      case 'R':
        this.pos.x < 999 ? this.pos.x++ : this.pos.x = 0;
        break;
      case 'D':
        //...additional code
    }
  }
  //...other methods
}
```

Now, thanks to `this`, any number of Sprite instances can call a single `move`, etc. method.

Without `this`, we could not implement this efficient code reuse.

### ❓ Review Questions (1 min)

A few review questions before looking at **how** the value of `this` is set:

<details>
<summary>
(1) The <code>this</code> keyword is accessible within every ____________?
</summary>
<hr>

**function**<br>
Note that `this` is also available in global scope but it's more useful within functions.

<hr>
</details>

<details>
<summary>
(2) What is one of the reasons why we need <code>this</code> in JavaScript?
</summary>
<hr>

**To provide access to an object's properties & methods** from another method within that object.

<hr>
</details>

<details>
<summary>
(3) What's the other reason?
</summary>
<hr>

**Implement code reuse** thanks to a single copy of a method being able to be called by any number of objects. 

<hr>
</details>

## 3. Determining How the Value of `this` is Set

#### Important Key Point Regarding HOW `this` is Set

> 👀 **KEY POINT**: In non-arrow functions (discussed later), the value of `this` is determined by **how a function/method is called**, not on how it is written. This "runtime binding" means that the same function when ran could have `this` set differently!

### Automatic Binding of `this`

Since the value of `this` is **determined by _how_ we call a function**, we'll take a look at the following scenarios of how functions are called:

- As Non-Methods (not attached to an object)
- As Methods
- As Classes & Constructor Functions
- As DOM Event Handlers
- As Generic Callback Functions

Let's look at examples for each of these five scenarios:

#### As Non-Methods (not attached to an object)

When called as a basic, non-method function (not attached to an object):

```js
function thisCheck() {
  console.log(this);
}
thisCheck();  //-> window {...}
```
Or in the case when **strict mode** is set:

```js
function thisCheck() {
  'use strict';
  console.log(this);
}
thisCheck();  //-> undefined
```

> See the Further Study section regarding **strict mode**.

#### As Methods

Now let's call this **same function** as a method (assigned to a property of an object):

```js
function thisCheck() {
  console.log(this);
}

const ninja = {
  name: 'JS Ninja',
  thisCheck
};
  
// call thisCheck() as a method
ninja.thisCheck();  //-> {name: "JS Ninja", thisCheck: f}
```


👀 This is an important rule to remember...<br>
**The object left of the dot is what `this` is bound to!**

#### As Classes & Constructor Functions
	
As seen the JS Classes lesson...

`this` in a class's `constructor` method is bound to the new shiny object that's being created and is implicitly returned.

See the `constructor` method of the `Sprite` class above for an example.

#### As DOM Event Handlers

Within an event handler callback function, JS will bind `this` to the element listening to the event.

For example:

```js
const board = document.getElementById('board');
board.addEventListener('click', function() {
  console.log(this);
});
//->  <main id="board">...
```

#### As Generic Callback Functions

You just learned that when a function is called as a non-method, `this` is bound to `window` or is `undefined` in _strict mode_.

Callback functions are called as non-methods, so guess what `this` will be set to in callback function for the `setTimeout`:

```js
class Ninja {
  constructor(name) {
    this.ninjaName = name;
  }

  chop(numChops) {
    setTimeout(function() {
      // Won't work because...
      // 'this' will set to the window object
      if (numChops > 0) {
        console.log(`${this.ninjaName} chop!`);
        // Recursion coming up!
        this.chop(--numChops);
      }
    }, 500);
  }
}
  
const ninja = new Ninja('JS Ninja');
ninja.chop(2);  //->  undefined chop! / then an error
```

The code didn't work as expected because `this` is not set to the `ninja` object therefore code like `this.ninjaName` returns `undefined`.

Instead, when the callback executes, it's being called as a non-method, basic function, thus `this` is bound to the `window` (or _____ if strict mode is true).

##### Old school way of solving the above problem...

Prior to ES2015 arrow functions, a common way to fix the above problem was to set another variable to "remember" the object `this` is bound to in the `chop` method:

```js
class Ninja {
  constructor(name) {
    this.ninjaName = name;
  }
  chop(numChops) {
    // Call the variable anything you wish,
    // e.g., _this, that, etc.
    const _this = this;
    setTimeout(function() {
      if (numChops > 0) {
        console.log(`${_this.ninjaName} chop!`);
        // recursion coming up!
        _this.chop(--numChops);
      }
    }, 500);
  }
}
  
const ninja = new Ninja('JS Ninja');
ninja.chop(2);  // it works!
```

The `_this` variable above "remembers" the "correct" value of `this`, i.e., when it references the `ninja` object.

However, today's best practice is to take advantage of how `this` is bound in arrow functions...

## 4. The Binding of `this` Within Arrow Functions

Arrow functions **always** have its `this` bound to its enclosing/surrounding function's `this`.

For example:
	
```js
const checkThisInArrowFunction = {
  message: 'SEI Rocks!',
  thisCheck: function() {
    setTimeout(() => console.log(this.message));
  }
};

checkThisInArrowFunction.thisCheck();  //-> SEI Rocks!
```

This time, the `setTimeout`'s callback function worked as planned because its value of `this` was set to that of its enclosing function, `thisCheck`.

So now, fixing the Ninja problem is as easy using an arrow function for the callback:
	
```js
let ninja = {
  ninjaName: 'JS Ninja',
  chop: function(numChops) {
    setTimeout(() => {
      if (numChops > 0) {
        console.log(`${this.ninjaName} chop!`);
        this.chop(--numChops);
      }
    }, 500);
  }
};

ninja.chop(2);  //  JS Ninja chop! (two times)
```

> Note that if an arrow function is defined in global scope (no enclosing function), `this` will always be bound to the global object (`window` in browser; `global` in node), but never `undefined`.

Lastly, the value of `this` in an arrow function cannot be set explicitly using the `call()`, `apply()` or `bind()` methods (see the Further Study section).
	
## 5. Good Advice

If you need to know what the value of `this` is in a given scenario, I would advise that you write some quick code like we've done here and test it out!

BTW, this is good advice in lots of cases - sometimes it's just better to write a little code and check the result than to run to docs or google.

## 6. ❓ Essential Questions (1 min)

<details>
<summary>
(1) What type of programming languages rely on the concept of <code>this</code>?
</summary>
<hr>

**Object Oriented Programming Languages**

<hr>
</details>
<details>
<summary>
(2) True or false: The value of <code>this</code> can be always be determined by examining the definition of a non-arrow function.
</summary>
<hr>

**False** because the value of `this` is determined by **how** the function is called, not how it is defined.

<hr>
</details>

<details>
<summary>
(3) What is <code>this</code> bound to within a general callback function (not an event listener callback)?
</summary>
<hr>

**The `window` object**<br>
unless in _strict mode_, then it will be `undefined`

<hr>
</details>

<details>
<summary>
(4) What is <code>this</code> bound to within a method invoked on an object?
</summary>
<hr>

**The object left of the dot!**

<hr>
</details>

## 7. Further Study

### Explicitly Binding `this`

Every non-arrow function has three methods on it that allow the programmer to explicitly set the binding of `this`:

- [call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) & [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) allow developers to bind `this` to the value of their first argument at the time the function is invoked.

    For example, let's explicitly set the binding of `this` within the `thisCheck` function we used earlier:

    ```js
    function thisCheck() {
      console.log(this);
    }

    const person = {
      name: 'Justin'
    };

    // Bind thisCheck to the person object
    thisCheck.call(person);
    // Outputs -> {name: 'Justin'}
    ```

- [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) creates and returns a new function with `this` pre-bound to the value of its first argument.

    For example, let's pre-set the binding of `this` within the `thisCheck` function this time:

    ```js
    function thisCheck() {
      console.log(this);
    }

    const person = {
      name: 'Justin'
    };

    // Bind thisCheck to the person object
    const newThisCheck = thisCheck.bind(person);
    newThisCheck();
    // Outputs -> {name: 'Justin'}
    ```

### Strict Mode

Learn more about the benefits [Strict Mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) provides.