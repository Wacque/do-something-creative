const canvasSketch = require('canvas-sketch');
const {random} = require("canvas-sketch-util");
const {degToRad} = require("canvas-sketch-util/math");

const settings = {
    dimensions: [1080, 1080],
};

const sketch = () => {
    return ({context, width, height}) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        const cx = width * 0.5,
            cy = height * 0.5,
            w = width * 0.01,
            h = height * 0.1;

        let x, y

        context.fillStyle = 'black';

        const num = 16
        const radius = width * 0.3

        for (let i = 0; i < num; i++) {
            const slice = degToRad(360 / num)
            const angle = slice * i

            x = cx + radius * Math.sin(angle)
            y = cy + radius * Math.cos(angle)

            context.save()

            context.translate(x, y)
            context.rotate(-angle)
            context.scale(random.range(0.1, 4), random.range(0.6, 1))

            context.beginPath()
            context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h)
            context.fill()

            context.restore()

            context.save()
            context.translate(cx, cy)
            context.rotate(-angle)
            context.lineWidth = random.range(5, 20)
            context.beginPath()
            context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), random.range(1, 5))
            context.stroke()

            context.restore()
        }
    };
};

canvasSketch(sketch, settings);
