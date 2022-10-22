# TIAL (v0.1.13) - text image anchoring library for React.


A library, that binds certain parts of the text to certain areas of the image on the html page, using highlighting text and corresponding selected image area.

## Demo page

http://tial-lib.com

## Install

[![npm](https://img.shields.io/npm/dm/react-number-format.svg)](https://www.npmjs.com/package/@alanor87/tial)

Through npm
`npm install @alanor87/tial`

### Usage

ES6

```js
import { AnchorWrapper, AnchorText, AnchorImage } from "@alanor87/tial";
```

## Overview

### Components

The functionality is implemented with usage of three react components :

#### AnchorWrapper
```jsx 
<AnchorWrapper>{children}</AnchorWrapper> 
``` 
A wrapper, which provides a context for the interaction of highlighting text and corresponding image parts. Accepts children compoenents in arbitrary amounts, order and nesting levels. You can arrange all the contents of the wrapper block in the desired way and pass the anchored image and text blocks in any order and in any place among onther children componenets - they are going to be bound together through the common AnchorWrapper context.
AnchorWrapper must not contain more than one AnchorText or AnchorImage - an error will be thrown in such case. Every pair of AnchorTexy/AnchorImage must be wrapped inside their own AnchorWrapper container.


| Props              |         Type  |     Required  |      Default  |  Description  |
| -------------      | ------------- | ------------- | ------------- | ------------- |
| className          |    string     |     false     |     none      | Additional style through class name for the wrapper.  |
| initialAnchorsData |   object (AnchorsDataType) |     true      |     none      | The object, that includes original text, imageUrl and anchors data. For the structure  - see the Types section below. |
| highlightColor     |    string    |     false     |     none      | The highlighting color of anchors. Takes any CSS interpretable color value.|
| onAnchorsUpdate    |   function |     false     |     none      | Callback that gets updated list of anchors (see Types section). If undefined - option of creating and deleting anchors is not available.
| onAnchorSelect     |   function |     false     |     none      | Callback that gets id of selected anchor when it is being changed.

 

#### AnchorText
```jsx 
<AnchorText />
``` 
Container with the marked (anchored) text.


| Props         |         Type  |     Required  |      Default  |  Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| className     |    string     |     false     |     none      | Additional style through class name for the text container.  |
| textMarkerStyle |    object   |     false     |     none      | Additional styles for the highlighting text marker. See Types below for the structure.  |


#### AnchorImage
```jsx 
<AnchorImage />
``` 
Container with the marked (anchored) image.

| Props         |         Type  |     Required  |      Default  |  Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| className     |    string     |     false     |     none      | Additional style through class name for the text container.  |
| imageFrameStyle |    object   |     false     |     none      | Additional styles for the highlighting image frame. See Types below for the structure.  |



### Types

#### AnchorType
```ts 
 interface AnchorType {
  _id: string;
  anchorText: string;
  anchorTextStartPos: number;
  anchorFrameCoords: number[];
  anchorFrameSize: number[];
}
```
| Key         |  Description  |
| ----------- | ------------- |
| _id         |  Unique id for each anchor. |
| anchorText  |  The text that should be in the highlighted marker. |
| anchorTextStartPos  |  The starting position of the highlighted text inside of the anchored text block. |
| anchorFrameCoords  |  X and Y coordinates of the upper left corner of the highlighing frame on the anchored image (percentage from image display size). |
| anchorFrameSize  |  Width and height of the highlighing frame on the anchored image (percentage from image display size). |

#### AnchorsDataType

```ts
 interface AnchorsDataType {
  anchorText: string;
  anchorImageUrl: string;
  anchorsArray: AnchorType[];
}
```
| Key         |  Description  |
| ----------- | ------------- |
| anchorText  | The anchored text block, should be passed a a single solid string. |
| anchorImageUrl | Url of the anchored image. |
| anchorsArray | Array of anchors for the coupled text and image components. |


#### AnchorTextMarkerFrameStyle

```ts
  interface AnchorTextMarkerFrameStyle {
  textColor?: string;
  outlineWidth?: string;
  borderRadius?: string;
}
```
| Key         |  Description  |
| ----------- | ------------- |
| textColor  | Color of the text in marker - when the marker was selected. Takes any CSS interpretable color value.|
| outlineWidth | Width of the text marker outline. Takes any CSS interpretable outline-width value.|
| borderRadius | Border radius for text marker. Takes any CSS interpretable border-radius value.|

#### AnchorImageFrameStyle

```ts
  interface AnchorImageFrameStyle {
  boxShadow?: string;
  textColor?: string;
  borderWidth?: string;
  borderRadius?: string;
}
```
| Key         |  Description  |
| ----------- | ------------- |
| boxShadow  | Box shadow for the image frame. Takes any CSS interpretable box-shadow value.|
| textColor | Color of the text inside of the image frame. Takes any CSS interpretable color value.|
| borderWidth | Width of the image frame border. Takes any CSS interpretable border-width value.|
| borderRadius | Border radius for text marker. Takes any CSS interpretable border-radius value.|


