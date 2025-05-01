import React from "react";
import { Droppable } from "@dnd/core";
const Column = ({ title, tasks, id }) => {
  return (
    <>
      <div className="bg-[#f4f5f7] w-[300px] rounded h-[300px] overflow-y-scroll scrollbar-hide border border-gray-400">
        {/* // Column title */}
        <h3 className="p-2 bg-pink-400 text-center sticky">{title}</h3>
        {/* // Droppable */}
        {/* <div> */}
        <Droppable droppableId={id}>
          {(provided, snapshot) => {
            //Task list
            <div
              className="p-1 transition duration-200 ease-in-out bg-[#f4f5f7] min-h-[100px] flex-grow"
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {/* // Task list */}
              {provided.placeholder}
            </div>;
          }}
        </Droppable>
        {/* </div> */}
      </div>
    </>
  );
};

export default Column;
