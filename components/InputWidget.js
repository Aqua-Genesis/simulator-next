import Slider from "@/components/Slider";

export default function InputWidget({values, setValues, inputs, isSelectable, handleSelect, style, planetType, children}) {

  function handleChange(name, value) {
    let newValues = {...values};
    newValues[name] = parseFloat(value);
    setValues(newValues);
  }

  return <div className="flex flex-col justify-center h-full overflow-y-auto " style={style}>
    {children}
    {inputs.map((group) => group.tag.includes(planetType) ?
      <div key={group.description} className="flex flex-col items-center mb-6">
      <p
        className="default text-center text-sm"
      >{group.description}</p>
      {group.inputs.map((input) =>
        <Slider
          name={input.name} key={input.name}
          colour={input.colour}
          range={[0, 1]}
          value={values[input.name]}
          handleChange={handleChange}
          isSelectable={isSelectable}
          handleSelect={handleSelect}
        />)}
    </div> : null)}
  </div>
}