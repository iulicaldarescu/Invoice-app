import { FaTrashAlt } from "react-icons/fa";
import useUserId from "../stores/UserId";
import jsonFile from "./db.json";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function EditInvoice() {
  const { userId } = useUserId();
  const [newItemsArr, setNewItemsArr] = useState([]);

  //here we get the object from database using the id we got from click on a invoice

  const invoiceObjectToEdit = jsonFile.data.filter((object) => {
    return object.id === userId;
  });

  // get the initial values in this state

  useEffect(() => {
    setNewItemsArr([...invoiceObjectToEdit[0].items]);
  }, []);

  //---------------------------

  const formik = useFormik({
    initialValues: {
      createdAt: invoiceObjectToEdit[0].createdAt,
      paymentDue: invoiceObjectToEdit[0].paymentDue,
      description: invoiceObjectToEdit[0].description,
      paymentTerms: invoiceObjectToEdit[0].paymentTerms,
      clientName: invoiceObjectToEdit[0].clientName,
      clientEmail: invoiceObjectToEdit[0].clientEmail,
      status: invoiceObjectToEdit[0].status,
      senderAddress: {
        street: invoiceObjectToEdit[0].senderAddress.street,
        city: invoiceObjectToEdit[0].senderAddress.city,
        postCode: invoiceObjectToEdit[0].senderAddress.postCode,
        country: invoiceObjectToEdit[0].senderAddress.country,
      },
      clientAddress: {
        street: invoiceObjectToEdit[0].clientAddress.street,
        city: invoiceObjectToEdit[0].clientAddress.city,
        postCode: invoiceObjectToEdit[0].clientAddress.postCode,
        country: invoiceObjectToEdit[0].clientAddress.country,
      },
      items: "",
    },

    onSubmit: (values) => {
      // Handle form submission or update your state here.
    },
  });

  useEffect(() => {
    formik.setFieldValue("items", newItemsArr);
  }, [newItemsArr]);

  //function to calculate the total payment of all invoice items
  const getTotalInvoiceItemsPrices = () => {
    const total = newItemsArr.reduce((acc, curr) => {
      return acc + curr.total;
    }, 0);
    return total;
  };

  const test = () => {
    // console.log("invoiceObjectToEdit[0].items", invoiceObjectToEdit[0].items);
    console.log("newItemsArray", newItemsArr);
    console.log(getTotalInvoiceItemsPrices());
  };

  // here we are creating a function which updates the database with updated values
  const updateAllData = async () => {
    const updatedItem = invoiceObjectToEdit.find((item) => item.id === userId);

    if (!updatedItem) {
      console.error("Item not found for update");
      return;
    }

    const updatedData = {
      ...updatedItem,
      createdAt: formik.values.createdAt,
      paymentDue: formik.values.paymentDue,
      description: formik.values.description,
      paymentTerms: formik.values.paymentTerms,
      clientName: formik.values.clientName,
      total: getTotalInvoiceItemsPrices(),
      clientEmail: formik.values.clientEmail,
      status: formik.values.status,
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
      items: formik.values.items,
    };

    console.log("Updated Data", updatedData);

    try {
      const response = await fetch(`http://localhost:3001/data/${userId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const responseData = await response.json();
      console.log("Response", responseData);
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  //this creates a new spot in the array so another div with inputs appears

  const addNewItem = async (e) => {
    e.preventDefault();

    const newItem = {
      id: uuidv4(),
      name: "",
      quantity: null,
      price: null,
      total: null,
    };

    setNewItemsArr([...newItemsArr, newItem]);
  };

  // confirm item button function
  const handleItemConfirm = (object) => {
    const updatedItemsArr = newItemsArr.map((item) => {
      if (item.id === object.id) {
        const updatedItem = {
          ...item,
          name: object.name,
          quantity: parseFloat(object.quantity),
          price: parseFloat(object.price),
        };
        updatedItem.total = updatedItem.quantity * updatedItem.price;
        return updatedItem;
      }
      return item;
    });
    setNewItemsArr(updatedItemsArr);
  };

  // prevent default form behaviour
  const preventDefaultFct = (e) => {
    e.preventDefault();
  };

  // function to delete item from the items array
  const deleteItem = (id, index) => {
    const newArr = newItemsArr.filter((item) => {
      return item.id !== id;
    });

    setNewItemsArr(newArr);
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#141625] flex flex-col text-white px-4">
      <div className="basis-1/6 ">
        <p className="text-2xl font-bold py-10">Edit Invoice</p>
      </div>

      {/* form for invoice details */}
      <div className="basis-4/6 bg-[#141625] overflow-auto pl-1">
        {/* bill from */}
        <form onSubmit={preventDefaultFct}>
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
                value={formik.values.clientName}
                type="text"
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label>Client Email</label>
              <input
                onChange={formik.handleChange}
                name="clientEmail"
                value={formik.values.clientEmail}
                type="text"
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label>Client Address</label>
              <input
                onChange={formik.handleChange}
                name="clientAddress.street"
                value={formik.values.clientAddress.street}
                type="text"
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
                    name="createdAt"
                    value={formik.values.createdAt}
                    type="date"
                    className="w-full rounded-lg p-2 bg-[#1e2139]"
                    placeholder="mm/dd/yyyy"
                  ></input>
                </div>
                <div>
                  <label htmlFor="terms">Payment Terms</label>
                  <select
                    onChange={formik.handleChange}
                    name="paymentTerms"
                    className="w-full rounded-lg p-2 bg-[#1e2139] border-b-[3px] border-[#1e2139]"
                    id="terms"
                  >
                    <option value={formik.values.paymentTerms}>
                      {formik.values.paymentTerms}
                    </option>
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
                  value={formik.values.description}
                  className="w-full rounded-lg p-2 bg-[#1e2139]"
                  type="text"
                ></input>
              </div>
            </div>

            {/* Item list container */}
            <div>
              <div>
                <p onClick={test}>Item List</p>
              </div>

              {/* potential component down */}
              {/* item name + quantity container */}

              {newItemsArr.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex  justify-between border-b-2 border-b-slate-100 pb-3"
                  >
                    <div className=" flex flex-wrap gap-3">
                      <div className="flex flex-col">
                        <label>Item Name</label>
                        <input
                          name={`items[${index}.name]`}
                          onChange={formik.handleChange}
                          value={formik.values.items[index]?.name || ""}
                          className="rounded-lg p-2 max-w-[15rem] bg-[#1e2139]"
                        ></input>
                      </div>

                      <div className="flex flex-col">
                        <label>Qty.</label>
                        <input
                          name={`items[${index}.quantity]`}
                          onChange={formik.handleChange}
                          value={formik.values.items[index]?.quantity || ""}
                          placeholder="1"
                          className=" rounded-lg p-2 max-w-[3rem] bg-[#1e2139]"
                        ></input>
                      </div>

                      <div className="flex flex-col">
                        <label>Price</label>
                        <input
                          name={`items[${index}.price]`}
                          onChange={formik.handleChange}
                          value={formik.values.items[index]?.price || ""}
                          placeholder="0"
                          className=" rounded-lg p-2 max-w-[6rem] bg-[#1e2139]"
                        ></input>
                      </div>

                      <div className="flex flex-col">
                        <label>Total</label>
                        <input
                          value={
                            parseFloat(formik.values.items[index]?.price) *
                              parseFloat(
                                formik.values.items[index]?.quantity
                              ) || ""
                          }
                          disabled
                          placeholder="0"
                          className=" rounded-lg p-2 max-w-[3rem] bg-[#1e2139]"
                        ></input>
                      </div>
                      <div className="flex flex-col items-center justify-end">
                        <button
                          onClick={() =>
                            handleItemConfirm(formik.values.items[index])
                          }
                          className="bg-green-600 p-2 rounded-lg"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                    {/* trash icon */}
                    <div
                      onClick={() => deleteItem(item.id)}
                      className="flex items-end pb-2"
                    >
                      <FaTrashAlt size={"1.3rem"} />
                    </div>
                  </div>
                );
              })}

              {/* potential component up */}
            </div>
            <div className="text-center rounded-lg bg-black py-2 mt-6">
              <button onClick={addNewItem}>+ Add new Item</button>
            </div>
          </div>
        </form>
      </div>

      {/* save and discard buttons */}
      <div className="flex justify-between basis-1/6">
        <button className=" bg-[#1e2139] px-4 h-1/4 m-auto rounded-full ">
          Discard
        </button>
        <button
          className="bg-[#7c5dfa] px-4 h-1/4 m-auto rounded-full"
          onClick={updateAllData}
        >
          Save & Send
        </button>
      </div>
    </div>
  );
}

export default EditInvoice;
