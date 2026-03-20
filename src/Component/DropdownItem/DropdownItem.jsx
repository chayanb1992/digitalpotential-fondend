import { NavLink } from "react-router";

export default function DropdownItem({
  to,
  icon: Icon,
  children,
  onClick,
  danger,
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200
        ${
          isActive
            ? "bg-orange-50 text-orange-600"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }
        ${danger ? "text-red-500 hover:bg-red-50 hover:text-red-600" : ""}`
      }
    >
      <Icon size={18} className={danger ? "text-red-500" : "text-gray-400"} />
      {children}
    </NavLink>
  );
}
