//Holder for a div with id as light
const lightBoxHolder = document.querySelector('#light');

//Holder for a div with id as fade
const overlayHolder = document.querySelector('#fade');


//Enemies rewritten in new ES6 way
/**
 * Enemy class which has constructor for object creation and other two methods update and render
 * This class is responsible for drawing enemies in the screen in random order.
 */
class Enemy {
    constructor(x, y, speed) {
        // The following variables are used to determine the x and y axis and speed of the enemy
        this.x = x;
        this.y = y;
        this.speed = speed;

        // The image of enemy bug added to the playing screen
        this.sprite = 'images/enemy-bug.png';
    }

    /**
     * This method updates the enemy position continuously with variable speeds
     * Also checks for collision to reset the player position
     * @param dt
     */
    update(dt) {

        // Multiplies the speed by the dt parameter on the x axis
        this.x += this.speed * dt;

        // Once enemies reach the end of screen they appear again with different velocities
        if (this.x > 500) {
            this.x = -50;
            this.speed = 100 + Math.floor(Math.random() * 300);
        }

        // Reset player position on collision
        if (player.x < this.x + 80 &&
            player.x + 80 > this.x &&
            player.y < this.y + 60 &&
            60 + player.y > this.y) {
            openModal(true);
            player.x = 202;
            player.y = 405;
        }
    }

    /**
     * This method draws enemy on the screen using Canvas draw image function
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

//Player class in new ES6 way
/**
 * Player class responsible to display player in the game arena.
 * Takes care of player movements within the player field by responding to left, right, up and down arrow keys
 */
class Player {
    constructor(x, y) {
        // Variables for the player to move along x and y axis
        this.x = x;
        this.y = y;

        //The image of the player of horn-girl is added to the playing field
        this.player = 'images/char-boy.png';
    }

    /**
     * This method draws player on the screen using Canvas draw image function
     */
    render() {
        ctx.drawImage(Resources.get(this.player), this.x, this.y);
    }

    /**
     * Kept for completion purpose and doesn't have any logic in this scenario
     * Has scope to add few more features in the future
     */
    update() {

    }

    /**
     * This method takes in keypress event alias key code and moves player from one position to other
     * based on the keys pressed.
     * @param keyPress
     */
    handleInput(keyPress) {

        if (keyPress == 'left' && this.x > 0) {
            this.x -= 102;
        };

        if (keyPress == 'right' && this.x < 405) {
            this.x += 102;
        };

        if (keyPress == 'up' && this.y > 0) {
            this.y -= 83;
        };

        if (keyPress == 'down' && this.y < 405) {
            this.y += 83;
        };

        /* Once the user reaches the water area, position of
           the user is reset to the starting position */
        if (this.y < 0) {
            setTimeout(() => {
                openModal(false);
                this.x = 202;
                this.y = 405;
            }, 500);
        };
    };

}

// All enemies are placed in an array
let allEnemies = [];

// Location of the 3 enemies on the y axis on the road
const enemyLocation = [65, 140, 225];


// For enemy locations defined above, create a new enemy and start with the speed of 300.
enemyLocation.forEach(function (locationY) {
    const enemy = new Enemy(0, locationY, 300);
    allEnemies.push(enemy);
});

// The starting position of the player is located at x=200, y=405
const player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    //Respond to key press only when the overlay isn't present
    if(!lightBoxHolder.classList.contains('show')) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});

/**
 * Opens final modal and decides messages to be displayed based on success or failure of player
 * @param isInfested
 */
function openModal(isInfested) {
    if(isInfested) {
        lightBoxHolder.firstElementChild.textContent = "You're infested by bugs.";
    }
    else {
        lightBoxHolder.firstElementChild.textContent = "You won! I think you had some kind of effective bug spray on you!!";
    }
    displayOrHidePop(true);
}

/**
 * Hides or displays the final popup
 * @param isDisplay
 */
function displayOrHidePop(isDisplay) {
    if(isDisplay) {
        lightBoxHolder.classList.add('show');
        overlayHolder.classList.add('show');
    }
    else {
        lightBoxHolder.classList.remove('show');
        overlayHolder.classList.remove('show');
        clearPopMessage();
    }
}

/**
 * Clears current message in the modal when the modal is closed
 */
function clearPopMessage() {
    lightBoxHolder.firstElementChild.textContent = '';
}