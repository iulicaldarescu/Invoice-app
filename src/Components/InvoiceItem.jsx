import { FaTrashAlt } from "react-icons/fa";
import { useFormik } from "formik";
import { useState } from "react";

function InvoiceItem({
  id,
  invoiceItems,
  setInvoiceItems,
  itemsArray,
  setItemsArray,
  setItemsDetailsObj,
}) {
  const [inputDisabled, setInputDisabled] = useState(false);

  const deleteInvoiceItem = (indexToDelete) => {
    const newArr = invoiceItems.filter((item) => {
      return indexToDelete !== item;
    });
    setInvoiceItems(newArr);
    const newUpdateItemsArray = itemsArray.filter((item, index) => {
      console.log(index);
      console.log(indexToDelete);
      return item.id !== indexToDelete;
    });
    console.log(newUpdateItemsArray);
    setItemsArray(newUpdateItemsArray);

    console.log(itemsArray);
  };

  // Formik
  const formik = useFormik({
    initialValues: {
      id: null,
      itemName: "",
      itemQty: "",
      itemPrice: "",
      itemTotal: "",
    },
  });

  //const itemQuantity = parseInt(formik.values.itemQty
  const confirmInvoiceItemDetails = (e) => {
    e.preventDefault();

    const invoiceItemDetails = {
      id: id,
      itemName: formik.values.itemName,
      itemQty: formik.values.itemQty,
      itemPrice: formik.values.itemPrice,
      itemTotal:
        formik.values.itemQty * formik.values.itemPrice > 0
          ? formik.values.itemQty * formik.values.itemPrice
          : 0,
    };

    setItemsArray([...itemsArray, invoiceItemDetails]);

    setInputDisabled(true);

    console.log(itemsArray);
  };

  return (
    // if not works puthi below back in potential component
    <div className="flex justify-between border-b-2 border-b-slate-100 pb-3">
      <div className=" flex flex-wrap gap-3">
        <div className="flex flex-col">
          <label>Item Name</label>
          <input
            onChange={formik.handleChange}
            name="itemName"
            className={` rounded-lg p-2 max-w-[15rem] bg-[#1e2139]`}
            disabled={inputDisabled}
          ></input>
        </div>

        <div className="flex flex-col">
          <label>Qty.</label>
          <input
            onChange={formik.handleChange}
            name="itemQty"
            placeholder="1"
            type="number"
            className=" rounded-lg p-2 max-w-[3rem] bg-[#1e2139]"
            disabled={inputDisabled}
          ></input>
        </div>

        <div className="flex flex-col">
          <label>Price</label>
          <input
            onChange={formik.handleChange}
            name="itemPrice"
            placeholder="0"
            type="number"
            className=" rounded-lg p-2 max-w-[6rem] bg-[#1e2139]"
            disabled={inputDisabled}
          ></input>
        </div>

        <div className="flex flex-col">
          <label>Total</label>
          <p
            name="itemTotal"
            placeholder="0"
            className=" rounded-lg p-2 max-w-[3rem] bg-[#1e2139]"
          >
            {formik.values.itemQty * formik.values.itemPrice > 0
              ? formik.values.itemQty * formik.values.itemPrice
              : 0}
          </p>
        </div>
        <div className="flex flex-col items-center justify-end">
          <button
            className="bg-green-600 p-2 rounded-lg"
            onClick={confirmInvoiceItemDetails}
          >
            Confirm
          </button>
        </div>
      </div>

      {/* trash icon */}
      <div className="flex items-end pb-2">
        <FaTrashAlt onClick={() => deleteInvoiceItem(id)} size={"1.3rem"} />
      </div>
    </div>
  );
}

export default InvoiceItem;
