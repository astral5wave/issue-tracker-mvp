import React from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "./Column";
const KanbanBoard = () => {
  const [completed, setCompleted] = React.useState([]);
  const [incomplete, setIncomplete] = React.useState([]);
  return (
    <DndContext>
      <h2 className="text-center">PROGRESS BOARD</h2>
      <div className="flex justify-between items-center flex-row">
        <Column title={"TO DO"} tasks={incomplete} id={"1"} />
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
