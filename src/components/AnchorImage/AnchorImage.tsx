import React, { useRef } from "react";
import './anchorImage.css';

interface AnchorImageProps {
  imageUrl: string;
  anchors: any[];
}

const AnchorImage: React.FC<AnchorImageProps> = ({ imageUrl, anchors }) => {
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
      <img src={imageUrl} />
    </div>
  );
};

export default AnchorImage;
