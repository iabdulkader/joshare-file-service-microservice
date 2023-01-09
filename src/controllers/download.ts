import { NewRequestType } from "index";
import { Response } from "express";
import userModel from "../db/model/userModel";

const downloadController = async (req: NewRequestType, res: Response) => {
    const { id } = req.params;

    try {
        const file = await userModel.findOne({ pin: req.user.pin, 'files.id': id }, { 'files.$': 1 });
        const fileUrl = file?.files[0].url;

        if (fileUrl) {
            res.download(fileUrl, file?.files[0].name, function (err) {
                if (err) {
                    res.status(404).json({
                        success: false,
                        status: "error",
                        message: "Error while downloading file",
                        });
                }});
        } else {
            res.status(404).json({
                success: false,
                status: "error",
                message: "File not found",
            });
        }
        
    } catch (error) {
        res.status(404).json({
            success: false,
            status: "error",
            message: "File not found",
        });
    }
}

export default downloadController;