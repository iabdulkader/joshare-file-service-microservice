import { NewRequestType, FileType } from './../types/index';
import { Response } from "express";
import multer from "multer";
import { upload } from "../services/multer";
import userModel from "../db/model/userModel";
import path from 'path';
import { sizeModifier } from '../utils/sizeModifier';

const uploadController = async (req: NewRequestType, res: Response) => {

    try {
        upload(req, res, async function (err,) {
            if (err instanceof multer.MulterError) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    status: "error",
                    message: err.message,
                })
            } else if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    status: "error",
                    message: err.message,
                })
            }
    
            try {
                const file = req.file as Express.Multer.File;
    
                const newFile: FileType = {
                    id: req.body.fileId,
                    name: file.originalname,
                    ext: path.extname(file.originalname).replace(/^\./, ""),
                    size: sizeModifier(file.size),
                    url: file.path,    
                }
    
                await userModel.findOneAndUpdate({ 
                        pin: req.user.pin 
                    }, { 
                        $push: { 
                            files: newFile 
                        } }, { new: true });
            
                res.json({
                    success: true,
                    status: "success",
                    data: newFile,
                });
            } catch (error) {
                res.json({
                    success: false,
                    status: "error",
                    message: error.message,
                });
            }
            
            
        });  
    } catch (error) {
        console.log(error.message)
    }
}

export default uploadController;