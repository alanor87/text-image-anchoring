import React, { useRef, useContext, useEffect } from "react";
import { AnchorImageFrameStyle } from "../../types/types";
import { AnchorDataContext } from "../AnchorWrapper/AnchorWrapper";
import { pixels2percentage as p2p } from "../utils";

import "./anchorImage.css";

interface AnchorImageProps {
  className?: string;
  imageFrameStyle?: AnchorImageFrameStyle;
  __TYPE?: "AnchorImage";
}

const AnchorImage: React.FC<AnchorImageProps> = ({
  className,
  imageFrameStyle,
}) => {
  const {
    anchorsData,
    anchorsLogics,
    selectedAnchorId,
    anchorSelectionImageMode,
    anchorFrameCreated,
    anchorFrameCoords,
    isEditable,
  } = useContext(AnchorDataContext);
  const {
    setAnchorFrameCreated,
    setAnchorFrameCoords,
    setAnchorFrameSize,
    createAnchor,
    deleteAnchor,
  } = anchorsLogics;
  const newAnchorImgFrameRef = useRef<HTMLDivElement>(null);
  const anchorImgFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageFrameStyle) return;
    const { boxShadow, textColor, borderWidth, borderRadius } = imageFrameStyle;
    if (boxShadow)
      document.documentElement.style.setProperty(
        "--tial-image-frame-box-shadow",
        boxShadow
      );
    if (textColor)
      document.documentElement.style.setProperty(
        "--tial-image-frame-text-color",
        textColor
      );
    if (borderWidth)
      document.documentElement.style.setProperty(
        "--tial-image-frame-border-width",
        borderWidth
      );
    if (borderRadius)
      document.documentElement.style.setProperty(
        "--tial-image-frame-border-radius",
        borderRadius
      );
  }, [imageFrameStyle]);

  // Coordinates and dimensions for the image anchor frame.
  // Not using useState here to prevent constant rerendering of the component while drawing the div.
  let frameWidth = 0;
  let frameHeight = 0;
  let finalFrameCoordX = 0;
  let finalFrameCoordY = 0;

  useEffect(() => {
    if (!selectedAnchorId) {
      anchorImgFrameRef.current!.setAttribute("style", "");
      return;
    }
    const { anchorsArray } = anchorsData;
    const currentAnchor = anchorsArray.find(
      (anchor) => anchor._id === selectedAnchorId
    );
    const { anchorFrameCoords, anchorFrameSize } = currentAnchor!;
    anchorImgFrameRef.current!.setAttribute(
      "style",
      `top: ${anchorFrameCoords[1]}%; 
    left: ${anchorFrameCoords[0]}%;
    width: ${anchorFrameSize[0]}%; 
    height: ${anchorFrameSize[1]}%;
    transform: rotate(0);
    opacity: 1; pointer-events: none;`
    );
  }, [selectedAnchorId]);

  useEffect(() => {
    if (!anchorSelectionImageMode)
      newAnchorImgFrameRef.current!.setAttribute("style", "");
  }, [anchorSelectionImageMode]);

  const selectAnchorImgFrame = (e: React.MouseEvent) => {
    if (!anchorSelectionImageMode || anchorFrameCreated) return;
    switch (e.type) {
      // Getting the coordinates of starting point of the frame rectangle drawing.
      case "mousedown": {
        e.preventDefault();
        newAnchorImgFrameRef.current!.setAttribute("style", "");
        setAnchorFrameCoords([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
        break;
      }
      case "mousemove": {
        // Defining if the left mouse button is pressed during mouse move over image.
        if (e.buttons !== 1) return;
        // Calculating and setting dimensions of the frame div.
        frameWidth = Math.abs(e.nativeEvent.offsetX - anchorFrameCoords[0]);
        frameHeight = Math.abs(e.nativeEvent.offsetY - anchorFrameCoords[1]);
        // Determining the coords of the upper left corner of the frame div
        // for correct positioning, since user can draw rectangle in any direction.
        finalFrameCoordX =
          anchorFrameCoords[0] < e.nativeEvent.offsetX
            ? anchorFrameCoords[0]
            : e.nativeEvent.offsetX;
        finalFrameCoordY =
          anchorFrameCoords[1] < e.nativeEvent.offsetY
            ? anchorFrameCoords[1]
            : e.nativeEvent.offsetY;
        newAnchorImgFrameRef.current!.setAttribute(
          "style",
          `top: ${finalFrameCoordY}px;
           left: ${finalFrameCoordX}px;
           width: ${frameWidth}px;
           height: ${frameHeight}px;
           opacity: 1;
           pointer-events: none;`
        );
        break;
      }
      case "mouseup": {
        // For different screen resolutions compatibility image anchor frame dimensions
        // are being converted from pixels to percent from the wrapping div.
        const { clientWidth, clientHeight } =
          newAnchorImgFrameRef.current!.parentElement!;
        setAnchorFrameSize([
          p2p(clientWidth, frameWidth),
          p2p(clientHeight, frameHeight),
        ]);
        setAnchorFrameCoords([
          p2p(clientWidth, finalFrameCoordX),
          p2p(clientHeight, finalFrameCoordY),
        ]);
        newAnchorImgFrameRef.current!.style.pointerEvents = "all";
        setAnchorFrameCreated(true);
        break;
      }
    }
  };

  return (
    <div className={className || ""}>
      {" "}
      <div
        className={`tial-anchor_image_container`}
        onMouseDown={selectAnchorImgFrame}
        onMouseMove={selectAnchorImgFrame}
        onMouseUp={selectAnchorImgFrame}
      >
        <div
          ref={newAnchorImgFrameRef}
          className="tial-new_anchor_image_frame"
          onClick={createAnchor}
        >
          <span>{"Click to create \n anchor."}</span>
        </div>
        <div ref={anchorImgFrameRef} className="tial-anchor_image_frame">
          {isEditable && selectedAnchorId && (
            <span
              className="tial-anchor_image_frame_close"
              title="Delete anchor"
              onClick={deleteAnchor}
            ></span>
          )}
        </div>
        <img src={anchorsData.anchorImageUrl} />
      </div>
    </div>
  );
};

AnchorImage.defaultProps = {
  __TYPE: "AnchorImage",
};

export default AnchorImage;
