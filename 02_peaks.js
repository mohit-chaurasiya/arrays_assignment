const r = require("raylib");

function setup() {
    const WIDTH = 800;
    const HEIGHT = 400;
    const FPS = 50;

    const data = randomData(100);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, "Peaks");
    r.SetTargetFPS(FPS);

    return {
        WIDTH,
        HEIGHT,
        FPS,
        data,
    };
}

function randomData(numberOfData) {
    const data = [];
    for (let i = 0; i < numberOfData; i++) {
        data.push(Math.floor(100 * Math.random()));
    }
    return data;
}

function getUnitHeight(screenHeight, value) {
    return (screenHeight * 90) / (value * 100);
}

function getMaxNum(array) {
    let max = -Infinity;

    for (const num of array) {
        if (num > max) max = num;
    }

    return max;
}

function isPeakPoint(world, index) {
    const isGreaterThanLeft = world.data[index - 1] < world.data[index];
    const isLessThanRight = world.data[index] > world.data[index + 1];
    return isGreaterThanLeft && isLessThanRight;
}

function calcYCoordinate(world, value) {
    const maxNumber = getMaxNum(world.data);
    const unitHeight = getUnitHeight(world.HEIGHT, maxNumber);

    return world.HEIGHT - value * unitHeight;
}

function updateYCoordinate(linePoints, world, value) {
    linePoints.y2 = calcYCoordinate(world, value);
}

function calcGap(world) {
    return world.WIDTH / world.data.length;
}

function getPeakPoints(world) {
    const gap = calcGap(world);
    const peakPoints = [];

    for (let index = 1; index < world.data.length; index++) {
        if (isPeakPoint(world, index)) {
            peakPoints.push([
                index * gap,
                calcYCoordinate(world, world.data[index]),
            ]);
        }
    }

    return peakPoints;
}

function drawPeakPoints(world) {
    const peakPoints = getPeakPoints(world);

    for (let index = 0; index < peakPoints.length; index++) {
        r.DrawCircle(peakPoints[index][0], peakPoints[index][1], 5, r.RED);
    }
}

function updateCordinate(linePoints, gap) {
    linePoints.y1 = linePoints.y2;
    linePoints.x1 += gap;
    linePoints.x2 += gap;
}

function drawLineGraph(world) {
    const gap = calcGap(world);

    const linePoints = {
        x1: 0,
        y1: calcYCoordinate(world, 0),
        x2: gap,
        y2: 0,
    };

    for (let index = 1; index < world.data.length; index++) {
        updateYCoordinate(linePoints, world, world.data[index]);

        r.DrawLine(
            linePoints.x1,
            linePoints.y1,
            linePoints.x2,
            linePoints.y2,
            r.BLACK,
        );

        updateCordinate(linePoints, gap);
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);

    drawLineGraph(world);
    drawPeakPoints(world);

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
