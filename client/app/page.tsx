export default function Home() {
  return (
    <>
      <h1 className="text-center font-bold text-blue-400 text-3xl">
        Welcome to todo app.
      </h1>
      <form className="w-[450px] h-[250px] bg-blue-400 my-8 mx-auto rounded-lg shadow-sm">
        <div className="flex flex-col justify-center my-10">
          <label className="flex flex-row justify-center align-middle my-6">
            <p className="flex-1 text-center text-white font-bold">User Name</p>
            <input
              type="text"
              placeholder="hello"
              className="mx-10 rounded-sm text-center"
            ></input>
          </label>
          <label className="flex flex-row justify-center align-middle my-6">
            <p className="flex-1 text-center text-white font-bold">Password</p>
            <input
              type="password"
              placeholder="********"
              className="mx-10 rounded-sm text-center"
            ></input>
          </label>
          <div className="flex w-full justify-center my-6">
            <button className="bg-white px-2 py-1 text-blue-400 rounded">
              Check Todo's
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
