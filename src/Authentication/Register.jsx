import "../styles/register.css";

function Register() {
  return (
    <div>
      <div className="container flex justify-center items-center h-screen mx-auto">
        <form action="#" className="w-40 p-4">
          <div className="p-3">
            <input
              className="outline-none py-2 pr-4 block w-full"
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="p-3">
            <input
              className="outline-none py-2 pr-4 block w-full"
              type="email"
              placeholder="Enter Email Id"
              required
            />
          </div>
          <div className="p-3">
            <input
              type="password"
              placeholder="Password"
              className="outline-none py-2 pr-4 block w-full"
              required
            />
          </div>
          <div className="p-3">
            <input
              className="outline-none py-2 pr-4 block w-full"
              type="password"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="p-3">
            <input
              className="outline-none py-2 pr-4 block w-full"
              type="number"
              placeholder="Enter Mobile Number"
              required
            />
          </div>
          <div className="p-3 pt-4">
            <button className="w-full text-white py-2 pr-4">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
