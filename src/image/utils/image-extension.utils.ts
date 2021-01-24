export const imageExtensionFilter = (request, image, callback) => {
    if ( !image.originalname.match(/\.(jpg|jpeg|png|gif)$/) ) {
        return callback(new Error('Only image files are allowed!'), false);
    }

    callback(null, true);
}