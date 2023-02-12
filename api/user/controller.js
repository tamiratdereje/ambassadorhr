import Employee from "./model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        
        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({
            message: "Error getting employees"
        })
    }
}

const getEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        try {
            const employee = await Employee.findById(id);
            if (!employee) {
                res.status(404).json({message: "Employee not found"})
            }
            res.status(200).json(employee)
        } catch (error) {
            message: "Error getting employee"
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const createEmployee = async (req, res) => {
    try {
        const { firstName, lastName, gender, email, phone, birthdate, role, education, salary, positionId, latestPayrollId, password } = req.body;

        if (!(firstName && lastName && gender && phone && email && birthdate && role && education && salary && positionId && latestPayrollId)) {
            res.status(400).send("Fill all the required fields")
        }

        const existingEmployee = await Employee.findOne({ email });
        console.log(existingEmployee)
        if (existingEmployee) {
            return res.status(409).send({ message: "Employee Already Exist." });
        }
        
        const employeeCreator = await Employee.findById(req.body.employeeId)
        if (["ADMIN HR", "HR"].includes(role) && employeeCreator.role != "ADMIN HR"){
            return res.status(409).send({ message: "Employee not authorized." });
        }



        let new_password = Math.random().toString(36).slice(-8);
        let encryptedPassword = null;
        if (!password){
            encryptedPassword = await bcrypt.hash(new_password, 10)
        }else {
            encryptedPassword = await bcrypt.hash(password, 10)
        }

        const employee = await Employee.create({
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            email: email,
            phone: phone,
            birthDate: birthdate,
            role: role,
            education: education,
            salary: salary,
            positionId: positionId,
            latestPayrollId: latestPayrollId,
            password: encryptedPassword
        });

        return res.status(200).json({ data: employee, password: password })
    } catch (err) {
        console.log(err);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("Fill all the required fields.");
        }
        const employee = await Employee.findOne({ email });
        console.log(employee)
        if (employee && (await bcrypt.compare(password, employee.password))) {

            const token = jwt.sign(
                { employee_id: employee._id, email },
                process.env.JWT_KEY,
                {
                    expiresIn: "5h",
                }
            );
            res.header('token', token);
            res.cookie('jwt', token, { httpOnly: true });
            return res.status(200).json({ data: employee })
        } else {
            return res.status(400).json({ message: "The email and password doesn't match" });
        }

    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const editEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const employeeToBeUpdated = await Employee.findById(id);
        if (!employeeToBeUpdated) {
            res.status(404).json({
                message: "Employee not found"
            });
        } else {
            const { firstName, email, lastName, gender, phone, birthdate, role, education, salary, positionId, latestPayrollId } = req.body;
            if (firstName) {
                employeeToBeUpdated.firstName = firstName
            };
            if (email) {
                employeeToBeUpdated.email = email
            };
            if (lastName) {
                employeeToBeUpdated.lastName = lastName
            };
            if (gender) {
                employeeToBeUpdated.gender = gender
            };
            if (phone) {
                employeeToBeUpdated.phone = phone
            };
            if (birthdate) {
                employeeToBeUpdated.birthDate = birthdate
            }
            if (role) {
                employeeToBeUpdated.role = role
            };
            if (education) {
                employeeToBeUpdated.education = education
            };
            if (salary) {
                employeeToBeUpdated.salary = salary
            };
            if (positionId) {
                employeeToBeUpdated.positionId = positionId
            }
            if (latestPayrollId) {
                employeeToBeUpdated.latestPayrollId = latestPayrollId
            }

            try {
                await employeeToBeUpdated.save();
                res.status(200).json({
                    message: "Employee updated successfully"
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error updating employee"
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const employeeToBeDeleted = await Employee.findById(id);
        if (employeeToBeDeleted) {
            try {
                await employeeToBeDeleted.remove();
                res.status(200).json({
                    message: "Employee deleted successfully"
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error deleting employee"
                });
            }
        } else {
            res.status(404).json({
                message: "Employee not found"
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const employeeController = { createEmployee, login, getEmployee, getEmployees, editEmployee, deleteEmployee };
export default employeeController;