import { Button } from "@danalazar/metro-ui";
import { NavLink } from "react-router";
import { MetroLogo } from "../../assets/metro-logo";

const HeaderContent = () => {
  return (
    <header className="w-full bg-[var(--color-dark)] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
        {/* Logo */}
        <div className="flex justify-center w-full sm:justify-start sm:w-auto">
          <MetroLogo />
        </div>

        {/* Navigation */}
        <nav className="flex justify-center gap-3 w-full sm:w-auto sm:justify-start sm:flex-row">
          <NavLink to="/">
            {({ isActive }) => (
              <Button variant={isActive ? "primary" : "ghost"}>
                Calculator
              </Button>
            )}
          </NavLink>
          <NavLink to="/rezultate">
            {({ isActive }) => (
              <Button variant={isActive ? "primary" : "ghost"}>
                Rezultate
              </Button>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default HeaderContent;
