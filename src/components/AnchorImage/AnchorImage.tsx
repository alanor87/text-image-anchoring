import React, { useRef, useContext } from "react";
import { AnchorDataContext } from "../AnchorWrapper/AnchorWrapper";
import './anchorImage.css';

interface AnchorImageProps {
  className?: string;
  __TYPE? : 'AnchorImage';
}

const AnchorImage: React.FC<AnchorImageProps> = ({className}) => {
  const data: any = useContext(AnchorDataContext);
  const newAnchorImgFrameRef = useRef(null);
  const anchorImgFrameRef = useRef(null);
  return (
    <div
      className="anchorImgContainer"
      // onMouseDown={selectAnchorImgFrame}
      // onMouseMove={selectAnchorImgFrame}
      // onMouseUp={selectAnchorImgFrame}
    >
      <div
        ref={newAnchorImgFrameRef}
        className="newAnchorImgFrame"
        // onClick={createAnchor}
      >
        <span>Click to create anchor.</span>
      </div>
      <div ref={anchorImgFrameRef} className="anchorImgFrame"></div>
      <img src={data.anchorImageUrl} />
    </div>
  );
};

AnchorImage.defaultProps = {
  __TYPE: 'AnchorImage'
}

export default AnchorImage;
