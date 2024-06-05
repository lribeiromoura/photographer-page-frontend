export const getImgSize = (imgSrc: string) => {
  const newImg = new Image();

  newImg.src = imgSrc;
  return {
    width: newImg.width,
    height: newImg.height,
  };
};
