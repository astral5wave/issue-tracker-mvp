import React from "react";
import "../App.css";
import PlusIcon from "../icons/PlusIcon";
import { useState } from "react";
import ColumnContainer from "./ColumnContainer";
const KanbanBoard = () => {
  console.log("KanbanBoard rendered");
  const [columns, setColumns] = useState([]);
  console.log(columns);
  function createNewColumn() {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }
  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
  return (
    <div
      className="m-auto flex min-h-screen w-full items-center
    overflow-x-auto overflow-y-hidden px-[40px] bg-dark-background"
    >
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnContainer column={col} />
          ))}
        </div>
        <button
          className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg 
      bg-kanban-background border-2 columnBackgroundColor p-4 ring-rose-400 hover:ring-2
      flex gap-2 "
          onClick={() => {
            createNewColumn();
          }}
        >
          <PlusIcon />
          Add Column
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;
