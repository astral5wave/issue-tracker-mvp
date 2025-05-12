import React from "react";
import { useMemo } from "react";
import { Column, Id, Task } from "./types";
import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  tasks: Task[];
}

function ColumnContainer(props: Props) {
  const { column, createTask, tasks, deleteTask, updateTask } = props;

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <div
      ref={setDroppableNodeRef}
      className={`columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col ${
        isOver ? "ring-2 ring-rose-500" : ""
      }`}
    >
      {/* Column Title */}
      <div className="mainBackgroundColor text-md h-[60px] rounded-md rounded-b-none p-3 font-bold columnBackgroundColor border-4 items-center flex justify-between">
        <div className="flex gap-2">
          <div className="flex justify-center items-center columnBackgroundColor px-2 py-1 text-sm rounded full">
            {tasks.length}
          </div>
          {column.title}
        </div>
      </div>

      {/* Column Task Container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.length === 0 && (
            <div
              className="text-gray-500 text-center p-4 border border-dashed border-gray-400 rounded"
              style={{ minHeight: "100px" }}
            >
              Drag tasks here
            </div>
          )}
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      {/* Column Footer */}
      {column.title === "To Do" && (
        <button
          className="flex gap-2 items-center columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor border-b-columnBackgroundColor hover:mainBackgroundColor hover:text-rose-500 active:bg-black"
          onClick={() => {
            createTask(column.id);
          }}
        >
          Add Task
        </button>
      )}
    </div>
  );
}

export default ColumnContainer;
