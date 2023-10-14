import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainTemplate = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto py-8">
        <Outlet />
      </main>
    </>
  );
};

export default MainTemplate;
