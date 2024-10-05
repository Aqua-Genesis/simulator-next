export default function Slider({name, colour, range, value, handleChange}) {
  return <div className="flex">
    <label htmlFor={name}
           className=""
    >
      {name}
    </label>
    <input id={name} type={"range"} min={range[0]} max={range[1]} step={0.01}
           value={value} onChange={(e) => handleChange(name, e.target.value)}
           className=""
    />
  </div>
}