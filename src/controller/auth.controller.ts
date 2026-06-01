import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { registrationValidator, signInValidator } from "../validation/auth.validator.js";
import { db } from "../db.js";
import { users } from "../schema/users.js";
import { eq } from "drizzle-orm";
import { generateAccessToken } from "../utils/generateTokens.js";


//regex for password. Requires uppercase, lowercase, number, special character and min of 8 characters
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signUp = async (req: Request , res: Response) => {
        try {
              const {fullname, email, password} = registrationValidator.parse(req.body);

                if(!fullname || !email || !password){
                    return res.status(422).json({
                        success: false,
                        message: "Fill all input details"
                    })
                }

                if(!passwordRegex.test(password)){
                    return res.status(422).json({
                        success: false,
                        message: "Wrong password details"
                    })}

            
            const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

            if(existingUser.length) {
                return res.status(409).json({
                    success: false,
                    message: "User already exists"
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await db
            .insert(users)
            .values({
                fullname,
                email,
                password: hashedPassword,
                role: "user",
                token: ""
            }).returning();


            const token = generateAccessToken(newUser);

            res.status(201).json({
                success: true,
                token,
                data: newUser[0]
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal Server error. Registration failed"
            })
        }
}

// const signIn = async (req: Request , res: Response) => {
//         try {

//                 //validate user input
//                 const { email, password } = signInValidator.parse(req.body);

//                 //check if user exists in db
//                 const foundUser = await db
//                 .select()
//                 .from(users)
//                 .where(eq(users.email, email));

//                 if (!foundUser.length) {
//                 return res.status(400).json({
//                     message: "User not found",
//                     success: false,
//                 });
//                 }

//                     //check for correct password by comparing using bcrypt
//                 const correctPassword = bcrypt.compare(
//                     password,
//                     foundUser[0]?.password
//                 );

//                 if (!correctPassword) {
//                 return res.status(401).json({ message: "Invalid credentials" });
//                 }

//             //generate access token
//             const token = generateAccessToken(foundUser);

//                 res.status(201).json({
//                     success: true,
//                 })
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({
//                 success: false,
//                 message: "Internal Server error. Sign-In failed"
//             })
//         }
// }

export {signUp}