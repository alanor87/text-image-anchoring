import React from "react";

interface Props {
    text: string;
  anchors: any[];
}

const AnchorText: React.FC<Props> = ({ text, anchors }) => {
  return <div>Text</div>;
};

export default AnchorText;