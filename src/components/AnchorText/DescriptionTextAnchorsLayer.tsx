import React from "react";
import { AnchorType } from "../../types/types";

type AnchorProps = {
  anchor: AnchorType;
  isMarked: boolean;
  onClickHandler: (e: React.MouseEvent) => void;
};

type DescriptionProps = {
  selectedAnchorId: string;
  anchorText: string;
  anchorsArray: AnchorType[];
  setSelectedAnchorId: (value: string) => void;
  showAnchorImageFrame: (anchorId: string) => void;
  hideAnchorImageFrame: (anchorId: string) => void;
};

const TextAnchorMark: React.FC<AnchorProps> = ({ anchor, isMarked, onClickHandler }) => {

  // Prevents selecting text that is already in markers.
  const onMouseEnter = (e: React.MouseEvent) => {
    if(e.buttons === 1 && e.altKey) window.getSelection()?.removeAllRanges();
  }

  return (
    <mark
      id={anchor._id}
      key={anchor._id}
      onClick={onClickHandler}
      onMouseEnter={onMouseEnter}
      style={
        isMarked
          ? {
              backgroundColor: "var(--tia-color-1)",
              color: "var(--tia-text-marker-text-color)",
            }
          : {}
      }
    >
      {anchor.anchorText}
    </mark>
  );
};

/** Component that parses description text to HTML,
 * using the anchors information, turning the anchored parts
 *  of text to <mark> JSX tags for interaction and stylization purposes.
 */

export const DescriptionTextAnchorsLayer: React.FC<DescriptionProps> = ({
  anchorText,
  anchorsArray,
  selectedAnchorId,
  setSelectedAnchorId,
  showAnchorImageFrame,
  hideAnchorImageFrame
}) => {
  
  // const [selectedAnchorId, setSelectedAnchorId] = useState('');

  const onClickHandler = (e: React.MouseEvent) => {
    if (selectedAnchorId === e.currentTarget.id) {
      setSelectedAnchorId('');
      hideAnchorImageFrame(e.currentTarget.id);
      return;
    }
    setSelectedAnchorId(e.currentTarget.id);
    showAnchorImageFrame(e.currentTarget.id);
  }

  if (!anchorsArray.length)
    return null;
  
  // Sorting anchors by their starting position in the description text.
  const sortedAnchorsArray = [...anchorsArray].sort(
    (anchor1, anchor2) => {
      return anchor1.anchorTextStartPos - anchor2.anchorTextStartPos;
    }
  );

  // Getting part of description that preceeds the first anchor.
  const descriptionStart = anchorText.slice(
    0,
    sortedAnchorsArray[0].anchorTextStartPos
  );

  // Creating and array of strings, each one of which starts with the anchor inside <mark> tag,
  // and ends right before start of the next anchor.
  const choppedDescriptionTextArray = sortedAnchorsArray.map(
    (anchor, index) => {
      let stringStartFromAnchor;
      if (index === sortedAnchorsArray.length - 1) {
        // If this is the last anchor - grabbing string to the end of description.
        stringStartFromAnchor = anchorText.slice(
          anchor.anchorTextStartPos
        );
      } else {
        // Grabbing string from anchor start to the next anchor start.
        stringStartFromAnchor = anchorText.slice(
          anchor.anchorTextStartPos,
          sortedAnchorsArray[index + 1].anchorTextStartPos
        );
      }
      // Bracing the anchor word, that starts at the 0 position in the string, with <mark> JSX.
      // then adding the rest of the string, deprived of anchorText.length symbols in the start.
      const stringWithTagedAnchor = [
        <TextAnchorMark
          anchor={anchor}
          isMarked={anchor._id === selectedAnchorId}
          key={anchor._id}
          onClickHandler={onClickHandler}
        />,
        stringStartFromAnchor.slice(anchor.anchorText.length),
      ];
      return stringWithTagedAnchor;
    }
  );

  // Concatenating beginning of the description with the modified anchored string/JSX parts.
  const parsedDescription = [
    descriptionStart,
    ...choppedDescriptionTextArray.flat(),
  ];

  return <div className="tia-text_highlight_layer">{parsedDescription}</div>;
};
