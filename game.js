// grab the canvas and its 2D drawing "pen" (the context)

const canvas = document.getElementById("adventure");
const ctx = canvas.getContext("2d");

const player = { 
    x: 250, 
    y: 285, 
    width: 30, 
    height: 30, 
    age: 28, 
    name: "Lilith",
    swinging: false,
    spaceUsed: false,
    swingTimer: 0,
    swingAngle: 0,
    facing: "right",
    swingStart: -Math.PI / 3,
    swingDirection: 1,
};

const sword = {
    x: 500,
    y: 280,
    width: 5,
    height: 35,
    collected: false,
}

const keys = {}
    window.addEventListener("keydown", function(e) {
    keys[e.key] = true;
});
    window.addEventListener("keyup", function(e) {
    keys[e.key] = false;
    if (e.key === " ") player.spaceUsed = false;
});

const bushes = [
    { x: 0,   y: 0,   width: 800, height: 20 },
    { x: 0,   y: 580, width: 800, height: 20 },
    { x: 0,   y: 0,   width: 20,  height: 600 },
    { x: 780, y: 0,   width: 20,  height: 280 },
    { x: 780, y: 360, width: 20,  height: 240 },
];

const cuttableBushes = [
    { x: 780, y: 280, width: 20, height: 40 },
    { x: 780, y: 320, width: 20, height: 40 },
];

function overlaps(a, b) {
return !(
    a.x + a.width  < b.x ||
    b.x + b.width  < a.x ||
    a.y + a.height < b.y ||
    b.y + b.height < a.y
);
}

// the game loop — runs ~60 times per second
function gameLoop() {
    // repaint the background every frame (this clears the last frame)
    ctx.fillStyle = "#1e1e2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
// ── everything in our game will get drawn here ──

    // handle player movement and facing direction including sword swing setup

    // LEFT
    if (keys["a"] || keys["A"]) {
    player.x -= 3;
    if (!player.swinging) {
        player.facing = "left";
        player.swingStart = -Math.PI * 2/3;
        player.swingDirection = -1;
    }
}
    // RIGHT
    else if (keys["d"] || keys["D"]) {
    player.x += 3;
    if (!player.swinging) {
        player.facing = "right";
        player.swingStart = -Math.PI / 3;
        player.swingDirection = 1;
    }
}
    // UP
    else if (keys["w"] || keys["W"]) {
    player.y -= 3;
    if (!player.swinging) {
        player.facing = "up";
        player.swingStart = -Math.PI * 5/6;
        player.swingDirection = 1;
    }
}
    // DOWN
    else if (keys["s"] || keys["S"]) {
    player.y += 3;
    if (!player.swinging) {
        player.facing = "down";
        player.swingStart = Math.PI / 6;
        player.swingDirection = 1;
    }
}
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;
    if (player.y > canvas.height - player.height) player.y = canvas.height - player.height;

    // console.log(player.facing, player.swingStart);

    // handle sword swinging timing and angle
    if (keys[" "] && sword.collected && !player.swinging && !player.spaceUsed) {
        player.swinging = true;
        player.swingTimer = 0;
        player.swingAngle = 0;
        player.spaceUsed = true;  // lock it until space is released
    }
    if (player.swinging) {
        player.swingTimer++;
        player.swingAngle += 0.1 * player.swingDirection;  // ← change this line
        if (player.swingTimer > 20 || Math.abs(player.swingAngle) >= 2 * Math.PI / 3) {  // ← and this line
            player.swinging = false;
            player.swingTimer = 0;
            player.swingAngle = 0;
        }
    }

    cuttableBushes.forEach(function(bush) {
    if (!bush.cut && overlaps(player, bush)) {
    if (keys["a"] || keys["A"]) player.x += 3;
    if (keys["d"] || keys["D"]) player.x -= 3;
    if (keys["w"] || keys["W"]) player.y += 3;
    if (keys["s"] || keys["S"]) player.y -= 3;
    }
    });

    bushes.forEach(function(bush) {
    if (overlaps(player, bush)) {
    if (keys["a"] || keys["A"]) player.x += 3;
    if (keys["d"] || keys["D"]) player.x -= 3;
    if (keys["w"] || keys["W"]) player.y += 3;
    if (keys["s"] || keys["S"]) player.y -= 3;
    }
    });

    bushes.forEach(function(bush) {
    ctx.fillStyle = "#024f16";
    ctx.fillRect(bush.x, bush.y, bush.width, bush.height);
    });

    cuttableBushes.forEach(function(bush) {
    if (!bush.cut) {
        ctx.fillStyle = "#019428";
        ctx.fillRect(bush.x, bush.y, bush.width, bush.height);
    }
    });

    if (!sword.collected && overlaps(player, sword)) {
    sword.collected = true;
    console.log("You got the sword!");
    }

    if (!sword.collected) {
    ctx.fillStyle = "#b8feff";
    ctx.fillRect(sword.x, sword.y, sword.width, sword.height);
    }
    
    ctx.fillStyle = "#9eb57b";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    if (player.swinging) {
        const centerX = player.x + player.width / 2;
        const centerY = player.y + player.height / 2;
        const currentAngle = player.swingStart + player.swingAngle;
        const swordLength = 40;
        const tipX = centerX + Math.cos(currentAngle) * swordLength;
        const tipY = centerY + Math.sin(currentAngle) * swordLength;
        const swordBox = {
            x: Math.min(centerX, tipX),
            y: Math.min(centerY, tipY),
            width: Math.abs(tipX - centerX),
            height: Math.abs(tipY - centerY),
        };
        cuttableBushes.forEach(function(bush) {
            if (!bush.cut && overlaps(swordBox, bush) && sword.collected) {
                bush.cut = true;
            }
        });
        
        ctx.strokeStyle = "#b8feff";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(tipX, tipY);
        ctx.stroke();
    } 

    requestAnimationFrame(gameLoop); // queue up the next frame
    
}

requestAnimationFrame(gameLoop); // kick it off