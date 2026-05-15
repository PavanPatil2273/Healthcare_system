import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = React.useState("login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state === "register") {
      // Save user
      localStorage.setItem("user", JSON.stringify(formData));
      toast.success("Signup successful ✅");

      setState("login");
    } else {
      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (
        savedUser &&
        savedUser.email === formData.email &&
        savedUser.password === formData.password
      ) {
        toast.success("Login successful ✅");

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(savedUser));

        navigate("/profile");
      } else {
        toast.error("Invalid credentials ❌");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-[350px] bg-white p-8 rounded-2xl shadow-md text-center"
      >
        <h1 className="text-3xl font-semibold text-gray-800">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          Please sign in to continue
        </p>

        {/* Name field (only for register) */}
        {state === "register" && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full mt-5 px-4 py-2 border rounded-full outline-none"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mt-4 px-4 py-2 border rounded-full outline-none"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mt-4 px-4 py-2 border rounded-full outline-none"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full mt-6 py-2 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 transition"
        >
          {state === "login" ? "Login" : "Sign Up"}
        </button>

        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-sm text-gray-500 mt-4 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-indigo-500 ml-1">
            {state === "login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;