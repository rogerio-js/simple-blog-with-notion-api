import React from "react";
import * as Block from "./index";

const NotionBlocks = ({ blocks }) => {
  console.log(blocks)
  return (
    <React.Fragment>
      {blocks.map((block, index) => {
        const Component = Block[block.type];
        if (!Component) return null;
        return <Component key={block.id} index={index} {...block} />;
      })}
    </React.Fragment>
  );
};

export default NotionBlocks;
