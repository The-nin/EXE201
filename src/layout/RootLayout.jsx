import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import rl from "./styles/RootLayout.module.scss";

function RootLayout() {
  return (
    <div className={rl["root-layout"]}>
      <div className={rl["header"]}>
        <Header />
      </div>

      <main className={rl["main"]}>
        <Outlet />
      </main>

      <div className={rl["footer"]}>
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout;
