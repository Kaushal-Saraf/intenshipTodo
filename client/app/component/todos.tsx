"use client";
import React from "react";

interface ToDoProps {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
}

const ToDo: React.FC<ToDoProps> = ({
  title,
  description,
  startDate,
  endDate,
  completed,
  id,
}) => {
  return (
    <div className="flex mx-6 px-2 py-2 my-6 justify-between rounded  bg-blue-100">
      <div className="flex-col flex-1">
      <p className=" bg-white px-3 py-1 rounded-full font-bold">{id}</p>
        <div className="flex border-b-2 border-black py-2">
          
          <h2 className=" w-full text-center font-bold text-xl">{title}</h2>
        </div>
        <p>{description}</p>
      </div>
      <div className="flex-col border-l-2 w-[175px] border-black px-4 py-4 justify-between">
        <h2 className=" border-b-2 border-black">
          Start Date <p>{startDate}</p>
        </h2>
        <h2 className=" border-b-2 border-black mt-4">
          Deadline <p>{endDate}</p>
        </h2>
        <h2 className=" border-b-2 border-black mt-4">
          Status
          <div>
            {completed ? (
              <p className="text-green-400 font-bold">Completed</p>
            ) : (
              <p className="text-red-400 font-bold">Not Completed</p>
            )}
          </div>
        </h2>
      </div>
    </div>
  );
};

export default ToDo;
