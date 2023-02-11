import Payroll from "./model.js";
import request from "supertest";
import app from "../../loaders/app.js";

const getPayrolls = async (req, res) => {
    try {
        const payrolls = await Payroll.find();

        res.status(200).json(payrolls)
    } catch (error) {
        res.status(500).json({
            message: "Error getting payrolls"
        })
    }
}

const getPayroll = async (req, res) => {
    try {
        const id = req.params.id;
        try {
            const payroll = await Payroll.findById(id);
            if (!payroll) {
                res.status(404).json({ message: "Payroll not found" })
            }
            res.status(200).json(payroll)
        } catch (error) {
            res.status(400).json({
                message: "Error getting payrolls"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Invalid Request"
        });
    }
}

const createPayroll = async (req, res) => {
    try {
        const { employeeId, status, description } = req.body;

        if (employeeId) {
            const payroll = await Payroll.create({
                employeeId: employeeId,
                status: status,
                description: description
            });
            try {
                console.log(employeeId)
                await request(app).patch("/api/v1/employee/" + employeeId).send({ "latestPayrollId": payroll._id })
            } catch (error) {
                res.status(400).json({
                    message: "Couldn't update the employee's data"
                })
            }
            res.status(201).json(payroll
            )
        }
    } catch (err) {
        res.status(500).json({
            message: "Invalid Request"
        });
    }
}

const editPayroll = async (req, res) => {
    try {
        const id = req.params.id;
        const payrollToBeUpdated = await Payroll.findById(id);
        if (!payrollToBeUpdated) {
            res.status(404).json({
                message: "Payroll not found"
            });
        } else {
            const { employeeId, status, description } = req.body;
            if (employeeId) {
                payrollToBeUpdated.employeeId = employeeId
            };
            if (status) {
                payrollToBeUpdated.status = status
            };
            if (description) {
                payrollToBeUpdated.description = description
            };

            try {
                await payrollToBeUpdated.save();
                res.status(200).json({
                    message: "Payroll updated successfully"
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error updating payroll"
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const deletePayroll = async (req, res) => {
    try {
        const id = req.params.id;
        const payrollToBeDeleted = await Payroll.findById(id);
        if (payrollToBeDeleted) {
            try {
                await payrollToBeDeleted.remove();
                res.status(200).json({
                    message: "Payroll deleted successfully"
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error deleting payroll"
                });
            }
        } else {
            res.status(404).json({
                message: "Payroll not found"
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const payrollController = { createPayroll, getPayroll, getPayrolls, editPayroll, deletePayroll };
export default payrollController;