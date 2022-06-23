import React from "react";

import AnchorImage from './AnchorImage';
import AnchorText from './AnchorText';

interface Props {
  description: any;
  children: any;
}

const AnchorWrapper: React.FC<Props> = ({ description, children }) => {
  return <div>{children}</div>;
};

console.log('Hello!');

export default AnchorWrapper ;
