import { extname } from "path";
import { Md5 } from "md5-typescript";

export const imageFileName = (req, image, callback) => {
  const extension = extname(image.originalname);
  const randomName = Md5.init(image.originalname).slice(0, 15);
  const time = (new Date()).getTime();

  callback(null, `${randomName}-${time}${extension}`);
};