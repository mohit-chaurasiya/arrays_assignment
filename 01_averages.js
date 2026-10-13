const r = require("raylib");

function setup() {
    const WIDTH = 400;
    const HEIGHT = 400;
    const FPS = 50;

    const barWidth = 15;
    const gap = 2;
    const data = [0, 5, 10, 15, 20, 25, 30, 40, 65, 70, 75, 80, 85];
    const maxNumber = getMaxNum(data);
    const unitHeight = getUnitHeight(HEIGHT, maxNumber);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Averages");
    r.SetTargetFPS(FPS);

    return {
        WIDTH,
        HEIGHT,
        FPS,
        data,
        barWidth,
        gap,
        unitHeight,
    };
}

function getAverage(unitHeight, data) {
    const length = data.length;
    let sum = 0;
    for (const elem of data) {
        sum += elem * unitHeight;
    }

    return sum / length;
}

function drawAverage(world) {
    const average = getAverage(world.unitHeight, world.data);
    const y = world.HEIGHT - average;

    r.DrawLine(0, y, world.WIDTH, y, r.RED);
}

function getMaxNum(array) {
    let max = -Infinity;
    for (const num of array) {
        if (num > max) max = num;
    }

    return max;
}

function getUnitHeight(screenHeight, value) {
    return (screenHeight * 90) / (value * 100);
}

function drawBar(world, key) {
    let barWidth = world.barWidth;

    if (barWidth < 1) barWidth = 1;

    const x = key * (barWidth + world.gap);
    const barHeight = world.unitHeight * world.data[key];
    const y = world.HEIGHT - barHeight;

    r.DrawRectangle(x, y, barWidth, barHeight, r.DARKBLUE);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);

    for (const key in world.data) {
        drawBar(world, key);
    }

    drawAverage(world);

    r.EndDrawing();
}

function loop(world) {
    while (!r.WindowShouldClose()) {
        // no update!
        draw(world);
    }
}

function main() {
    const world = setup();
    loop(world);
}

main();
