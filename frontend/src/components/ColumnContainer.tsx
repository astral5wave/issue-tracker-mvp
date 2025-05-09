import React from "react";
import { Column, Id } from "./types";
import DeleteIcon from "../icons/DeleteIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
}
function ColumnContainer(props: Props) {
  const { column, deleteColumn, updateColumn } = props;
  const [editMode, setEditMode] = React.useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
    disabled: editMode,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="columnBackgroundColor opacity-40 border-2 border-rose-500 w-[350px] h-[500px] max-h-[500px] rounded-md
    flex flex-col"
      ></div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md
        flex flex-col"
    >
      {/* Column Title         */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none
      p-3 font-bold columnBackgroundColor border-4 items-center flex justify-between"
      >
        <div className=" flex gap-2">
          <div className="flex justify-center items-center columnBackgroundColor px-2 py-1 text-sm rounded full">
            0
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
        <button
          className="stroke-gray-500 hover:stroke-white hover:columnBackgroundColor rounded px-1 py-2"
          onClick={() => deleteColumn(column.id)}
        >
          <DeleteIcon />
        </button>
      </div>
      {/* Column task Container */}
      <div className="flex flex-grow">Content</div>
      {/* Column Footer */}
    </div>
  );
}

export default ColumnContainer;
