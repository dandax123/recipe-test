import Link from "next/link"
export default function NavItem({ href, isActive, children }) {
  return (
    <li>
      <Link href={href}>
        <a
          className={`block px-4 py-2 rounded-md font-extralight  text-white ${
            isActive ? "bg-blue-100 text-blue-700" : ""
          }`}
        >
          {children}
        </a>
      </Link>
    </li>
  )
}
