export class PointRender{
    constructor(x, y, z, colour) {
        this.xCoord = x
        this.yCoord = y
        this.zCoord = z
        this.colour = colour
    }

    static pointRenderListFromList(l, colour){
        return l.map(elem => {
            return new PointRender(elem[0], elem[1], elem[2], colour)
        })
    }

    static subtract(a, b) {
        return a.filter(pointA => {
            return !b.some(pointB => {
                return pointA.xCoord === pointB.xCoord &&
                    pointA.yCoord === pointB.yCoord &&
                    pointA.zCoord === pointB.zCoord;
            });
        });
    }
}
