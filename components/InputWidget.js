import {inputs} from "@/components/constants";
import Slider from "@/components/Slider";

export default function InputWidget({values, setValues}) {

  function handleChange(name, value) {
    let newValues = {...values};
    newValues[name] = value;
    setValues(newValues);
  }

  return <div>
    {inputs.map((group) => <div key={group.description}>
      <p>{group.description}</p>
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