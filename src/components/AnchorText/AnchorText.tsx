import React from "react";

interface AnchorTextProps {
  text: string;
  anchors: any[];
}

const AnchorText: React.FC<AnchorTextProps> = ({ text, anchors }) => {
  return (
    <div>
      {text} {anchors}
    </div>
  );
};

export default AnchorText;
