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
    <div className="bg-white overflow-hidden shadow rounded-lg border">
      <div className="px-4 py-5 sm:px-6 flex justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {userInfo?.firstName}
        </h3>
        <button type="button" onClick={logout}>
          Log Out
        </button>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo?.lastName + " " + userInfo?.firstName}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo.email}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo.mobileNumber}
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo.streetAddress} <br />
              {userInfo.city} <br />
              {userInfo.country}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default UserProfile;
