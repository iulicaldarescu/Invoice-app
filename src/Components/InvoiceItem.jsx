import { FaTrashAlt } from "react-icons/fa";
import { useFormik } from "formik";
import { useEffect } from "react";

function InvoiceItem({
  id,
  invoiceItems,
  setInvoiceItems,
  itemsArray,
  setItemsArray,
  setItemsDetailsObj,
  test,
}) {
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

  // const invoiceItemDetails = () => {
  //   const itemDetailsObj = {
  //     id: id,
  //     itemName: formik.values.itemName,
  //     itemQty: formik.values.itemQty,
  //     itemPrice: formik.values.itemPrice,
  //     itemTotal: formik.values.itemTotal,
  //   };

  //   setItemsArray((prevItems) => [...prevItems, itemDetailsObj]);
  // };

  useEffect(() => {
    setItemsDetailsObj({
      id: id,
      itemName: formik.values.itemName,
      itemQty: formik.values.itemQty,
      itemPrice: formik.values.itemPrice,
      itemTotal: formik.values.itemTotal,
    });
  }, [test]);

  return (
    // if not works puthi below back in potential component
    <div className="flex justify-between border-b-2 border-b-slate-100 pb-3">
      <div className=" flex flex-wrap gap-3">
        <div className="flex flex-col">
          <label>Item Name</label>
          <input
            onChange={formik.handleChange}
            name="itemName"
            className=" rounded-lg p-2 max-w-[15rem] bg-[#1e2139]"
          ></input>
        </div>

        <div className="flex flex-col">
          <label>Qty.</label>
          <input
            onChange={formik.handleChange}
            name="itemQty"
            placeholder="1"
            className=" rounded-lg p-2 max-w-[3rem] bg-[#1e2139]"
          ></input>
        </div>

        <div className="flex flex-col">
          <label>Price</label>
          <input
            onChange={formik.handleChange}
            name="itemPrice"
            placeholder="0"
            className=" rounded-lg p-2 max-w-[6rem] bg-[#1e2139]"
          ></input>
        </div>

        <div className="flex flex-col">
          <label>Total</label>
          <input
            onChange={formik.handleChange}
            name="itemTotal"
            placeholder="0"
            className=" rounded-lg p-2 max-w-[3rem] bg-[#1e2139]"
          ></input>
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
