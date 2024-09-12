import { Route, Routes } from "react-router";
import Sidebar from "./components/Sidebar";
import Overview from "./views/Overview";
import Bills from "./views/Bills";
import Budgets from "./views/Budgets";
import Pots from "./views/Pots";
import Transactions from "./views/Transactions";

function App() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="p-5 px-8 flex-1">
        <Routes>
          <Route path="/" element={<Overview />}></Route>
          <Route path="/bills" element={<Bills />}></Route>
          <Route path="/budgets" element={<Budgets />}></Route>
          <Route path="/pots" element={<Pots />}></Route>
          <Route path="/transactions" element={<Transactions />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
