import React from "react";

interface Props {
  className?: string;
  children: any;
}

const AnchorWrapper: React.FC<Props> = ({ className, children }) => {
  console.dir(children);
  return (
    <div className={className || undefined}>
      {children}
    </div>
  );
};

export default AnchorWrapper;
