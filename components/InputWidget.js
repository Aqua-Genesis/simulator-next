import Slider from "@/components/Slider";

export default function InputWidget({values, setValues, inputs}) {

  function handleChange(name, value) {
    let newValues = {...values};
    newValues[name] = value;
    setValues(newValues);
  }

  return <div className="flex flex-col justify-center h-full overflow-y-auto w-1/3 px-4 mx-4">
    {inputs.map((group) => <div key={group.description} className="flex flex-col items-center mb-6">
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
        />)}
    </div>)}
  </div>
}