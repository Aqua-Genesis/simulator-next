export default function SideButton({text, position, onClick}) {
  return <button
    className={"default bg-[#122526] text-blue3 text-2xl py-1.5 px-6" + " " + position}
    onClick={onClick}
  >
    {text}
  </button>
}