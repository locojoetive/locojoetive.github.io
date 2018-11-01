var sky,
    ground,
    boxes = [],
    player1,
    player2,
    cursor;
var windowHeight = window.innerHeight,
    windowWidth = window.innerWidth;
var switched = false;
var config = {
    type: Phaser.AUTO,
    width: windowWidth,
    height: windowHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
//            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);

function preload () {
    this.load.image('dude', 'assets/dude.png');
    this.load.image('dude1', 'assets/dude1.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('box', 'assets/diamond.png');
    this.load.image('sky', 'assets/sky.png');
}

function update () {
    handleControls();
}

function handleControls() {
    player1.body.angle = 0;
    if(cursor.left.isDown) {
        player1.setVelocityX(-200);
        player2.setVelocityX(0);
    } else if (cursor.right.isDown) {
        player1.setVelocityX(200);
        player2.setVelocityX(0);
    } else {
        player1.setVelocityX(0);
        player2.setVelocityX(0);
    }
    if (cursor.space.isDown) {
        if(player1.body.onFloor()) {
            player1.setVelocityY(-600);
        }
        if(player2.body.onFloor()) {
            player2.setVelocityY(-600);
        }
    }
}

function switchPlayer() {
    if(timeForHighfive()) 
    {
        const playerClone = player1;
        player1 = player2;
        player2 = playerClone;
        switched = !switched;
    }
}

function timeForHighfive() {
    return (player1.body.touching.right && player2.body.touching.left)
        || (player1.body.touching.left && player2.body.touching.right);
}

function hitBox0() {
    if (activePlayerIsHitting()) {
        window.open('/games/wampmp/wammp.html');
        console.log('yey!');
    }
}

function activePlayerIsHitting() {
    return !switched && player1.body.touching.up
        || switched && player1.body.touching.up
}

function hitBox1() {
    if (player1.body.touching.up) {
        // console.log('Let`s start WOTN!');
    }
}

function hitBox2() {
    if (player1.body.touching.up) {
        console.log(game.scene.keys.default.physics.world);
    }
}


function create ()
{
    createSky(this);
    createGround(this);
    createBoxes(this);
    createPlayers(this);

    // collisions
    defineCollisions(this);

    // controls
    cursor = this.input.keyboard.createCursorKeys();
}

function createSky(game) {
    sky = game.add.image(
        windowWidth*0.5,
        windowHeight*0.5,
        'sky',
    );
    sky.setScale(2, 2);
    game.physics.add.existing(sky, true);
}

function createGround(game) {
    ground = game.add.tileSprite(
        windowWidth*0.5,
        windowHeight*0.9,
        windowWidth,
        windowHeight * 0.2,
        'platform',
    );
    game.physics.add.existing(ground, true);

}

function createBoxes(game) {
    for (let i = 1; i <= 3; i++) {
        let box = game.add.tileSprite(
            windowWidth*0.25*i,
            windowHeight*0.5,
            64,
            56,
            'box',
        );
        game.physics.add.existing(box, true);
        boxes.push(box);
    }
    console.log(boxes);
}

function createPlayers(game) {
    player1 = game.physics.add.image(100, 100, 'dude');
    player1 = player1.setCollideWorldBounds(true);
    player2 = game.physics.add.image(windowWidth*0.5, 100, 'dude1');
    player2 = player2.setCollideWorldBounds(true);
}

function defineCollisions(game) {
    game.physics.add.collider(ground, player1);
    game.physics.add.collider(boxes[0], player1, hitBox0);
    game.physics.add.collider(boxes[1], player1, hitBox1);
    game.physics.add.collider(boxes[2], player1, hitBox2);
    game.physics.add.collider(boxes[0], player2, hitBox0);
    game.physics.add.collider(boxes[1], player2, hitBox1);
    game.physics.add.collider(boxes[2], player2, hitBox2);
    game.physics.add.collider(ground, player2);
    game.physics.add.collider(boxes, player2);
    game.physics.add.collider(player1, player2, switchPlayer);   
}
