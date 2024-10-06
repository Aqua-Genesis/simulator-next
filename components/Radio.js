export default function Radio({name, selected, handleChange}) {

  return <div className="flex">
    <label htmlFor={name}>{name}</label>
    <input type="radio" id={name} value={name} checked={selected === name} onChange={handleChange} />
  </div>
}