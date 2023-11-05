import { useEffect, useState } from "react";
import { useFormik } from "formik";
import InvoiceItem from "./InvoiceItem";
function NewInvoice({ setNewInvoiceModalOpen }) {
  const [invoiceItems, setInvoiceItems] = useState([1]);

  // to be reviewd

  // const [newInvoiceInfo, setNewInvoiceInfo] = useState({
  //   id: "",
  //   createdAt: "",
  //   paymentDue: "",
  //   description: "",
  //   paymentTerms: null,
  //   clientName: "",
  //   clientEmail: "",
  //   status: "",
  //   senderAddress: {
  //     street: "",
  //     city: "",
  //     postCode: "",
  //     country: "",
  //   },
  //   clientAddress: {
  //     street: "",
  //     city: "",
  //     postCode: "",
  //     country: "",
  //   },
  //   items: [
  //     {
  //       name: "",
  //       quantity: null,
  //       price: null,
  //       total: null,
  //     },
  //   ],
  //   total: null,
  // });

  const formik = useFormik({
    initialValues: {
      clientName: "",
    },

    onSubmit: (values) => {
      // Handle form submission or update your state here.
      // to be continued
    },
  });

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setNewInvoiceInfo({ ...newInvoiceInfo, [name]: value });
  //   formik.handleChange(name);
  // };

  // useEffect(() => {
  //   console.log("Updated newInvoiceInfo:", newInvoiceInfo);
  // }, [newInvoiceInfo.clientName]);

  // prevent submit action
  const preventSubmit = (event) => {
    event.preventDefault();
  };

  const incrementInvoiceItemsArray = () => {
    const newItemId = Date.now(); // this is mandatory for deleting to work properly
    setInvoiceItems([...invoiceItems, newItemId]);
  };

  const getInputData = () => {
    console.log("ma-ta");
  };

  // we had a situation that when clicking the trash for a specific item it deleted only
  // the last item within aray no matter on which item tras we clicked
  // solution to set randomly unique item id and assigning to key and id the item itself
  // id={invoiceItem}
  // key={invoiceItem}

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#141625] flex flex-col text-white px-4">
      <div className="basis-1/6 ">
        <p className="text-2xl font-bold py-10">Create Invoice</p>
      </div>

      {/* form for invoice details */}
      <div className="basis-4/6 bg-[#141625] overflow-auto pl-1">
        {/* bill from */}
        <form>
          <div>
            <p>Bill Form</p>
          </div>
          <div className="flex flex-col">
            <label>Street Address</label>
            <input
              onChange={getInputData}
              name="senderAddress.street"
              type="text"
              className="rounded-lg p-2 text-blue-500 bg-[#1e2139]"
            ></input>
          </div>

          <div className="flex gap-6">
            <div className=" flex flex-col">
              <label>City</label>
              <input
                name="senderAddress.city"
                onChange={getInputData}
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label>Post Code</label>
              <input
                onChange={getInputData}
                name="senderAddress.postCode"
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label>Country</label>
              <input
                onChange={getInputData}
                name="senderAddress.country"
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>
          </div>

          {/* bill to */}
          <div className="py-6">
            <p>Bill To</p>
          </div>
          <div className="">
            <div className=" flex flex-col">
              <label>Client Name</label>
              <input
                onChange={handleChange}
                name="clientName"
                type="text"
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label>Client Email</label>
              <input
                onChange={getInputData}
                name="clientEmail"
                type="text"
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label>Client Address</label>
              <input
                onChange={getInputData}
                type="text"
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className="flex gap-6">
              <div className=" flex flex-col">
                <label>City</label>
                <input
                  onChange={getInputData}
                  name="clientAddress.city"
                  className="w-full rounded-lg p-2 bg-[#1e2139]"
                ></input>
              </div>

              <div className=" flex flex-col">
                <label>Post Code</label>
                <input
                  onChange={getInputData}
                  name="clientAddress.postCode"
                  className="w-full rounded-lg p-2 bg-[#1e2139]"
                ></input>
              </div>

              <div className=" flex flex-col">
                <label>Country</label>
                <input
                  onChange={getInputData}
                  name="clientAddress.country"
                  className="w-full rounded-lg p-2 bg-[#1e2139]"
                ></input>
              </div>
            </div>

            {/*dates */}
            <div className="flex flex-col">
              {/* container for invoice date and payment terms */}
              <div className="flex gap-6">
                <div>
                  <label>Invoice Date</label>
                  <input
                    onChange={getInputData}
                    name="createdAt"
                    type="date"
                    className="w-full rounded-lg p-2 bg-[#1e2139]"
                    placeholder="mm/dd/yyyy"
                  ></input>
                </div>
                <div>
                  <label htmlFor="terms">Payment Terms</label>
                  <select
                    onChange={getInputData}
                    className="w-full rounded-lg p-2 bg-[#1e2139] border-b-[3px] border-[#1e2139]"
                    id="terms"
                    name="paymentTerms"
                  >
                    <option value="1">Next day</option>
                    <option value="7">Next 7 days</option>
                    <option value="14">Next 14 days</option>
                    <option value="30">Next 30 days</option>
                  </select>
                </div>
              </div>
              {/* description container */}
              <div>
                <label>Description</label>
                <input
                  onChange={getInputData}
                  name="description"
                  className="w-full rounded-lg p-2 bg-[#1e2139]"
                  type="text"
                ></input>
              </div>
            </div>

            {/* Item list container */}
            <div>
              <div>
                <p>Item List</p>
              </div>

              {/* potential component down */}

              {/* item name + quantity container */}
              {invoiceItems.map((invoiceItem, index) => {
                return (
                  <InvoiceItem
                    id={invoiceItem}
                    key={invoiceItem} // this is mandatory for deleting to work properly
                    invoiceItems={invoiceItems}
                    setInvoiceItems={setInvoiceItems}
                    setNewInvoiceInfo={setNewInvoiceInfo}
                    newInvoiceInfo={newInvoiceInfo}
                  />
                );
              })}
              {/* potential component up */}
            </div>
            <div className="text-center rounded-lg bg-black py-2 mt-6">
              <button onClick={incrementInvoiceItemsArray} className="">
                + Add new Item
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* save and discard buttons */}
      <div className="flex justify-between basis-1/6">
        <button
          onClick={() => setNewInvoiceModalOpen(false)}
          className=" bg-[#1e2139] px-4 h-1/4 m-auto rounded-full "
        >
          Discard
        </button>
        <button className="bg-[#7c5dfa] px-4 h-1/4 m-auto rounded-full">
          Save & Send
        </button>
      </div>
    </div>
  );
}

export default NewInvoice;
