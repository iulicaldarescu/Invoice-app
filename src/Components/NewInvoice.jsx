import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router";
import InvoiceItem from "./InvoiceItem";
import supabase from "../config/supabaseClient";

function NewInvoice({ setNewInvoiceModalOpen, invoices }) {
  const [invoiceItems, setInvoiceItems] = useState([1]);
  const [itemsArray, setItemsArray] = useState([]);
  const [itemsDetailsObj, setItemsDetailsObj] = useState({});

  const navigate = useNavigate();

  const getTotalFromAllItems = itemsArray.reduce((acc, curr) => {
    return acc + curr.total;
  }, 0);

  console.log(itemsArray);
  console.log(getTotalFromAllItems);

  const formik = useFormik({
    initialValues: {
      createdAt: "",
      paymentDue: "",
      description: "",
      paymentTerms: "",
      clientName: "",
      clientEmail: "",
      status: "",
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      items: [{}],
    },

    onSubmit: (values) => {
      // Handle form submission or update your state here.
    },
  });

  const incrementInvoiceItemsArray = (event) => {
    event.preventDefault();
    const newItemId = Date.now(); // this is mandatory for deleting to work properly
    setInvoiceItems([...invoiceItems, newItemId]);
  };

  const originalDate = new Date(formik.values.createdAt);
  const newDate = new Date(
    originalDate.getTime() + formik.values.paymentTerms * 24 * 60 * 60 * 1000
  );

  const createNewInvoiceDetails = async () => {
    const { error } = await supabase.from("invoices").insert({
      createdAt: formik.values.createdAt,
      paymentDue: newDate,
      description: formik.values.description,
      paymentTerms: formik.values.paymentTerms,
      clientName: formik.values.clientName,
      clientEmail: formik.values.clientEmail,
      status: formik.values.status,
      total: getTotalFromAllItems,
      senderAddress: {
        street: formik.values.senderAddress.street,
        city: formik.values.senderAddress.city,
        postCode: formik.values.senderAddress.postCode,
        country: formik.values.senderAddress.country,
      },
      clientAddress: {
        street: formik.values.clientAddress.street,
        city: formik.values.clientAddress.city,
        postCode: formik.values.clientAddress.postCode,
        country: formik.values.clientAddress.country,
      },
      items: [...itemsArray],
    });
  };

  // we had a situation that when clicking the trash for a specific item it deleted only
  // the last item within aray no matter on which item tras we clicked
  // solution to set randomly unique item id and assigning to key and id the item itself
  // id={invoiceItem}
  // key={invoiceItem}

  // test this is for real time console log !!!!!!!!!!
  useEffect(() => {
    console.log(itemsArray);
  }, [itemsArray]);

  const goToMainPage = () => {
    navigate("/");
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#141625] flex flex-col text-white px-4">
      <div className="basis-1/6 ">
        <p className="text-2xl font-bold py-10">Create Invoice</p>
      </div>

      {/* form for invoice details */}
      <div className="basis-4/6 bg-[#141625] overflow-auto pl-1">
        {/* bill from */}
        <form onSubmit={formik.values.handleSubmit}>
          <div>
            <p>Bill Form</p>
          </div>
          <div className="flex flex-col">
            <label>Street Address</label>
            <input
              onChange={formik.handleChange}
              name="senderAddress.street"
              value={formik.values.senderAddress.street}
              type="text"
              className="rounded-lg p-2 text-blue-500 bg-[#1e2139]"
            ></input>
          </div>

          <div className="flex gap-6">
            <div className=" flex flex-col">
              <label>City</label>
              <input
                onChange={formik.handleChange}
                name="senderAddress.city"
                value={formik.values.senderAddress.city}
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label>Post Code</label>
              <input
                onChange={formik.handleChange}
                name="senderAddress.postCode"
                value={formik.values.senderAddress.postCode}
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label>Country</label>
              <input
                onChange={formik.handleChange}
                name="senderAddress.country"
                value={formik.values.senderAddress.country}
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
                onChange={formik.handleChange}
                name="clientName"
                values={formik.values.clientName}
                type="text"
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label>Client Email</label>
              <input
                onChange={formik.handleChange}
                name="clientEmail"
                values={formik.values.clientEmail}
                type="email"
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className=" flex flex-col">
              <p>Client Address</p>
              <label>Street</label>
              <input
                onChange={formik.handleChange}
                type="text"
                name="clientAddress.street"
                values={formik.values.clientAddress.street}
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className="flex gap-6">
              <div className=" flex flex-col">
                <label>City</label>
                <input
                  onChange={formik.handleChange}
                  name="clientAddress.city"
                  value={formik.values.clientAddress.city}
                  className="w-full rounded-lg p-2 bg-[#1e2139]"
                ></input>
              </div>

              <div className=" flex flex-col">
                <label>Post Code</label>
                <input
                  onChange={formik.handleChange}
                  name="clientAddress.postCode"
                  value={formik.values.clientAddress.postCode}
                  className="w-full rounded-lg p-2 bg-[#1e2139]"
                ></input>
              </div>

              <div className=" flex flex-col">
                <label>Country</label>
                <input
                  onChange={formik.handleChange}
                  name="clientAddress.country"
                  value={formik.values.clientAddress.country}
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
                    onChange={formik.handleChange}
                    value={formik.values.createdAt}
                    name="createdAt"
                    type="date"
                    className="w-full rounded-lg p-2 bg-[#1e2139]"
                    placeholder="mm/dd/yyyy"
                  ></input>
                </div>
                <div>
                  <label htmlFor="terms">Payment Terms</label>
                  <select
                    onChange={formik.handleChange}
                    className="w-full rounded-lg p-2 bg-[#1e2139] border-b-[3px] border-[#1e2139]"
                    name="paymentTerms"
                    value={formik.values.paymentTerms}
                  >
                    <option value="">Select day</option>
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
                  onChange={formik.handleChange}
                  name="description"
                  values={formik.values.description}
                  className="w-full rounded-lg p-2 bg-[#1e2139]"
                  type="text"
                ></input>
              </div>
              {/* Status of inveoice select */}
              <div>
                <label htmlFor="status">Status</label>
                <select
                  onChange={formik.handleChange}
                  className="w-full rounded-lg p-2 bg-[#1e2139] border-b-[3px] border-[#1e2139]"
                  name="status"
                  value={formik.values.status}
                >
                  <option value="">Select status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="draft">Draft</option>
                </select>
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
                    itemsArray={itemsArray}
                    setItemsArray={setItemsArray}
                    setItemsDetailsObj={setItemsDetailsObj}
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
        <button
          onClick={() => {
            createNewInvoiceDetails();
            goToMainPage();
          }}
          className="bg-[#7c5dfa] px-4 h-1/4 m-auto rounded-full"
        >
          Save & Send
        </button>
      </div>
    </div>
  );
}

export default NewInvoice;

// this command was needed to run json
// json-server --watch "src\Components\db.json" --port 3001
