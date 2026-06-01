import express, { type Request, type Response } from "express"
import authRouter from "./route/auth.route.js"
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
        res.json({message: "Here we go!"});
})

app.use("/api/v1/auth", authRouter);


export default app