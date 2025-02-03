import { z } from "zod"

const userValidateSchema = z.object({

    username: z.string().min(3, "username should contain atleast 3 characters").max("username can have at most 15 characters"),
    firstName: z.string().min(3, "first name should be minimum 3 characters ").max(30, "first name maximum can contain 30 characters"),
    lastName: z.string().min(3, "last name should be minimum 3 characters ").max(30, "last name maximum can contain 30 characters"),
    password: z.string().min(6, "minimum 6 characters required").max(18, "ppassword maximum can contain 18 characters")
});

const userLoginValidateSchema = z.object({
    username: z.string().min(3, "username should contain atleast 3 characters").max("username can have at most 15 characters"),
    password: z.string().min(6, "minimum 6 characters required").max(18, "ppassword maximum can contain 18 characters")

})

const validateUserSignup = (data) => {

    try {
        userValidateSchema.safeParse(data);
        return {
            sucess: true
        }

    } catch (err) {

        return {
            success: false,
            error: err.errors.map(e => e.message).join(", ")
        }

    }
}

const validateUserSignin = (data) => {

    try {
        userLoginValidateSchema.safeParse(data);
        return {
            sucess: true
        }

    } catch (err) {

        return {
            success: false,
            error: err.errors.map(e => e.message).join(", ")
        }

    }
}

export { validateUserSignup, validateUserSignin } 