import { Button } from "@danalazar/metro-ui";
import { NavLink } from "react-router";
import { MetroLogo } from "../../assets/metro-logo";

const HeaderContent = () => {
  return (
    <header className="w-full bg-[#003d7a] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MetroLogo />
        </div>
        <nav className="flex items-center gap-3">
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
