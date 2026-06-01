import z from "zod"


//function to validate User Sign UP
const registrationValidator = z.object({
    fullname: z.string().min(3),
    email: z.email(),
    password: z.string().min(8)
});

//function to validate User Sign In
const signInValidator = z.object({
    email: z.email(),
    password: z.string().min(8)
})



export {registrationValidator, signInValidator};