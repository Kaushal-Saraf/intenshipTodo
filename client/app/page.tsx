"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { enterCredentials, getHome } from "./services/userServices";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getHome();
      } catch (error) {}
    };

    fetchData();
  }, []);
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
      const result = await enterCredentials(details);
      if (result.message === "Sucess") {
        toast.dismiss();
        router.push(`/id/${details.name}`);
      } else {
        toast.dismiss();
        toast.error(result.message);
        setisdisabled(false);
      }
    } catch (error) {
      toast.error("cannot connect to server.");
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
        className="w-[375px] p-4 bg-blue-400 my-8 mx-auto rounded-lg shadow-sm"
      >
          <div className="flex mt-10 px-2 w-full">
            <label htmlFor="name" className=" text-center font-semibold">
              User Name
            </label>
            <input
              type="text"
              placeholder="hello"
              name="name"
              id="name"
              autoComplete="given-name"
              className="text-center mx-2 bg-blue-50 focus:outline-blue-400 text-blue-400"
              onChange={handleChange}
              value={details?.name}
              readOnly={isdisabled}
            ></input>
          </div>
          <div className="flex my-12 px-2 w-full">
            <label htmlFor= "password"className="text-center font-semibold">Password</label>
            <input
              readOnly={isdisabled}
              type="password"
              name="password"
              id="password"
              placeholder="********"
              autoComplete="current-password"
              className="text-center mx-4 bg-blue-50 focus:outline-blue-400 text-blue-400"
              onChange={handleChange}
              value={details?.password}
            ></input>
          </div>
          <div className="flex my-12 px-2 w-full">
            <label htmlFor="usertype"className="text-center font-semibold">User Type</label>
            <select
              disabled={isdisabled}
              className=" text-center mx-4 px-16 bg-blue-50 focus:outline-blue-400 text-blue-400"
              name="usertype"
              id="usertype"
              onChange={handleValueChange}
              value={details?.usertype}
            >
              <option value="Existing">Existing</option>
              <option value="New">New</option>
            </select>
          </div>
          <div className="flex w-full justify-center my-6">
            <button
              disabled={isdisabled}
              type="submit"
              className="bg-white px-2 py-1 text-blue-400 rounded"
            >
              Check Todo's
            </button>
          </div>
      </form>
    </>
  );
}
