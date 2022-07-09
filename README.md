# TIAL - text image anchoring library for React.

A library, that binds certain parts of the text to certain areas of the image on the html page, using highlighting text and corresponding selected image area.

## Install

[![npm](https://img.shields.io/npm/dm/react-number-format.svg)](https://www.npmjs.com/package/tial)

Through npm
`npm install @alanor87/tial`

Or get compiled development and production version from ./dist

### Usage

ES6

```js
import { AnchorWrapper, AnchorText, AnchorImage } from "@alanor87/tial";
```

## Overview

The functionality is implemented with usage of three react components :

```jsx 
<AnchorWrapper>{children}</AnchorWrapper> 
``` 
a wrapper, which provides a context for the interaction of highlighting text and corresponding image parts.


