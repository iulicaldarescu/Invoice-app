import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const loggedUserId = localStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchElementById = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("id", loggedUserId);

        if (error) {
          console.error("Error fetching data:", error.message);
          return null;
        }

        setUserInfo(data[0]);
        console.log(userInfo);
      } catch (error) {
        console.error("Error:", error.message);
        return null;
      }
    };
    fetchElementById();
  }, [loggedUserId]);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  //function to log out
  const logout = () => {
    localStorage.removeItem("userId");
    navigate("/", { replace: true });
  };

  return (
    <div className=" overflow-hidden shadow rounded-lg border bg-[#141625]  text-white lg:px-64 pb-44">
      <div className="px-4 py-10 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-100 ">
          {userInfo?.firstName}
        </h3>
        <button
          type="button"
          onClick={logout}
          className="bg-[#7c5df9] p-3 rounded-full"
        >
          Log Out
        </button>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="sm:divide-y sm:divide-gray-200 text-white">
          <div className="py-3 sm:py-5  sm:gap-4 sm:px-6 flex justify-between">
            <p className="text-sm font-medium text-gray-500">Full name</p>
            <p className="mt-1 text-sm text-gray-100 sm:mt-0  ">
              {userInfo?.lastName + " " + userInfo?.firstName}
            </p>
          </div>
          <div className="py-3 sm:py-5  sm:gap-4 sm:px-6 flex justify-between">
            <p className="text-sm font-medium text-gray-500">Email address</p>
            <p className="mt-1 text-sm text-gray-100 sm:mt-0">
              {userInfo.email}
            </p>
          </div>
          <div className="py-3 sm:py-5 sm:gap-4 sm:px-6 flex justify-between">
            <p className="text-sm font-medium text-gray-500">Phone number</p>
            <p className="mt-1 text-sm text-gray-100 sm:mt-0 ">
              {userInfo.mobileNumber}
            </p>
          </div>
          <div className="py-3 sm:py-5  sm:gap-4 sm:px-6 flex justify-between text-right">
            <p className="text-sm font-medium text-gray-500">Address</p>
            <p className="mt-1 text-sm text-gray-100 sm:mt-0 ">
              {userInfo.streetAddress} <br />
              {userInfo.city} <br />
              {userInfo.country}
            </p>
          </div>
        </div>
      </div>

      <div>da</div>
    </div>
  );
}

export default UserProfile;
