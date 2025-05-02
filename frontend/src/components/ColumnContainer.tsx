import React from "react";
import { Column } from "./types";
interface Props {
  column: Column;
}
function ColumnContainer(props: Props) {
  const { column } = props;

  return (
    <div
      className="columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md
        flex flex-col"
    >
      {/* Column Title         */}
      <div
        className="mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none
      p-3 font-bold columnBackgroundColor border-4 "
      >
        {column.title}
      </div>
      {/* Column task Container */}
      <div className="flex flex-grow">Content</div>
      {/* Column Footer */}
    </div>
  );
}

export default ColumnContainer;
