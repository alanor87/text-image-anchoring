import React, {useContext} from "react";
import { AnchorDataContext } from "../AnchorWrapper/AnchorWrapper";

interface AnchorTextProps {
  className?: string;
  __TYPE?: "AnchorText";
}

const AnchorText: React.FC<AnchorTextProps> = ({ className }) => {
  const data: any = useContext(AnchorDataContext);
  console.log(data);
  return (
    <div>
      {data.anchorText} {data.anchorsArray}
    </div>
  );
};

AnchorText.defaultProps = {
  __TYPE: "AnchorText",
};

export default AnchorText;
