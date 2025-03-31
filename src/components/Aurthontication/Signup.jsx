export default function Signup() {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-[#15616D] text-center mb-6">
            Sign Up
          </h2>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15616D]"
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile No"
              className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15616D]"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15616D]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15616D]"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15616D]"
            />
            <button
              type="submit"
              className="w-full bg-[#15616D] text-white p-2 rounded-lg hover:bg-[#0E4A52] cursor-pointer"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account? <a href="#" className="text-[#15616D] font-bold">Login</a>
          </p>
        </div>
      </div>
    );
  }
  