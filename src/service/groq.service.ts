import { db } from "../db.js"


export const grqService = async (content: any) => {
    try {
        
    } catch (error: any) {
        if (error.code === "ECONNABORTED") {
            throw new Error("Grow API Timeout");
        }
        if (error.response?.status === 429) {
            throw new Error("Grow rate limit exceeded");
        }
        console.log(error);
        throw new Error("Unable to start api service")
    }
}