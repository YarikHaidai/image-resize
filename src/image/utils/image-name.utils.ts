const path = require('path');
import {Md5} from "md5-typescript";

export const imageFileName = (req, image, callback) => {
    let extension = path.extname(image.originalname);
    let randomName = Md5.init(image.originalname).slice(0, 15);
    let time = (new Date()).getTime();

    callback(null, `${randomName}-${time}${extension}`);
};