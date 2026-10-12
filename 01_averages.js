const r = require("raylib");

function setup() {
    const WIDTH = 400;
    const HEIGHT = 400;
    const FPS = 50;

    const barWidth = 15;
    const gap = 2;
    const data = [
        0, 5, 10, 15, 20, 25, 30, 400, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85,
        90, 95, 100, 105, 110, 115, 120,
    ];
    const maxNumber = gerLargestNumber(data);
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

function getAverage(unitHeight, array) {
    const length = array.length;
    let sum = 0;
    for (let i = 0; i < length; i++) {
        sum += array[i] * unitHeight;
    }

    return sum / length;
}

function drawAverage(world) {
    const average = getAverage(world.unitHeight, world.data);
    const y = world.HEIGHT - average;

    r.DrawLine(0, y, world.WIDTH, y, r.RED);
}

function gerLargestNumber(array) {
    let largestNumber = -Infinity;
    for (let i = 0; i < array.length; i++) {
        if (array[i] > largestNumber) largestNumber = array[i];
    }

    return largestNumber;
}

function getUnitHeight(screenHeight, value) {
    return (screenHeight * 90) / (value * 100);
}

function drawBar(world, number) {
    let barWidth = world.barWidth;

    if (barWidth < 1) barWidth = 1;

    const x = number * (barWidth + world.gap);
    const barHeight = world.unitHeight * world.data[number];
    const y = world.HEIGHT - barHeight;

    r.DrawRectangle(x, y, barWidth, barHeight, r.DARKBLUE);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);

    for (let i = 0; i < world.data.length; i++) {
        drawBar(world, i);
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
