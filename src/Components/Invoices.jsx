import { useEffect, useState } from "react";
import { ImPlus } from "react-icons/im";
import Invoice from "../Components/Invoice";
import NewInvoice from "./NewInvoice";
import arrowDown from "../assets/icon-arrow-down.svg";
import data from "./data.json";
import "../styles/invoices.css";
import useUserId from "../stores/UserId";

function Invoices() {
  // filter modal state
  const [filterOpened, setFilterOpened] = useState(false);

  const [statusFiltersArray, setStatusFiltersArray] = useState([]);

  // New item add modal open state
  const [newInvoiceModalOpen, setNewInvoiceModalOpen] = useState(false);

  const { userId } = useUserId();

  const filterOpener = () => {
    setFilterOpened((prev) => !prev);
  };

  const addStatus = (event) => {
    if (event.target.checked) {
      setStatusFiltersArray([...statusFiltersArray, event.target.name]);
    } else if (!event.target.checked) {
      const newArr = statusFiltersArray.filter((status) => {
        return status !== event.target.name;
      });
      setStatusFiltersArray(newArr);
    }
  };

  useEffect(() => {
    console.log(userId); // This will log the updated `userId`
  }, [userId]);

  const openNewInvoice = () => {
    setNewInvoiceModalOpen((prev) => !prev);
    console.log(newInvoiceModalOpen);
  };

  return (
    <div to="/">
      <div className="bg-[#141625] h-full pt-10 ">
        <div className="flex px-4  gap-8 pb-10">
          {/* INVOICES + FILTER */}

          <div className="flex justify-between basis-5/6 text-white font-bold text-sm ">
            <div className="flex flex-col  justify-center">
              <p className="text-lg">Invoices</p>
              <p>7 items</p>
            </div>

            <div className="flex items-center relative">
              <div className="flex gap-3">
                <p>Filter</p>

                <div className="flex items-center">
                  <img
                    src={arrowDown}
                    className={`h-2 ${
                      filterOpened
                        ? "-rotate-180 transition-transform duration-300 ease-in-out cursor-pointer"
                        : "transition-transform duration-300 ease-in-out cursor-pointer"
                    }`}
                    onClick={filterOpener}
                  ></img>
                </div>
              </div>

              {/* create filter modal */}
              {filterOpened && (
                <div className="absolute bg-[#1e2139] text-white custom-shadow top-16 -left-5 w-36 h-32 z-50 rounded-lg p-4 ">
                  <div className="flex flex-col gap-3 justify-center h-full">
                    <div className="flex items-center">
                      <input
                        onChange={addStatus}
                        type="checkbox"
                        name="paid"
                      ></input>
                      <label for="paid" className="pl-2">
                        paid
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        onChange={addStatus}
                        type="checkbox"
                        name="pending"
                      ></input>
                      <label for="pending" className="pl-2">
                        pending
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        onChange={addStatus}
                        type="checkbox"
                        name="draft"
                      ></input>
                      <label for="draft" className="pl-2">
                        draft
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* INVOICES + FILTER END */}

          {/* NEW */}

          <div className="basis-1/6 flex justify-end">
            <div className="bg-[#7c5df9] p-2 flex items-center justify-center  rounded-full">
              <button
                onClick={openNewInvoice}
                className="h-9 w-9 text-[#7c5df9] bg-white font-extrabold text-2xl rounded-full flex justify-center items-center"
              >
                <ImPlus size={"0.9rem"} />
              </button>
              <p className=" text-white font-bold text-base px-2">New</p>
            </div>
          </div>

          {/* NEW END*/}
        </div>

        <div className="pb-20">
          {data.map((item, index) => {
            if (
              statusFiltersArray.includes(item.status) ||
              statusFiltersArray.length === 0
            ) {
              return (
                <Invoice
                  id={item.id}
                  clientName={item.clientName}
                  paymentDue={item.paymentDue}
                  total={item.total}
                  status={item.status}
                  key={index}
                  setNewInvoiceModalOpen={setNewInvoiceModalOpen}
                />
              );
            }
          })}
        </div>
      </div>

      {/* calling the new Invoice modal component */}
      {newInvoiceModalOpen && (
        <NewInvoice setNewInvoiceModalOpen={setNewInvoiceModalOpen} />
      )}
    </div>
  );
}

export default Invoices;
