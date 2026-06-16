// grab the canvas and its 2D drawing "pen" (the context)

const canvas = document.getElementById("adventure");
const ctx = canvas.getContext("2d");

const player = { 
    x: 250, 
    y: 285, 
    width: 30, 
    height: 34, 
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

const grassTile = document.createElement("canvas");
    grassTile.width = 8;
    grassTile.height = 8;
const grassCtx = grassTile.getContext("2d");
    // base color
    grassCtx.fillStyle = "#2d5a1b";
    grassCtx.fillRect(0, 0, 8, 8);
    // a couple of lighter flecks
    grassCtx.fillStyle = "#3d7a2b";
    grassCtx.fillRect(1, 2, 1, 3);
    grassCtx.fillRect(5, 1, 1, 4);
const grassPattern = ctx.createPattern(grassTile, "repeat");

const bushTile = document.createElement("canvas");
    bushTile.width = 8;
    bushTile.height = 8;
const bushCtx = bushTile.getContext("2d");
    // base color
    bushCtx.fillStyle = "#021f09";
    bushCtx.fillRect(0, 0, 8, 8);
    // a couple of lighter flecks
    bushCtx.fillStyle = "#122a06";
    bushCtx.fillRect(0, 0, 8, 8);
    bushCtx.fillStyle = "#1f460d";
    bushCtx.fillRect(0, 0, 2, 2);
    bushCtx.fillRect(3, 1, 2, 2);
    bushCtx.fillRect(6, 0, 2, 2);
    bushCtx.fillRect(1, 4, 2, 2);
    bushCtx.fillRect(5, 3, 2, 2);
    bushCtx.fillRect(2, 6, 2, 2);
    bushCtx.fillRect(6, 5, 2, 2);
    bushCtx.fillStyle = "#2e6413";
    bushCtx.fillRect(1, 1, 1, 1);
    bushCtx.fillRect(5, 4, 1, 1);
    bushCtx.fillRect(3, 6, 1, 1);
const bushPattern = ctx.createPattern(bushTile, "repeat");

const cuttableBushTile = document.createElement("canvas");
    cuttableBushTile.width = 8;
    cuttableBushTile.height = 8;
const cuttableBushCtx = cuttableBushTile.getContext("2d");
    // base color
    cuttableBushCtx.fillStyle = "#021f09";
    cuttableBushCtx.fillRect(0, 0, 8, 8);
    // a couple of lighter flecks
    cuttableBushCtx.fillStyle = "#4a6b0a";
    cuttableBushCtx.fillRect(0, 0, 8, 8);
    cuttableBushCtx.fillStyle = "#6a9410";
    cuttableBushCtx.fillRect(0, 0, 2, 2);
    cuttableBushCtx.fillRect(3, 1, 2, 2);
    cuttableBushCtx.fillRect(6, 0, 2, 2);
    cuttableBushCtx.fillRect(1, 4, 2, 2);
    cuttableBushCtx.fillRect(5, 3, 2, 2);
    cuttableBushCtx.fillRect(2, 6, 2, 2);
    cuttableBushCtx.fillRect(6, 5, 2, 2);
    cuttableBushCtx.fillStyle = "#8ab820";
    cuttableBushCtx.fillRect(1, 1, 1, 1);
    cuttableBushCtx.fillRect(5, 4, 1, 1);
    cuttableBushCtx.fillRect(3, 6, 1, 1);
const cuttableBushPattern = ctx.createPattern(cuttableBushTile, "repeat");

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
    { x: 780, y: 280, width: 20, height: 40, cut: false, scale: 1 },
    { x: 780, y: 320, width: 20, height: 40, cut: false, scale: 1 },
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
    ctx.fillStyle = grassPattern;
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
    ctx.fillStyle = bushPattern;
    ctx.fillRect(bush.x, bush.y, bush.width, bush.height);
    });

    cuttableBushes.forEach(function(bush) {
    if (bush.cut && bush.scale > 0) {
        bush.scale -= 0.05;
        const drawnWidth  = bush.width  * bush.scale;
        const drawnHeight = bush.height * bush.scale;
        const drawnX = bush.x + (bush.width  - drawnWidth)  / 2;
        const drawnY = bush.y + (bush.height - drawnHeight) / 2;
        ctx.fillStyle = cuttableBushPattern;
        ctx.fillRect(drawnX, drawnY, drawnWidth, drawnHeight);
    } 
    else if (!bush.cut) {
        ctx.fillStyle = cuttableBushPattern;
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
    
    // Lilith
    // head
    ctx.beginPath();
    const headCenterX = player.x + 12.5;
    const headCenterY = player.y + 10;
    ctx.arc(headCenterX, headCenterY, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#f2c079";
    ctx.fill();

    // body — centered under the head
    ctx.fillStyle = "#b01608";
    ctx.fillRect(player.x + 5, player.y + 20, 15, 15);
    // left leg
    ctx.fillStyle = "#0a0701";
    ctx.fillRect(player.x + 5, player.y + 40, 6, 8);
    // right leg
    ctx.fillStyle = "#130d02";
    ctx.fillRect(player.x + 15, player.y + 40, 6, 8);
    // hair with facing direction
    if (player.facing === "right") {
        ctx.fillStyle = "#4a90d9";
        ctx.fillRect(player.x, player.y, 8, 24);
    } else if (player.facing === "left") {
        ctx.fillStyle = "#4a90d9";
        ctx.fillRect(player.x + 17, player.y, 8, 24);
    } else if (player.facing === "up") {
        ctx.fillStyle = "#4a90d9";
        ctx.fillRect(player.x + 4, player.y, 17, 24);
    } else if (player.facing === "down") {
        ctx.fillStyle = "#4a90d9";
        ctx.fillRect(player.x + 4, player.y, 17, 24);
        const headCenterX = player.x + 12;
        const headCenterY = player.y + 10;
        ctx.arc(headCenterX, headCenterY, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#f2c079";
        ctx.fill()
        ctx.fillStyle = "#4a90d9";
        ctx.beginPath();
        ctx.fillRect(player.x + 4, player.y, 17, 10);
    }

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