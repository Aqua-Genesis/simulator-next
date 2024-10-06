export default function SideButton({text, position, onClick, selected}) {
  return <button
    className={"text-center default bg-mid text-blue3 text-2xl z-20 py-1.5 px-6" + " " + position}
    onClick={onClick}
  >
    {selected ? "▼" : text}
  </button>
}