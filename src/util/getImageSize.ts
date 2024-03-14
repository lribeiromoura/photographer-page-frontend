export const getImgSize = (imgSrc: string) => {
  var newImg = new Image();

  newImg.src = imgSrc;
  return {
    width: newImg.width,
    height: newImg.height,
  };
};
