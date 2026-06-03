import multer from "multer";

const uploads = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./uploads/")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    }),
    limits: {
        fileSize: 15 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const alllowedFileType = ["image/png", "image/jpg", "applications/pdf"];

        if(alllowedFileType.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only images and pdfs are allowed"));
        }
    }
})


export { uploads }