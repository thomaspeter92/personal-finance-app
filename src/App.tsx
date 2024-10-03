import { Route, Routes } from "react-router";
import Sidebar from "./components/Sidebar";
import Overview from "./views/Overview";
import Bills from "./views/Bills";
import Budgets from "./views/Budgets";
import Pots from "./views/Pots";
import Transactions from "./views/Transactions";
import MobileBar from "./components/MobileBar";

function App() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <MobileBar />
      <main className="p-5 sm:px-8 flex-1 w-screen">
        <Routes>
          <Route path="/" element={<Overview />}></Route>
          <Route path="/bills" element={<Bills />}></Route>
          <Route path="/budgets" element={<Budgets />}></Route>
          <Route path="/pots" element={<Pots />}></Route>
          <Route path="/transactions" element={<Transactions />}></Route>
        </Routes>
        <div className="h-20 w-full md:hidden"></div>
      </main>
    </div>
  );
}

export default App;
