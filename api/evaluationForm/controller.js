import EvaluationForm from "./model.js";
import jwt from "jsonwebtoken";
import Employee from "../user/model.js";

const getEvaluationForms = async (req, res) => {
    try {
        if (req.headers && (req.headers.cookie || req.headers.autherization)) {
            let token = req.headers.cookie.slice(4);
            if (token) {
                jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
                    if (err) {
                        return res.status(400).json({ error: { msg: "User not authenticated. The token sent is bad or expired." } }).end();
                    } else {
                        const employee = await Employee.findById(decodedToken.employee_id);
                        let evaluationForms = []
                        if (employee) {
                            try {
                                const allEvaluationForms = await EvaluationForm.find()
                                
                                allEvaluationForms.forEach(element => {
                                    console.log(element.evaluatorPositions.includes(employee.positionId))
                                    if (element.evaluatorPositions.includes(employee.positionId)) {
                                        evaluationForms.push(element)
                                    }
                                });
                                res.status(200).json(evaluationForms)
                            } catch (error) {
                                res.status(400).json({
                                    message: "Error while fetching evaluationForms"
                                })
                            }
                        }
                        
                    }
                });
            }

        }

    } catch (error) {
        res.status(500).json({
            message: "Error getting evaluationForms"
        })
    }
}

const getEvaluationForm = async (req, res) => {
    try {
        const id = req.params.id;
        try {
            const evaluationForm = await EvaluationForm.findById(id);
            if (!evaluationForm) {
                res.status(404).json({ message: "EvaluationForm not found" })
            }
            res.status(200).json(evaluationForm)
        } catch (error) {
            message: "Error getting evaluationForm"
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const createEvaluationForm = async (req, res) => {
    try {
        const { title, description, questionId, evaluatedPositions, evaluatorPositions, deadline } = req.body;

        if (!(title && description && questionId && evaluatedPositions && evaluatorPositions && deadline)) {
            res.status(400).send("Fill all the required fields")
        }


        const evaluationForm = await EvaluationForm.create({
            title: title,
            description: description,
            questionId: questionId,
            evaluatedPositions: evaluatedPositions,
            evaluatorPositions: evaluatorPositions,
            deadline: deadline
        });

        res.status(201).json({ evaluationForm });
    } catch (err) {
        console.log(err);
    }
}

const editEvaluationForm = async (req, res) => {
    try {
        const id = req.params.id;
        const evaluationFormToBeUpdated = await EvaluationForm.findById(id);
        if (!evaluationFormToBeUpdated) {
            res.status(404).json({
                message: "EvaluationForm not found"
            });
        } else {
            const { title, description, questionId, evaluatedPositions, evaluatorPositions, deadline } = req.body;
            if (title) {
                evaluationFormToBeUpdated.title = title
            };
            if (description) {
                evaluationFormToBeUpdated.description = description
            };
            if (questionId) {
                evaluationFormToBeUpdated.questionId = questionId
            };
            if (evaluatedPositions) {
                evaluationFormToBeUpdated.evaluatedPositions = evaluatedPositions;
            };
            if (evaluatorPositions) {
                evaluationFormToBeUpdated.evaluatorPositions = evaluatorPositions
            };
            if (deadline) {
                evaluationFormToBeUpdated.deadline = deadline
            }
            
            try {
                await evaluationFormToBeUpdated.save();
                res.status(200).json({
                    message: "EvaluationForm updated successfully"
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error updating evaluationForm"
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const deleteEvaluationForm = async (req, res) => {
    try {
        const id = req.params.id;
        const evaluationFormToBeDeleted = await EvaluationForm.findById(id);
        if (evaluationFormToBeDeleted) {
            try {
                await evaluationFormToBeDeleted.remove();
                res.status(200).json({
                    message: "EvaluationForm deleted successfully"
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error deleting evaluationForm"
                });
            }
        } else {
            res.status(404).json({
                message: "EvaluationForm not found"
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const evaluationFormController = { createEvaluationForm, getEvaluationForm, getEvaluationForms, editEvaluationForm, deleteEvaluationForm };
export default evaluationFormController;