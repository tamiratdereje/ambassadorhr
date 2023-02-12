import Employee from "../api/user/model.js";
import bcrypt from "bcrypt";


const createAdmin = async () => {
    try {
        const email = "admin@ambasador"
        const admin = await Employee.findOne({ email })
        const encryptedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
        if (!admin) {
            await Employee.create({
                "firstName": "admin",
                "lastName": "admin",
                "gender": "MALE",
                "email": process.env.ADMIN_EMAIL,
                "phone": "admin",
                "birthDate": "1995-12-17T03:24:00",
                "role": "ADMIN HR",
                "education": "education",
                "salary": 1000,
                "positionId": "63e80402cec8458e3f54c124",
                "latestPayrollId": "4edd40c86762e0fb12000003",
                "password": encryptedPassword
            })
        }

    } catch (error) {
        console.log(error)
    }

}

export default createAdmin;