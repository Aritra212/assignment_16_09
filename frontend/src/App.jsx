import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-[calc(100vh-160px)] flex justify-center items-center">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
