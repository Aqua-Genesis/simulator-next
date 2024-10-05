'use client'
import InputWidget from "@/components/InputWidget";
import {inputsElements, inputsOther} from "@/components/constants";
import {useState} from "react";


export default function Page() {

  const defaultValues = {};
  for (const group of inputsElements.concat(inputsOther)) {
    for (const input of group.inputs) {
      defaultValues[input.name] = 0.4;
    }
  }
  const [values, setValues] = useState(defaultValues);

  return (
    <div className="flex flex-col items-center bg-background min-h-screen py-12 px-8">
      <p className="bebas text-blue2 text-5xl tracking-wide">
        Starting parameters
      </p>
      {/* Add flex-grow so InputWidget takes available space */}
      <div className="flex flex-row flex-grow w-full h-0 pt-8">

        <InputWidget
          values={values}
          setValues={setValues}
          inputs={inputsOther}
        />

        <div className="flex items-center justify-center w-1/3 h-full">
          <p>Pie chart</p>
        </div>

        <InputWidget
          values={values}
          setValues={setValues}
          inputs={inputsElements}

        />
      </div>
    </div>
  );
}
