import Checkbox from "@/components/Checkbox";
import {overlayOptions} from "@/components/constants";
import InputWidget from "@/components/InputWidget";

export default function OverlaySidebar({style, overlays, setOverlays}) {

  function handleChange (name) {
    const newOverlays = JSON.parse(JSON.stringify(overlays));
    newOverlays[name] = !overlays[name];
    setOverlays(newOverlays);
  }

  return <div className="flex flex-col justify-center items-center h-full overflow-y-auto w-1/4 absolute z-10" style={style}>
    <div className="flex flex-col items-end bg-window rounded-3xl pl-6 pr-4 py-4 w-fit">
      {Object.entries(overlayOptions).map(([key, value]) =>
        <Checkbox
        key={key} name={key}
        checked={overlays[key]}
        handleChange={handleChange}
        />
      )}
    </div>
  </div>
}