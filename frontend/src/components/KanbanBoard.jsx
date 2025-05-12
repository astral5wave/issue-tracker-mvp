import React, { useMemo } from "react";
import { createPortal } from "react-dom";
import "../App.css";
import { useState } from "react";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragOverlay, useSensor, useSensors } from "@dnd-kit/core";
import { PointerSensor } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const KanbanBoard = () => {
  console.log("KanbanBoard rendered");

  // Initialize with 3 fixed columns
  const [columns] = useState([
    { id: 1, title: "To Do" },
    { id: 2, title: "In Progress" },
    { id: 3, title: "Done" },
  ]);
  const _COLUMNS_ID = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState([]);

  function onDragStart(event) {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  }

  function onDragEnd() {
    setActiveTask(null);
  }

  const [activeTask, setActiveTask] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  function createTask(columnId) {
    const newTask = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id, content) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId;
        return [...tasks];
      });
    }
  }

  function generateId() {
    return Math.floor(Math.random() * 10001);
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
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                deleteColumn={() => {}} // Disable column deletion
                createTask={createTask}
                tasks={tasks.filter((task) => task.columnId === col.id)}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </div>
        </div>
        {createPortal(
          <DragOverlay>
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
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
