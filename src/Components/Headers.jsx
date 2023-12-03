import logo from "../assets/logo.svg";
import "../styles/header.css";
import sun from "../assets/icon-sun.svg";
import moon from "../assets/icon-moon.svg";
import avatar from "../assets/image-avatar.jpg";

function Header({ logout }) {
  return (
    <div className="w-full bg-[#20243c] flex justify-between">
      <div className="flex items-center justify-between w-full border-r border-r-gray-400">
        <div className="bg-[#7c5df9] rounded-r-3xl h-full flex items-center p-6">
          <img src={logo} className="w-9"></img>
        </div>

        <div className="pr-6 ">
          <img src={sun} className="w-7 animate-spin-once"></img>
        </div>
      </div>

      <div className=" flex items-center w-32 justify-center">
        <div className="bg-[#7c5df9] rounded-full flex items-center h-14 w-14">
          <p
            className="rounded-full m-auto  text-center text-white font-semibold text-3xl"
            onClick={logout}
          >
            {localStorage.getItem("initials")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
