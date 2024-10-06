export default function Checkbox({name, checked, handleChange}) {

  return <div className="custom-checkbox-container flex items-center">
    <label className="default mr-1.5">{name}</label>
    <span
      className={"block w-4 h-4 rounded-full " + (checked ? "bg-white border-4 border-blue3" : "bg-blue3")}
      onClick={() => handleChange(name)}
    >
    </span>
  </div>
}