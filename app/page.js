import PlanetSelector from "@/components/PlanetSelector";

export default function App() {
  return (<div className="bg-background h-full py-8 px-12 overflow-hidden">
    <p className="font-bold text-8xl">Aqua Genesis</p>
    <div className="my-8 p-4 flex justify-around">
      <PlanetSelector
        imageLink="/earth.png"
        imageSize={300}
        description="Regular planet"
      />
      <PlanetSelector
        imageLink="/rogue.png"
        imageSize={300}
        description="Rogue planet"
      />
      <PlanetSelector
        imageLink="/moon.png"
        imageSize={300}
        description="Moon of another planet"
      />
    </div>
  </div>)
}
