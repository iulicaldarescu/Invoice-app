import "./App.css";
import supabase from "./config/supabaseClient";
import Header from "./Components/Headers";
import Invoices from "./Components/Invoices";
import { Routes, Route, Link } from "react-router-dom";
import InvoicePage from "./Components/InvoicePage";
import { useEffect, useState } from "react";
import useUserId from "./stores/UserId";
import EditInvoice from "./Components/EditInvoice";
import { setIn } from "formik";
import Register from "./Authentication/Register";


function App() {
  const { userId } = useUserId();
  console.log("userID is:", userId);
  console.log("I am supabase", supabase);

  const [fetchError, setFetchError] = useState(null);

  //state to act like database
  const [invoices, setInvoices] = useState(null);

  //flag to update the main page
  const [flagToUpdateMainPage, setFlagToUpdateMainPage] = useState(false);

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

  return (
    
    
    <div className="">
    
     
      
      {/* <Invoices path='/'></Invoices> */}
      <Routes>

        <Route path={'/register'} element={ <Register /> }></Route>
        
        <Route
        
          path="/"
          element={ <><Header /> <Invoices fetchError={fetchError} invoices={invoices} /></>} />
       

        <Route
          path={`/invoice/:id`}
          element={
            <InvoicePage
              invoices={invoices}
              setInvoices={setInvoices}
              flagToUpdateMainPage={flagToUpdateMainPage}
              setFlagToUpdateMainPage={setFlagToUpdateMainPage}
            />
          }
        ></Route>

        <Route
          path={`/edit-invoice`}
          element={<EditInvoice invoices={invoices} />}
        ></Route>

      </Routes>
    </div>
    
  );
}

export default App;
