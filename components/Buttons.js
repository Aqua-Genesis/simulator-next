'use client'
export function Button({text, onClick, style}) {
  return (
    <button
      className="default text-xl text-gray-900 bg-blue2 px-6 py-2 rounded-full"
      onClick={onClick}
      style={style}
    >
      {text}
    </button>
  )
}