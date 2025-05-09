import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import "../App.css";
import PlusIcon from "../icons/PlusIcon";
import { useState } from "react";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragOverlay, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { PointerSensor } from "@dnd-kit/core";
const KanbanBoard = () => {
  console.log("KanbanBoard rendered");
  const [columns, setColumns] = useState([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
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
  function deleteColumn(id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  }
  function onDragStart(event) {
    console.log("DRAG START", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }
  function onDragEnd(event) {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) {
      return;
    }
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
  const [activeColumn, setActiveColumn] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );
  function updateColumn(id, title) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return;
      return { ...col, title };
    });
    setColumns(newColumns);
  }
  return (
    <div
      className="m-auto flex min-h-screen w-full items-center
    overflow-x-auto overflow-y-hidden px-[40px] bg-dark-background"
    >
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                />
              ))}
            </SortableContext>
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
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
