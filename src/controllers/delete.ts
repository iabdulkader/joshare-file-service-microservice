import { NewRequestType } from "index";
import { Response } from "express";
import fs from 'fs'

const deleteController = async (req: NewRequestType, res: Response) => {
    const { url } = req.body;

    try {
        fs.unlink(url, (err) => {
            if (err) {
                res.status(404).json({
                    success: false,
                    status: "error",
                    message: "Error while deleting file",
                });
            }
        });

        res.json({
            success: true,
            status: "File deleted",
        })

    } catch (error) {
        console.log(error)
        res.status(404).json({
            success: false,
            status: "error",
            message: "File not found",
        });
    }
}

export default deleteController;