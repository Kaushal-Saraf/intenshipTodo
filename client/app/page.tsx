"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { enterCredentials, getHome } from "./services/userServices";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [details, setdetails] = useState({
    name: "",
    password: "",
    usertype: "Existing",
  });
  const [isdisabled, setisdisabled] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (details.name.includes(" ")) {
      toast.dismiss();
      toast.error("Username should not contain any spaces.");
      return;
    } else if (details.password.length < 8) {
      toast.dismiss();
      toast.error("Password is too short");
      return;
    }
    setisdisabled(true);
    if (details.usertype === "Existing") {
      toast.loading("Fetching todo's");
    } else {
      toast.loading("Creating account.");
    }
    try {
      await enterCredentials(details);
      toast.dismiss();
      router.push(`/${details.name}`);
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response.data.message);
      setisdisabled(false);
    }
  };
  const handleValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setdetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setdetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <Toaster position="top-right" />
      <h1 className="text-center font-bold text-blue-400 text-3xl">
        Welcome to todo app.
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-[450px] h-[300px] bg-blue-400 my-8 mx-auto rounded-lg shadow-sm"
      >
        <div className="flex flex-col justify-center my-10">
          <label className="flex flex-row justify-center align-middle my-6">
            <p className="flex-1 text-center text-white font-bold">User Name</p>
            <input
              type="text"
              placeholder="hello"
              name="name"
              id="name"
              autoComplete="given-name"
              className="mr-10 flex-1 rounded-sm text-center focus:outline-blue-400"
              onChange={handleChange}
              value={details?.name}
              readOnly={isdisabled}
            ></input>
          </label>
          <label className="flex flex-row justify-center align-middle my-6">
            <p className="flex-1 text-center text-white font-bold">Password</p>
            <input
              readOnly={isdisabled}
              type="password"
              name="password"
              id="password"
              placeholder="********"
              autoComplete="current-password"
              className="mr-10 flex-1 rounded-sm text-center focus:outline-blue-400"
              onChange={handleChange}
              value={details?.password}
            ></input>
          </label>
          <label className="flex flex-row justify-center align-middle my-6">
            <p className="flex-1 text-center text-white font-bold">User Type</p>
            <select
              disabled={isdisabled}
              className="mr-12 flex-1 rounded-sm text-center focus:outline-blue-400"
              name="usertype"
              id="usertype"
              onChange={handleValueChange}
              value={details?.usertype}
            >
              <option value="Existing">Existing</option>
              <option value="New">New</option>
            </select>
          </label>
          <div className="flex w-full justify-center my-6">
            <button
              disabled={isdisabled}
              type="submit"
              className="bg-white px-2 py-1 text-blue-400 rounded"
            >
              Check Todo's
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
