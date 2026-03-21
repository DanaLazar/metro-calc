import HeaderContent from "./HeaderContent";
import backgroundImage from "../../assets/background.jpg";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <HeaderContent />

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
