import iconArrowLeft from "../assets/icon-arrow-left.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useUserId from "../stores/UserId";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

function InvoicePage({ invoices, setFlagToUpdateMainPage }) {
  const navigate = useNavigate();
  const formatDate = (dateToChange) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateToChange);

    return date.toLocaleDateString(undefined, options);
  };

  const { userId, setUserId } = useUserId();

  const [userInfo, setUserInfo] = useState({
    id: "",
    clientName: "",
    senderAddress: {},
    invoiceDate: "",
    status: "",
    paymentDue: "",
    clientAddress: {},
    clientEmail: "",
    items: [],
    total: "",
  });

  const getData = () => {
    const userInfosArray = invoices?.filter((item) => {
      return item.id === userId;
    });
    setUserInfo({
      ...userInfo,
      id: userInfosArray[0]?.id || "",
      clientName: userInfosArray[0]?.clientName || "",
      senderAddress: userInfosArray[0]?.senderAddress || {},
      invoiceDate: formatDate(userInfosArray[0]?.createdAt) || "",
      paymentDue: formatDate(userInfosArray[0]?.paymentDue) || "",
      status: userInfosArray[0]?.status || "",
      clientAddress: userInfosArray[0]?.clientAddress || "",
      clientEmail: userInfosArray[0]?.clientEmail || "",
      items: userInfosArray[0]?.items || [],
      total: userInfosArray[0]?.total || "",
      // Use optional chaining (?.) for safety
    });

    console.log(userInfo);
  };

  useEffect(() => {
    getData();
    console.log(userInfo); // This will log the updated userInfo
  }, [userId]);

  // ------------------------------------------------------------------------------- DELETE INVOICE COMPLETLY -----------------------------------------------------------------------------------------------

  const deleteInvoice = async (id) => {
    try {
      const { error } = await supabase.from("invoices").delete().eq("id", id);

      if (!error) {
        // Deletion successful, now navigate to the home page
      } else {
        console.error("Error deleting invoice:", error);
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }

    navigate("/home");
  };

  // ------------------------------------------------------------------------------- DELETE INVOICE COMPLETLY -----------------------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------MARK AS PAID FUNTION ----------------------------------------------------------------------------------------------------
  const markAsPaidFunction = (id) => {
    invoices.map(async (item) => {
      if (item.id === id) {
        const { error } = await supabase
          .from("invoices")
          .update({ status: "paid" })
          .eq("id", id);
      }
    });
    setFlagToUpdateMainPage((prev) => !prev);
    setUserInfo({ ...userInfo, status: "paid" });
  };

  //we update the flag here aswell , when we go back to the main page to have the status updated
  const goBackToMainPage = () => {
    setFlagToUpdateMainPage((prev) => !prev);
  };

  return (
    <div className="px-2 bg-[#141625] h-full flex flex-col gap-3 py-3">
      {/* Go back button */}

      <div className="">
        <div className="flex items-center gap-3 py-5">
          <span>
            <img className="h-3" src={iconArrowLeft} alt="arrow left"></img>
          </span>

          <div className="flex justify-between w-full">
            <Link
              to="/"
              className="text-white flex items-center"
              onClick={goBackToMainPage}
            >
              Go back
            </Link>
            <div className="flex gap-2 text-white">
              <Link
                to={`/edit-invoice`}
                className="bg-[#252945] px-3 py-1 text-sm rounded-full active:opacity-80"
              >
                Edit
              </Link>
              <Link>
                <button
                  onClick={() => deleteInvoice(userId)}
                  className="bg-rose-500 px-3 py-1 text-sm rounded-full active:opacity-80"
                >
                  Delete
                </button>
              </Link>

              <button
                className="bg-[#7c5df9] text-sm px-2 py-1 rounded-full active:opacity-80"
                onClick={() => markAsPaidFunction(userId)}
              >
                Mark as paid
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Status container */}

      <div className="flex justify-between w-full bg-[#1f213a] rounded-lg items-center p-5">
        <p className="text-gray-300">Status</p>
        <div
          className={`w-32 p-3 text-center rounded-lg font-semibold ${
            userInfo.status === "paid"
              ? "bg-[#33d69f0f] text-[#33d69f]"
              : userInfo.status === "pending"
              ? "bg-[#ff8f000f] text-[#ff8f00]"
              : userInfo.status === "draft"
              ? "bg-[#dfe3fa0f] text-[#dfe3fa]"
              : "text-[#ff8f00]"
          }`}
        >
          <span className="pr-2">&#9679;</span>
          {userInfo.status}
        </div>
      </div>

      {/* Biggest container */}

      <div className="bg-[#1f213a] px-5 flex flex-col gap-8 py-8 rounded-lg text-gray-400">
        <div className="flex flex-col gap-5">
          <div className="">
            <p className="text-white font-bold">
              <span className="text-[#7c5df9]">#</span>
              {userInfo.id}
            </p>
            <p className="text-gray-500 text-sm">{userInfo.clientName}</p>
          </div>

          <div className="">
            <p>{userInfo.senderAddress.street}</p>
            <p>{userInfo.senderAddress.city}</p>
            <p>{userInfo.senderAddress.postCode}</p>
            <p>{userInfo.senderAddress.country}</p>
          </div>
        </div>

        <div className="flex justify-between text-gray-400">
          {/* first container */}

          <div className="flex flex-col justify-between">
            <div className="pr-10">
              <p>Invoice Date</p>
              <p className="font-bold text-white">{userInfo.invoiceDate}</p>
            </div>

            <div className="">
              <p>Payment Due</p>
              <p className="font-bold text-white">{userInfo.paymentDue}</p>
            </div>
          </div>

          {/* second container */}

          <div className="pr-7">
            <p>Bill to</p>
            <p className="font-bold text-white">{userInfo.clientName}</p>
            <p>{userInfo.clientAddress.street}</p>
            <p>{userInfo.clientAddress.city}</p>
            <p>{userInfo.clientAddress.postCode}</p>
            <p>{userInfo.clientAddress.country}</p>
          </div>
        </div>

        {/* third container */}

        <div className="flex flex-col gap-2">
          <p>Sent to</p>
          <p>{userInfo.clientEmail}</p>
        </div>

        {/* last conatiner */}

        <div className="flex flex-col text-white font-semibold">
          {/* first container from last container */}

          {userInfo.items.map((e, index) => {
            return (
              // css roundd work
              <div
                key={index}
                className={`flex justify-between border-b border-gray-400 p-9 bg-[#252945]  ${
                  index === 0 ? "rounded-t-lg" : ""
                }`}
              >
                <p className="">{e.name}</p>
                <p className="text-xl">$ {e.price}</p>
              </div>
            );
          })}

          {/* second container from last container */}
          <div className="flex justify-between p-9 bg-black rounded-b-lg items-center">
            <p className="">Amount Due</p>
            <p className="text-3xl font-bold">$ {userInfo.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoicePage;
