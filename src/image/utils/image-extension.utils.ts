export const imageExtensionFilter = (request, image, callback) => {
    if ( !image.originalname.match(/\b.(jpg|jpeg|gif|png)\b$/) ) {
        return callback(new Error('Only image files are allowed!'), false);
    }

    callback(null, true);
}