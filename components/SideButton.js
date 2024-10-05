export default function SideButton({text, position, handleClick}) {
  return <button
    className={"default bg-blue2 text-gray-900 text-2xl py-1.5 px-6" + " " + position}
    onClick={handleClick}
  >
    {text}
  </button>
}