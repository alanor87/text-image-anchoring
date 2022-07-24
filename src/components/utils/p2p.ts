// Function of getting percantage size of image frame anchor relatively to the image size.

function pixels2percentage(wholePixels: number, partPixels: number) {
    return partPixels / wholePixels * 100 ;
   };
   
   export default pixels2percentage;