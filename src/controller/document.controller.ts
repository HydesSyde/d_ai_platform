import type { RequestHandler} from "express";
import { uploads } from "../utils/multer.js";
import { db } from "../db.js";
import { documents } from "../schema/document.js";
import { eq } from "drizzle-orm";
import { success } from "zod";

const upload : RequestHandler = async (req, res) => {
        uploads.single("file")(req, res, async(err)=> {
               console.log("CONTENT TYPE:", req.headers["content-type"]);
                console.log("FILE:", req.file);
                console.log("BODY:", req.body);
                console.log("MULTER ERROR:", err);

        if (err) return res.status(400).json({ error: err.message });
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        try {
        if(!req.file) {
            return res.status(400).json({ error: "No file uploaded"});
        }

        const {originalname, mimetype, size} = req.file;

        const storageKey = Date.now() + "-" + originalname;

        const [newDocument] = await db.insert(documents).values({
                userId: (req as any).user.id,
                originalFileName: originalname,
                mimeType: mimetype,
                sizeByte: size,
                storageKey: storageKey,
                status: "pending"
                }).returning();

        res.status(201).json({
            success: true,
            message: "file uploaded successfully",
            newDocument
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error. Unable to upload file"
        })
    }
    })  
}

const deleteDocument: RequestHandler = async (req, res) => {
        try {

            const {id} = req.params;

            if(!id) {
                return res.status(409).json({
                    success: false,
                    message: "No document selected"
                })
            }

            const deletedDoc = await db
            .delete(documents)
            .where(eq(documents.id, Number(id))).returning();


            if(!deletedDoc.length) {
                return res.status(404).json({
                    success: false,
                    message: "Document not found"
                })
            }

            res.status(202).json({
                success: true,
                message: "Document deleted successfully"
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error. Unable to delete Document"
            })
        }
}

const getAllDoc: RequestHandler = async (req, res) => {
        try {
            const query = await db.select().from(documents);

            if(!query.length){
                return res.status(404).json({
                    message: "No documents founds"
                })
            }

            res.status(201).json({
                success: true,
                message: "Documents are ready to view",
                query
            })

            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Erorr. Unable to get all Documents"
            })
        }
}


const getOneDoc: RequestHandler = async (req, res) => {
try {
    const {id} = req.params;

    if(!id){
        return res.status(404).json({
            success: false,
            message: "No ids are provided"                                                                                                                                                                              
        })
    }

    const singleQuery = await db.select().from(documents).where(eq(documents.id, Number(id)));

    if(!singleQuery) {
        return res.status(404).json({
            success: false,
            message: "No documents exists"
        })
    }

    res.status(201).json({
        success: true,
        message: "Document retrieval successful",
        singleQuery
    })
    
} catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        messsage: "Internal Serveer Error. Unable to get a document"
    })
}
}

export {upload, getAllDoc,  getOneDoc, deleteDocument}