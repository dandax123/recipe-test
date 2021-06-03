interface buttonProps {
  text: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const PrimaryButton: React.FC<buttonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white max-h-10 hover:text-black px-4 rounded-md text-center text-primary font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
    >
      {text}
    </button>
  )
}

{
  /* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg> */
}
export default { PrimaryButton }
