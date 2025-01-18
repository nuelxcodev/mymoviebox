import React, { useState } from "react";

function Signup() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState({ success: false, body: "" });
  const [isloading, setisloading] = useState(false);

  const onSubmit = async () => {
    setmessage({ success: false, body: "" });
    setisloading(true);

    const credentials = {
      email,
      password,
    };

    const url = `${import.meta.env.VITE_API_URL}/signup`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credentials }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setmessage({ success: result.success, body: result.message });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      {message.body && (
        <span className={message.success ? "text-green-600" : "text-red-500"}>
          {message.body}
        </span>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          type="text"
          className=" p2 m2"
          placeholder="email "
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="text"
          className=" p2 m2"
          placeholder="password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <button type="submit" className=" bg-orange-600 p-2">
          SignUp
        </button>
      </form>
    </div>
  );
}

export default Signup;
