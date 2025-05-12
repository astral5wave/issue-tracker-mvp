import React from "react";
import { useMemo } from "react";
import { Column, Id, Task } from "./types";
import DeleteIcon from "../icons/DeleteIcon";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  tasks: Task[];
}

function ColumnContainer(props: Props) {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;

  const [editMode, setEditMode] = React.useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef: setSortableNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setSortableNodeRef}
        style={style}
        className="columnBackgroundColor opacity-40 border-2 border-rose-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={(node) => {
        setSortableNodeRef(node);
        setDroppableNodeRef(node);
      }}
      style={style}
      className={`columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col ${
        isOver ? "ring-2 ring-rose-500" : ""
      }`}
    >
      {/* Column Title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold columnBackgroundColor border-4 items-center flex justify-between"
      >
        <div className="flex gap-2">
          <div className="flex justify-center items-center columnBackgroundColor px-2 py-1 text-sm rounded full">
            {tasks.length}
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 border-rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        {/* <button
          className="stroke-gray-500 hover:stroke-white hover:columnBackgroundColor rounded px-1 py-2"
          onClick={() => deleteColumn(column.id)}
        >
          <DeleteIcon />
        </button> */}
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
      <button
        className="flex gap-2 items-center columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor border-b-columnBackgroundColor hover:mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => {
          createTask(column.id);
        }}
      >
        Add Task
      </button>
    </div>
  );
}

export default ColumnContainer;
