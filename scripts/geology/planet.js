import { fibonacciSphere } from "./generator"
import { MAX_PLATES, MIN_PLATES, PLANET_POINTS } from "./global"
import { randomTectonicPlates } from "./tectonics"

export class Planet{
    constructor() {
        this.terrain = fibonacciSphere(PLANET_POINTS)
        this.minerals = []
        this.geologicBreaks = []
        this.initializeTectonics()
    }

    initializeTectonics(){
        let plateAmount = Math.floor(Math.random() * MAX_PLATES - MIN_PLATES + 1) + MIN_PLATES
        let breaks = randomTectonicPlates(this.terrain, 10, 0.7)
        this.geologicBreaks = breaks
    }
}
