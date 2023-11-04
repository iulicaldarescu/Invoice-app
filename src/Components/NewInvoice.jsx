import { FaTrashAlt } from "react-icons/fa";

function NewInvoice() {
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
              type="text"
              className="rounded-lg p-2 text-blue-500 bg-[#1e2139]"
            ></input>
          </div>

          <div className="flex gap-6">
            <div className=" flex flex-col">
              <label>City</label>
              <input className="w-full rounded-lg p-2 bg-[#1e2139]"></input>
            </div>

            <div className=" flex flex-col">
              <label>Post Code</label>
              <input className="w-full rounded-lg p-2 bg-[#1e2139]"></input>
            </div>

            <div className=" flex flex-col">
              <label>Country</label>
              <input className="w-full rounded-lg p-2 bg-[#1e2139]"></input>
            </div>
          </div>

          {/* bill to */}
          <div className="py-6">
            <p>Bill To</p>
            <test>das</test>
          </div>
          <div className="">
            <div className=" flex flex-col">
              <label>Client Name</label>
              <input
                type="text"
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label>Client Email</label>
              <input
                type="text"
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label>Client Address</label>
              <input
                type="text"
                className="w-full rounded-lg p-2 bg-[#1e2139]"
              ></input>
            </div>

            <div className="flex gap-6">
              <div className=" flex flex-col">
                <label>City</label>
                <input className="w-full rounded-lg p-2 bg-[#1e2139]"></input>
              </div>

              <div className=" flex flex-col">
                <label>Post Code</label>
                <input className="w-full rounded-lg p-2 bg-[#1e2139]"></input>
              </div>

              <div className=" flex flex-col">
                <label>Country</label>
                <input className="w-full rounded-lg p-2 bg-[#1e2139]"></input>
              </div>
            </div>

            {/*dates */}
            <div className="flex flex-col">
              {/* container for invoice date and payment terms */}
              <div className="flex gap-6">
                <div>
                  <label>Invoice Date</label>
                  <input
                    type="date"
                    className="w-full rounded-lg p-2 bg-[#1e2139]"
                    placeholder="mm/dd/yyyy"
                  ></input>
                </div>
                <div>
                  <label htmlFor="terms">Payment Terms</label>
                  <select
                    className="w-full rounded-lg p-2 bg-[#1e2139] border-b-[3px] border-[#1e2139]"
                    id="terms"
                    name="terms"
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
              <div className="flex  justify-between border-b-2 border-b-slate-100 pb-3">
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
                  <FaTrashAlt size={"1.3rem"} />
                </div>
              </div>

              {/* potential component up */}
            </div>
            <div className="text-center rounded-lg bg-black py-2 mt-6">
              <button className="">+ Add new Item</button>
            </div>
          </div>
        </form>
      </div>

      {/* save and discard buttons */}
      <div className="flex justify-between basis-1/6">
        <button className=" bg-[#1e2139] px-4 h-1/4 m-auto rounded-full ">
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
