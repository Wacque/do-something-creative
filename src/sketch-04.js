const canvasSketch = require('canvas-sketch');
const {random, math} = require("canvas-sketch-util");
const {Pane} = require("tweakpane");

const settings = {
    dimensions: [screen.width, screen.height],
    animate: true
};

const params = {
    cols: 30,
    rows: 30,
    scaleMin: 1,
    scaleMax: 10,
    freq: -0.001,
    amp: 0.70
}

const createPane = function () {
    const pane = new Pane()

    const folder1 = pane.addFolder({
        title: 'Grid',
    });

    folder1.addInput(params, 'cols', {min: 2, max: 200, step: 1})
    folder1.addInput(params, 'rows', {min: 2, max: 200, step: 1})
    folder1.addInput(params, 'scaleMin', {min: 1, max: 100, step: 1})
    folder1.addInput(params, 'scaleMax', {min: 1, max: 100, step: 1})

    const folder2 = pane.addFolder({
        title: 'Noise',
    });

    folder2.addInput(params, 'freq', {min: -0.01, max: 0.01})
    folder2.addInput(params, 'amp', {min: 0, max: 1})
}

const sketch = () => {
    return ({context, width, height, frame}) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        const cols = params.cols
        const rows = params.rows
        const numCells = cols * rows

        const gridW = width
        const gridH = height
        const cellW = gridW / cols
        const cellH = gridH / rows
        const marginX = (width - gridW) * 0.5
        const marginY = (height - gridH) * 0.5

        for (let i = 0; i < numCells; i++) {
            const col = i % cols
            const row = Math.floor(i / cols)

            const x = col * cellW
            const y = row * cellH
            const w = cellW * 0.8
            const h = cellH * 0.8

            // const n = random.noise2D(x + frame * 20, y, params.freq)
            const n = random.noise3D(x, y, frame * 10, params.freq)
            const angle = n * Math.PI * params.amp
            const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax)

            context.save()

            context.translate(x, y)
            context.translate(marginX, marginY)
            context.translate(cellW * 0.5, cellH * 0.5)
            context.rotate(angle)

            context.lineWidth = scale

            context.beginPath()
            context.moveTo(2 * -0.5, 0)
            context.lineTo(w * 0.5, 0)
            context.stroke()

            context.restore()
        }
    };
};

createPane();
canvasSketch(sketch, settings);
