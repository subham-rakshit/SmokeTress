import { useDebugValue, useState } from "react";

function App() {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });
  const [isFetching, setIsFetching] = useState(false);

  // Input Change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Form Submit
  const userDetailsOnSubmit = async (e) => {
    e.preventDefault();
    if (
      userDetails.fullName &&
      userDetails.street &&
      userDetails.city &&
      userDetails.state &&
      userDetails.country &&
      userDetails.zipCode
    ) {
      try {
        setIsFetching(true);
        const api = `${import.meta.env.VITE_BASE_URL}/api/user/submitDetails`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userDetails }),
        };
        const res = await fetch(api, options);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setIsFetching(false);
          setUserDetails({
            fullName: "",
            street: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
          });
          alert(data.message);
        } else {
          setIsFetching(false);
          alert(data.extraDetails);
        }
      } catch (error) {
        console.log(
          `Error comes from user details submit form: ${error.message}`
        );
      }
    }
  };

  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center px-5 py-10">
      <form onSubmit={userDetailsOnSubmit} className="w-full max-w-[800px]">
        <h1 className="text-xl font-semibold mb-5">User Details</h1>
        {/* Fullname Input */}
        <div className=" flex flex-col gap-2 mb-5">
          <label htmlFor="fullName" className="text-sm">
            Fullname
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name*"
            value={userDetails.fullName}
            onChange={handleInputChange}
            className="px-2 py-2 text-xs border border-gray-400 rounded-md"
          />
        </div>

        <h1 className="text-xl font-semibold mb-5">Address Details</h1>
        {/* Street Input */}
        <div className=" flex flex-col gap-2 mb-5">
          <label htmlFor="street" className="text-sm">
            Street
          </label>
          <input
            type="text"
            id="street"
            placeholder="Enter your street address*"
            value={userDetails.street}
            onChange={handleInputChange}
            className="px-2 py-2 text-xs border border-gray-400 rounded-md"
          />
        </div>
        {/* City and State Input */}
        <div className="flex flex-col sm:flex-row md:justify-between md:items-center gap-5 mb-5">
          <div className=" flex flex-col gap-2 flex-1">
            <label htmlFor="city" className="text-sm">
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="Enter your city name*"
              value={userDetails.city}
              onChange={handleInputChange}
              className="px-2 py-2 text-xs border border-gray-400 rounded-md"
            />
          </div>
          <div className=" flex flex-col gap-2 flex-1">
            <label htmlFor="state" className="text-sm">
              State
            </label>
            <input
              type="text"
              id="state"
              placeholder="Enter your state*"
              value={userDetails.state}
              onChange={handleInputChange}
              className="px-2 py-2 text-xs border border-gray-400 rounded-md"
            />
          </div>
        </div>
        {/* Country and ZipCode Input */}
        <div className="flex flex-col sm:flex-row md:justify-between md:items-center gap-5">
          <div className=" flex flex-col gap-2 flex-1">
            <label htmlFor="country" className="text-sm">
              Country
            </label>
            <input
              type="text"
              id="country"
              placeholder="Enter your country name*"
              value={userDetails.country}
              onChange={handleInputChange}
              className="px-2 py-2 text-xs border border-gray-400 rounded-md"
            />
          </div>
          <div className=" flex flex-col gap-2 flex-1">
            <label htmlFor="zipCode" className="text-sm">
              ZipCode
            </label>
            <input
              type="number"
              id="zipCode"
              placeholder="******"
              value={userDetails.zipCode}
              onChange={handleInputChange}
              className="px-2 py-2 text-xs border border-gray-400 rounded-md"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center mt-10">
          <button
            type="submit"
            className="bg-zinc-600 border border-black rounded-full px-5 py-1 text-sm font-semibold text-white"
          >
            {isFetching ? "Submiting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
