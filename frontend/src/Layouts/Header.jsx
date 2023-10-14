import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-8 py-8 bg-gray-200">
      <nav>
        <div className="menu flex gap-4 justify-center text-xl font-semibold">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/users">Users</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
