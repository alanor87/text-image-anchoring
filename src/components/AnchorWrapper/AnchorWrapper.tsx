import React, { useEffect, useState } from "react";

interface Props {
  className?: string;
  data: any;
  isEditable: boolean;
  onAnchorSave?: () => void;
  children: any;
}

const defaultContext = {
  anchorText: "",
  anchorImageUrl: "",
  anchorsArray: [],
};

export const AnchorDataContext = React.createContext(defaultContext);

const AnchorWrapper: React.FC<Props> = ({
  className,
  data,
  isEditable,
  onAnchorSave,
  children,
}) => {
  
  // Check for duplicates AnchorImage or AnchorText. Throws Error when finding one.
  useEffect(() => {
    let AnchorImage: React.FC | null = null;
    let AnchorText: React.FC | null = null;

    React.Children.toArray(children).forEach((element: any, index) => {
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

  return (
    <AnchorDataContext.Provider value={data}>
      <div className={className || undefined}>{children}</div>
    </AnchorDataContext.Provider>
  );
};

export default AnchorWrapper;
