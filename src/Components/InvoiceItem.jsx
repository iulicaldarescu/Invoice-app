import { FaTrashAlt } from "react-icons/fa";

function InvoiceItem({ id, invoiceItems, setInvoiceItems }) {
  const deleteInvoiceItem = (indexToDelete) => {
    const newArr = invoiceItems.filter((item) => {
      return indexToDelete !== item;
    });
    console.log(newArr);
    setInvoiceItems(newArr);
  };

  return (
    // if not works puthi below back in potential component
    <div className="flex justify-between border-b-2 border-b-slate-100 pb-3">
      <div className=" flex flex-wrap gap-3">
        <div className="flex flex-col">
          <label>Item Name</label>
          <input className=" rounded-lg p-2 max-w-[15rem] bg-[#1e2139]"></input>
        </div>

        <div className="flex flex-col">
          <label>Qty.</label>
          <input
            placeholder="1"
            className=" rounded-lg p-2 max-w-[3rem] bg-[#1e2139]"
          ></input>
        </div>

        <div className="flex flex-col">
          <label>Price</label>
          <input
            placeholder="0"
            className=" rounded-lg p-2 max-w-[6rem] bg-[#1e2139]"
          ></input>
        </div>

        <div className="flex flex-col">
          <label>Total</label>
          <input
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
