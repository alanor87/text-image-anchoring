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
  highlightColor?: string;
  onAnchorsUpdate?: (data: AnchorType[]) => void;
  onAnchorSelect?: (_id: string) => void;
  __TYPE?: string;
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
  highlightColor,
  onAnchorsUpdate,
  onAnchorSelect,
  children,
}) => {
  if (highlightColor)
    document.documentElement.style.setProperty(
      "--tial-color-1",
      highlightColor
    );

  const {
    anchorText,
    anchorImageUrl,
    anchorsArray: initialAnchorsArray,
  } = initialAnchorsData;

  const [anchorsArray, setAnchorsArray] = useState(initialAnchorsArray);
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
  const [error, setError] = useState("");

  // Recursive check for duplicates AnchorImage or AnchorText JSX components.
  // Deep search is performed - for all folded componenets. Checking Throws Error when finding one.
  const duplicateCheck = (children: React.ReactNode | React.ReactNode[]) => {
    let AnchorImage: React.FC | null = null;
    let AnchorText: React.FC | null = null;

    const recursiveSearch = (children: React.ReactNode | React.ReactNode[]) => {
      React.Children.toArray(children).forEach((element: any) => {
        // If element does not have props (therefore, it is not react componenet of any kind) - skipping it.
        if (!element.props) return;

        switch (element.props.__TYPE) {
          case "AnchorWrapper" : {
            const errorMsg =
                "AnchorWrapper shoud not be passed as child to another AnchorWrapper component..";
              setError(errorMsg);
              throw Error(errorMsg);
          }
          case "AnchorText": {
            if (AnchorText !== null) {
              const errorMsg =
                "There can be only one AnchorText element inside AnchorWrapper.";
              setError(errorMsg);
              throw Error(errorMsg);
            }
            AnchorText = element;
            return;
          }
          case "AnchorImage": {
            if (AnchorImage !== null) {
              const errorMsg =
                "There can be only one AnchorImage element inside AnchorWrapper.";
              setError(errorMsg);
              throw Error(errorMsg);
            }
            AnchorImage = element;
            return;
          }
        }

        if (element.props.children) recursiveSearch(element.props.children);
      });
    };

    try {
      recursiveSearch(children);
    } catch (error: any) {
      console.error("@alanor87/tial error : ", error.message);
    }
  };

  // Returning the selected anchorId, if the callback is provided.
  useEffect(() => {
    if (onAnchorSelect) onAnchorSelect(selectedAnchorId);
  }, [selectedAnchorId]);

  // The text and image url are passed directly from initialAnchorsData to context, since we are not editing them inside the AnchorWrapper.
  // The anchorsArray is stored in the local state (being initialized by array from initialAnchorsData, and then lives it's own life
  // inside of the AnchorWrapper - anchord are being added or deleted. When changing one of the initial data elements - array, text, or url - 
  // the brand new object needs to be passed in order for the effect to fire and updated the anchorsArray state. The text and url are coming straight
  // to the context as they are passed.
  useEffect(() => {
    setAnchorsArray(initialAnchorsArray);
    setSelectedAnchorId("");
  }, [initialAnchorsData]);

  // Recursive check for duplicates AnchorImage or AnchorText JSX components is triggered.
  useEffect(() => {
    if (children) duplicateCheck(children);
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
    if (!onAnchorsUpdate) return;
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
    if (!onAnchorsUpdate) return;
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
    isEditable: Boolean(onAnchorsUpdate),
    selectedAnchorId,
    anchorFrameCreated,
    anchorFrameCoords,
    anchorSelectionImageMode,
    anchorButtonVisible,
  };

  return (
    <AnchorDataContext.Provider value={context}>
      <div className={className || undefined}>
        {!error ? children : <div className="tial-error-message">{'Tial-lib error : ' + error}</div>}
      </div>
    </AnchorDataContext.Provider>
  );
};

AnchorWrapper.defaultProps = {
  __TYPE: "AnchorWrapper",
}

export default AnchorWrapper;
