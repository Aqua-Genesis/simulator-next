import Radio from "@/components/Radio";

export default function OverlaySidebar({style}) {

  return <div className="flex flex-col justify-center h-full overflow-y-auto w-1/4 absolute" style={style}>
    <div className="flex bg-window rounded-3xl">
      <Radio
        name="Temperature at a seabed"

      />
    </div>
  </div>
}