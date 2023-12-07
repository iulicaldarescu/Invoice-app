import "./App.css";
import supabase from "./config/supabaseClient";
import Header from "./Components/Headers";
import Invoices from "./Components/Invoices";
import { Routes, Route, useNavigate } from "react-router-dom";
import InvoicePage from "./Components/InvoicePage";
import { useEffect, useState } from "react";
import useUserId from "./stores/UserId";
import EditInvoice from "./Components/EditInvoice";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import UserProfile from "./Components/UserProfile";

function App() {
  const { userId } = useUserId();

  const [fetchError, setFetchError] = useState(null);

  //state to act like database
  const [invoices, setInvoices] = useState(null);

  //flag to update the main page
  const [flagToUpdateMainPage, setFlagToUpdateMainPage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const { data, error } = await supabase.from("invoices").select();

        if (error) {
          setFetchError(`Could not fetch invoices: ${error.message}`);
          setInvoices(null);
          console.error(error);
        }

        if (data) {
          setInvoices(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchInvoices();
  }, [flagToUpdateMainPage]);

  //function to logout

  return (
    <div className="">
      {/* <Invoices path='/'></Invoices> */}
      <Routes>
        <Route path={"/register"} element={<Register />}></Route>
        <Route path={"/"} element={<Login />}></Route>

        <Route
          path="/home"
          element={
            <>
              <Header />{" "}
              <Invoices fetchError={fetchError} invoices={invoices} />
            </>
          }
        />

        <Route
          path={`/invoice/:id`}
          element={
            <>
              <Header />{" "}
              <InvoicePage
                invoices={invoices}
                setInvoices={setInvoices}
                flagToUpdateMainPage={flagToUpdateMainPage}
                setFlagToUpdateMainPage={setFlagToUpdateMainPage}
              />
            </>
          }
        ></Route>

        <Route
          path={`/edit-invoice`}
          element={
            <>
              <Header />
              <EditInvoice invoices={invoices} />
            </>
          }
        ></Route>

        <Route
          path="/user-info"
          element={
            <>
              <Header />
              <UserProfile />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
