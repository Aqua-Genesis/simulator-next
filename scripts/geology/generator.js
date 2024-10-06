export function fibonacciSphere(samples) {
    const phi = Math.PI * (3 - Math.sqrt(5));
    const pointArray = new Array(samples).fill(0).map(() => new Array(3).fill(0));

    for (let i = 0; i < samples; i++) {
        const y = 1 - (i / (samples - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;

        pointArray[i] = [x, y, z];
    }

    return pointArray;
}
