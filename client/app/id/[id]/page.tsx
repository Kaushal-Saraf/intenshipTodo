"use client";
import { LuLogOut } from "react-icons/lu";
import ToDo from "../../component/todos";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { addTodo, deleteCompletedTodo, deleteSelectedIds, getDetails, markAsCompleted, sortByEndDate } from "../../services/userServices";
import dateconverter from "../../utils/dateconverter";
import { extractNumbers } from "../../utils/extractNumbers";
import { useRouter } from "next/navigation";
interface ToDoItem {
  id: number;
  title: string;
  description: string;
  startdate: string;
  enddate: string;
  completed: boolean;
}

export default function id({ params }: { params: { id: string } }) {
  const [deleteidarray, setdeleteidarray] = useState<number[]>([])
  const [completeidarray, setcompleteidarray] = useState<number[]>([])
  const [todos, settodos] = useState<ToDoItem[]>([]);
  const [avilableTodos, setavilableTodos] = useState(false);
  const [deleteids, setdeleteids] = useState("");
  const [disable, setdisable] = useState(false);
  const [completeids, setcompleteids] = useState("");
  const [details, setdetails] = useState({
      title: "",
      desc: "",
      start: "",
      end: "",
  });
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDetails(params.id);
        settodos(result.todos);
        if (result.todos.length !== 0) {
          setavilableTodos(true);
        }
      } catch (error) {
      }
    };
    
    fetchData();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setdetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleTextChange= (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const { name, value } = e.target;
    setdetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (details.title.trim() === "") {
      toast.dismiss();
      toast.error("Title cannot be empty.");
      return;
    }
    try {
      toast.dismiss();
      toast.loading("Adding todo.");
      setdisable(true);
      const result = await addTodo(params.id, details);
      toast.dismiss();
      toast.success("Todo Added sucessfully.");
      setdetails({
        title: "",
        desc: "",
        start: "",
        end: "",
      });
      setavilableTodos(true)
      settodos(result.todos);
      setdisable(false);
    } catch (error) {
      toast.error("Error uploading todo.");
    }
  };
  const handleCompletion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(completeidarray.length===0){
      toast.dismiss()
      toast.error("Please enter correct input ids.")
      return ;
    }
    else if(completeidarray[0]===0 || completeidarray[completeidarray.length-1]>todos.length ){
      toast.dismiss()
      toast.error("Please enter correct input ids.")
      return ;
    }
    try {
      toast.dismiss();
      toast.loading("Marking as completed.");
      setdisable(true);
      const completedIds = {completeIds: completeidarray}
      const result = await markAsCompleted(params.id, completedIds);
      toast.dismiss();
      toast.success("Sucessfully marked.");
      setdisable(false);
      setcompleteids("");
      setcompleteidarray([]);
      settodos(result.todos);
    } catch (error) {
      toast.error("Error Marking completed.");
    }
  };
  const handleDeletion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(deleteidarray.length===0){
      toast.dismiss()
      toast.error("Please enter serial numbers.")
      return ;
    }
    else if(deleteidarray[0]===0 || deleteidarray[deleteidarray.length-1]>todos.length ){
      toast.dismiss()
      toast.error("Please enter correct serial numbers.")
      return ;
    }
    try {
      toast.dismiss();
      toast.loading("Deleting Ids.");
      setdisable(true);
      const deleteIds = {deleteIds: deleteidarray}
      const result = await deleteSelectedIds(params.id, deleteIds);
      toast.dismiss();
      toast.success("Sucessfully deleted.");
      if(result.length===0){
        setavilableTodos(false)
      }
      setdeleteids("")
      settodos(result);
      setdeleteidarray([])
      setdisable(false);
    } catch (error) {
      console.log(error)
      toast.error("Error Deleting.");
    }
  }
  const deleteCompleted = async () => {
    try {
      toast.dismiss()
      toast.loading("Deleting Completed todos.")
      setdisable(true)
      const result = await deleteCompletedTodo(params.id);
      toast.dismiss();
      toast.success("Sucessfully deleted completed Todos.");
      if(result.length===0){
        setavilableTodos(false)
      }
      settodos(result);
      setdisable(false);
    } catch (error) {
      toast.error("Cannot delete all the completed todos.")
    }
  };
  const sortByDeadline = async () => {
    try {
      if (todos.length === 0) {
        toast.dismiss();
        toast.error("No todos available.");
        return;
      }
      toast.dismiss();
      toast.loading("Sorting tasks by deadline.");
      setdisable(true);
      const result = await sortByEndDate(params.id);
      toast.dismiss();
      toast.success("Sucessfully sorted all Todos.");
      settodos(result);
      setdisable(false);
    } catch (error) {
      toast.error("Cannot sort todos.");
    }
  };
  const handleLogout = async () => {
    toast.dismiss()
    router.push("/");
  };
  return (
    <>
      <Toaster position="top-right" />
      <div className="flex justify-between">
        <h1 className="mx-6 my-4 text-2xl text-blue-500 font-bold">My Todos</h1>
        <button
          onClick={handleLogout}
          className=" bg-blue-100 rounded px-2 mx-6 my-4 text-l text-blue-500 font-bold"
        >
          <div className="flex">
            <LuLogOut className="my-1 mx-2" />
            <p>Logout</p>
          </div>
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-blue-300 mx-6 px-2 py-2 my-4 rounded"
      >
        <div className="flex justify-center">
          <div className="my-4">
            <label htmlFor="title" className="w-[40px] inline-block">
              Title
            </label>
            <input
              className="rounded px-2"
              type="text"
              id="title"
              name="title"
              value={details.title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-center">
        <div className="my-4 w-full mx-4">
            <label htmlFor="description" className="my-1 block">
              Description
            </label>
            <textarea
              id="description"
              name="desc"
              className="rounded w-full px-2"
              value={details.desc}
              onChange={handleTextChange}
            />
            <p className="text-sm">Number of words = {details.desc.length}</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="my-4 mx-2">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="datetime-local"
              id="startDate"
              name="start"
              className="rounded px-2 mx-2"
              value={details.start}
              onChange={handleChange}
            />
          </div>
          <div className="my-4 mx-2">
            <label htmlFor="endDate" className="mx-2">
              End Date
            </label>
            <input
              type="datetime-local"
              id="endDate"
              name="end"
              className="rounded px-2 mx-2"
              value={details.end}
              onChange={handleChange}
            />
          </div>
          <div className="my-4 mx-2">
            <button
              type="submit"
              disabled={disable}
              className="bg-white rounded px-2 py-0.5"
            >
              Add ToDo
            </button>
          </div>
        </div>
      </form>
      <div className="flex justify-center bg-blue-300 rounded mx-6 py-2">
        <button
          className="rounded bg-white mx-4 px-2"
          disabled={disable}
          onClick={deleteCompleted}
        >
          Delete all Completed Task
        </button>
        <button
          className="rounded bg-white mx-4 px-2"
          disabled={disable}
          onClick={sortByDeadline}
        >
          Sort Task By Deadline
        </button>
      </div>
      {avilableTodos ? (
        todos.map((todo) => (
          <ToDo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            startDate={dateconverter(todo.startdate)}
            endDate={dateconverter(todo.enddate)}
            completed={todo.completed}
          />
        ))
      ) : (
        <div className="text-center font-bold text-5xl text-blue-200">
          No Todos Available
        </div>
      )}
      <form onSubmit={handleCompletion}>
        <div className="bg-blue-300 mx-6 my-4 px-2 py-2 rounded">
          <label htmlFor="completedinputs" className="mx-2 my-2">
            Todo Serial Numbers I want mark as completed seperated by commas
          </label>
          <input
            type="text"
            className="mx-2 rounded px-2 my-2"
            placeholder="1, 5, 3, 14"
            id="completedinputs"
            name="completedinputs"
            readOnly={disable}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setcompleteids(e.target.value);
              setcompleteidarray(extractNumbers(e.target.value));
            }}
            value={completeids}
          ></input>
          <button
            type="submit"
            disabled={disable}
            className="mx-2 my-2 rounded px-2 bg-white"
          >
            Completed
          </button>
        </div>
      </form>
      <form onSubmit={handleDeletion}>
        <div className="bg-blue-300 mx-6 my-4 px-2 py-2 rounded">
          <label htmlFor="inputs" className="mx-2  my-2 pr-[75px] w-[440px]">
            Todo Serial Numbers I want to delete seperated by commas
          </label>
          <input
            type="text"
            className="mx-2 my-2 rounded px-2"
            placeholder="1, 5, 3, 14"
            id="inputs"
            name="inputs"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setdeleteids(e.target.value);
              setdeleteidarray(extractNumbers(e.target.value));
            }}
            value={deleteids}
          ></input>
          <button
            type="submit"
            disabled={disable}
            className="mx-2 my-2 rounded px-2 bg-white w-[100px]"
          >
            Delete
          </button>
        </div>
      </form>
    </>
  );
}
