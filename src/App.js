import "./App.css";
import Header from "./Components/Headers";
import Invoices from "./Components/Invoices";
import { Routes, Route, Link } from "react-router-dom";
import InvoicePage from "./Components/InvoicePage";
import { useEffect, useState } from "react";
import useUserId from "./stores/UserId";

function App() {
  const { userId } = useUserId();
  console.log(userId); 

  return (
    <div className="">
      <Header></Header>
      {/* <Invoices path='/'></Invoices> */}
      <Routes>
        <Route path="/" element={<Invoices />} />
        <Route path={`/invoice/:id`} element={<InvoicePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
