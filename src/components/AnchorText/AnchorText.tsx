import React, { useContext, useRef, useState } from "react";
import { AnchorTextSelectionData } from "../../types/types";
import { AnchorDataContext } from "../AnchorWrapper/AnchorWrapper";
import { DescriptionTextAnchorsLayer } from "./DescriptionTextAnchorsLayer";

import "./anchorText.css";

interface AnchorTextProps {
  className?: string;
  __TYPE?: "AnchorText";
}

const AnchorText: React.FC<AnchorTextProps> = ({ className }) => {
  const {
    isEditable,
    anchorsData,
    anchorsLogics,
    anchorSelectionImageMode,
    anchorButtonVisible,
    selectedAnchorId,
  } = useContext(AnchorDataContext);
  const {
    setAnchorTextSelectionData,
    setSelectedAnchorId,
    anchorButtonCancelHandler,
    anchorButtonConfirmHandler,
    setAnchorButtonVisible,
  } = anchorsLogics;
  const [anchorButtonCoords, setAnchorButtonCoords] = useState([0, 0]);
  const descriptionTextRef = useRef<HTMLDivElement>(null);

  const selectAnchorText = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedText = window.getSelection()!.toString();

    if (!e.altKey || !selectedText || !isEditable) return;

    const { left, top } = descriptionTextRef.current!.getBoundingClientRect();
    const { scrollTop, scrollLeft } = e.currentTarget;
    const selectedTextStartPos = window.getSelection()!.anchorOffset;

    setAnchorButtonCoords([
      e.clientX - left + scrollLeft,
      e.clientY - top + scrollTop,
    ]);
    setAnchorTextSelectionData({ selectedText, selectedTextStartPos });
    setAnchorButtonVisible(true);
  };

  const anchorButtonHideHandler = () => {
    setAnchorButtonCoords([0, 0]);
    setAnchorButtonVisible(false);
  };

  const onCancelClick = () => {
    window.getSelection()?.removeAllRanges();
    anchorButtonHideHandler();
    anchorButtonCancelHandler();
  };

  const onConfirmClick = () => {
    anchorButtonConfirmHandler();
  };

  const showAnchorImageFrame = (anchorId: string) =>
    setSelectedAnchorId(anchorId);

  const hideAnchorImageFrame = () => setSelectedAnchorId("");

  return (
    <div
      ref={descriptionTextRef}
      className={`tia-anchor_text_container${className ? ` ${className}` : ""}`}
      onMouseUp={selectAnchorText}
      onMouseLeave={
        anchorSelectionImageMode ? () => null : anchorButtonHideHandler
      }
    >
      <div>{anchorsData.anchorText}</div>
      <DescriptionTextAnchorsLayer
        anchorText={anchorsData.anchorText}
        anchorsArray={anchorsData.anchorsArray}
        selectedAnchorId={selectedAnchorId}
        setSelectedAnchorId={setSelectedAnchorId}
        showAnchorImageFrame={showAnchorImageFrame}
        hideAnchorImageFrame={hideAnchorImageFrame}
      />
      <div>
        <button
          className="tia-anchoring_mode_button"
          style={{
            display: anchorButtonVisible ? "flex" : "none",
            top: anchorButtonCoords[1],
            left: anchorButtonCoords[0],
          }}
          onClick={anchorSelectionImageMode ? onCancelClick : onConfirmClick}
        >
          {anchorSelectionImageMode ? "Cancel" : "Create anchor"}
        </button>
      </div>
    </div>
  );
};

AnchorText.defaultProps = {
  __TYPE: "AnchorText",
};

export default AnchorText;
