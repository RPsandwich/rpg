// function drawLilith() {
//     // Lilith
//     // head
//     ctx.beginPath();
//     const headCenterX = player.x + 12.5;
//     const headCenterY = player.y + 10;
//     ctx.arc(headCenterX, headCenterY, 10, 0, Math.PI * 2);
//     ctx.fillStyle = "#f2c079";
//     ctx.fill();
//     // body — centered under the head
//     ctx.fillStyle = "#b01608";
//     ctx.fillRect(player.x + 5, player.y + 20, 15, 15);
//     // left leg
//     ctx.fillStyle = "#0a0701";
//     ctx.fillRect(player.x + 5, player.y + 40, 6, 8);
//     // right leg
//     ctx.fillStyle = "#130d02";
//     ctx.fillRect(player.x + 15, player.y + 40, 6, 8);
//     // hair with facing direction
//     if (player.facing === "right") {
//         ctx.fillStyle = "#4a90d9";
//         ctx.fillRect(player.x, player.y, 8, 24);
//     } else if (player.facing === "left") {
//         ctx.fillStyle = "#4a90d9";
//         ctx.fillRect(player.x + 17, player.y, 8, 24);
//     } else if (player.facing === "up") {
//         ctx.fillStyle = "#4a90d9";
//         ctx.fillRect(player.x + 4, player.y, 17, 24);
//     } else if (player.facing === "down") {
//         ctx.fillStyle = "#4a90d9";
//         ctx.fillRect(player.x + 4, player.y, 17, 24);
//         const headCenterX = player.x + 12;
//         const headCenterY = player.y + 10;
//         ctx.arc(headCenterX, headCenterY, 10, 0, Math.PI * 2);
//         ctx.fillStyle = "#f2c079";
//         ctx.fill()
//         ctx.fillStyle = "#4a90d9";
//         ctx.beginPath();
//         ctx.fillRect(player.x + 4, player.y, 17, 10);
//     }
// }