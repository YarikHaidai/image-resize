import { BadRequestException } from "@nestjs/common";

export const imageExtensionFilter = (request, image, callback) => {
  if (!image.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return callback(new BadRequestException("Only image files are allowed!"), false);
  }

  callback(null, true);
};