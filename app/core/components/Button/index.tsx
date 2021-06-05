interface buttonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const PrimaryButton: React.FC<buttonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white max-h-10  hover:text-black px-4 rounded-md text-center text-primary font-medium focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
    >
      {children}
    </button>
  )
}
const exportObject = { PrimaryButton }
export default exportObject
