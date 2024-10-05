export default function Slider({label, range, value, setValue}) {
  return <div>
    <label htmlFor={label}>{label}</label>
    <input id={label} type={"range"} min={range[0]} max={range[1]} step={0.01}
           value={value} onChange={(e) => setValue(e.target.value)}
    />
  </div>
}