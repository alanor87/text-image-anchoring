export interface AnchorType {
  _id: string;
  anchorText: string;
  anchorTextStartPos: number;
  anchorFrameCoords: number[];
  anchorFrameSize: number[];
}

export interface AnchorsDataType {
  anchorText: string;
  anchorImageUrl: string;
  anchorsArray: AnchorType[];
}

export interface AnchorTextSelectionData {
  selectedText: string;
  selectedTextStartPos: number;
}

export interface AnchorsLogicsType {
  setAnchorSelectionImageMode: (value: boolean) => void;
  setSelectedAnchorId: (id: string) => void;
  setAnchorFrameCreated: (value: boolean) => void;
  setAnchorTextSelectionData: (data: {
    selectedText: string;
    selectedTextStartPos: number;
  }) => void;
  setAnchorFrameCoords: (data: number[]) => void;
  setAnchorFrameSize: (data: number[]) => void;
  anchorButtonCancelHandler: () => void;
  anchorButtonConfirmHandler: () => void;
  setAnchorButtonVisible: (value: boolean) => void;
  createAnchor: () =>void;
  deleteAnchor: () =>void;
}

export interface AnchorsContextType {
  anchorsData: AnchorsDataType;
  anchorsLogics: AnchorsLogicsType;
  isEditable: boolean;
  anchorSelectionImageMode: boolean;
  anchorFrameCoords: number[];
  anchorFrameCreated: boolean;
  selectedAnchorId: string;
  anchorButtonVisible: boolean;
}

export interface AnchorTextMarkerFrameStyle {
  textColor?: string;
  outlineWidth?: string;
  borderRadius?: string;
}

export interface AnchorImageFrameStyle {
  boxShadow?: string;
  textColor?: string;
  borderWidth?: string;
  borderRadius?: string;
}

