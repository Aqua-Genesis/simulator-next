export default function SideButton({text, position, onClick}) {
  return <button
    className={"default bg-window text-blue3 text-2xl z-20 py-1.5 px-6" + " " + position}
    onClick={onClick}
  >
    {text}
  </button>
}