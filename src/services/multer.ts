import { NewRequestType } from './../types/index';
import multer from "multer";
import path from "path";
import fs from 'fs'


const storage = multer.diskStorage({
    destination: function(req: NewRequestType, file, cb) {
        const { pin } = req.user
        const directory = `${path.join(__dirname + "/../../uploads")}/${pin}`
        fs.mkdirSync(directory, { recursive: true })

        cb(null, directory);
    },
   
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ storage: storage }).single("file");