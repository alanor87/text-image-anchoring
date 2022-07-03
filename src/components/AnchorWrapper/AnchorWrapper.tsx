import React, { useEffect, useState } from "react";
import {
  AnchorsContextType,
  AnchorsDataType,
  AnchorType,
} from "../../types/types";
import { generateAnchorId } from "../utils";

import "./anchorWrapper.css";

interface Props {
  className?: string;
  initialAnchorsData: AnchorsDataType;
  isEditable: boolean;
  highlightColor?: string;
  onAnchorsUpdate: (data: AnchorType[]) => void;
  children: any;
}

const defaultContext: AnchorsContextType = {
  anchorsData: { anchorText: "", anchorImageUrl: "", anchorsArray: [] },
  anchorsLogics: {
    setAnchorSelectionImageMode: () => null,
    setAnchorButtonVisible: () => null,
    setAnchorTextSelectionData: () => null,
    setAnchorFrameCoords: () => null,
    setAnchorFrameSize: () => null,
    setAnchorFrameCreated: () => null,
    setSelectedAnchorId: () => null,
    anchorButtonCancelHandler: () => null,
    anchorButtonConfirmHandler: () => null,
    createAnchor: () => null,
    deleteAnchor: () => null,
  },
  isEditable: false,
  selectedAnchorId: "",
  anchorButtonVisible: false,
  anchorFrameCoords: [],
  anchorFrameCreated: false,
  anchorSelectionImageMode: false,
};

export const AnchorDataContext =
  React.createContext<AnchorsContextType>(defaultContext);

const AnchorWrapper: React.FC<Props> = ({
  className,
  initialAnchorsData,
  isEditable,
  highlightColor,
  onAnchorsUpdate,
  children,
}) => {
  console.log("AnchorWrapper render");
  
  if (highlightColor)
    document.documentElement.style.setProperty(
      "--tia-color-accent",
      highlightColor
    );

  const { anchorText, anchorImageUrl } = initialAnchorsData;

  const [anchorsArray, setAnchorsArray] = useState(
    initialAnchorsData.anchorsArray
  );
  const [selectedAnchorId, setSelectedAnchorId] = useState("");
  const [anchorButtonVisible, setAnchorButtonVisible] = useState(false);
  const [anchorTextSelectionData, setAnchorTextSelectionData] = useState({
    selectedText: "",
    selectedTextStartPos: 0,
  });
  const [anchorFrameCoords, setAnchorFrameCoords] = useState([0, 0]);
  const [anchorFrameSize, setAnchorFrameSize] = useState([0, 0]);
  const [anchorFrameCreated, setAnchorFrameCreated] = useState(false);
  const [anchorSelectionImageMode, setAnchorSelectionImageMode] =
    useState(false);

  // Check for duplicates AnchorImage or AnchorText JSX components. Throws Error when finding one.
  useEffect(() => {
    let AnchorImage: React.FC | null = null;
    let AnchorText: React.FC | null = null;

    React.Children.toArray(children).forEach((element: any) => {
      switch (element.props.__TYPE) {
        case "AnchorText": {
          if (AnchorText !== null) {
            throw Error(
              "There can be only one AnchorText element inside AnchorWrapper."
            );
          }
          AnchorText = element;
          break;
        }
        case "AnchorImage": {
          if (AnchorImage !== null) {
            throw Error(
              "There can be only one AnchorImage element inside AnchorWrapper."
            );
          }
          AnchorImage = element;
          break;
        }
      }
    });
  }, [children]);

  const anchorButtonConfirmHandler = () => {
    setSelectedAnchorId("");
    setAnchorFrameCoords([0, 0]);
    setAnchorFrameSize([0, 0]);
    setAnchorFrameCreated(false);
    setAnchorSelectionImageMode(true);
  };
  const anchorButtonCancelHandler = () => {
    setSelectedAnchorId("");
    setAnchorFrameCoords([0, 0]);
    setAnchorFrameSize([0, 0]);
    setAnchorSelectionImageMode(false);
    setAnchorButtonVisible(false);
    setAnchorFrameCreated(false);
  };
  const createAnchor = () => {
    const { selectedText, selectedTextStartPos } = anchorTextSelectionData;
    const newAnchor: AnchorType = {
      _id: generateAnchorId(selectedText, anchorFrameCoords),
      anchorText: selectedText,
      anchorTextStartPos: selectedTextStartPos,
      anchorFrameCoords: anchorFrameCoords,
      anchorFrameSize: anchorFrameSize,
    };
    const newAnchorsArray = [...anchorsArray, newAnchor];
    setAnchorsArray(newAnchorsArray);
    onAnchorsUpdate(newAnchorsArray);
    anchorButtonCancelHandler();
  };

  const deleteAnchor = () => {
    const newAnchorsArray = anchorsArray.filter(
      (anchor) => anchor._id !== selectedAnchorId
    );
    setSelectedAnchorId("");
    setAnchorsArray(newAnchorsArray);
    onAnchorsUpdate(newAnchorsArray);
  };

  const context = {
    anchorsData: { anchorText, anchorImageUrl, anchorsArray },
    anchorsLogics: {
      setSelectedAnchorId,
      setAnchorButtonVisible,
      anchorButtonConfirmHandler,
      anchorButtonCancelHandler,
      setAnchorTextSelectionData,
      setAnchorSelectionImageMode,
      setAnchorFrameCoords,
      setAnchorFrameSize,
      setAnchorFrameCreated,
      createAnchor,
      deleteAnchor,
    },
    isEditable,
    selectedAnchorId,
    anchorFrameCreated,
    anchorFrameCoords,
    anchorSelectionImageMode,
    anchorButtonVisible,
  };

  return (
    <AnchorDataContext.Provider value={context}>
      <div className={className || undefined}>{children}</div>
    </AnchorDataContext.Provider>
  );
};

AnchorWrapper.defaultProps = {
  isEditable: false,
};

export default AnchorWrapper;
