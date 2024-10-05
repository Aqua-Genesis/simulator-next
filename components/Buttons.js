'use client'
export function Button({text, onClick}) {
  return (
    <button
      className="default text-2xl bg-green4 px-4 py-1 rounded-full mt-2"
      onClick={onClick}
    >
      {text}
    </button>
  )
}