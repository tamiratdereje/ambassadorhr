import Evaluation from "./model.js";
import jwt from "jsonwebtoken";
import Employee from "../user/model.js";

const getEvaluations = async (req, res) => {
    try {
        if (req.headers && (req.headers.cookie || req.headers.autherization)) {
            let token = req.headers.cookie.slice(4);
            if (token) {
                jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
                    if (err) {
                        return res.status(400).json({ error: { msg: "User not authenticated. The token sent is bad or expired." } }).end();
                    } else {
                        const employee = await Employee.findById(decodedToken.employee_id);
                        let evaluations = []
                        if (employee) {
                            try {
                                const allEvaluations = await Evaluation.find()
                                
                                allEvaluations.forEach(element => {
                                    console.log(element.evaluatorPositions.includes(employee.positionId))
                                    if (element.evaluatorPositions.includes(employee.positionId)) {
                                        evaluations.push(element)
                                    }
                                });
                                res.status(200).json(evaluations)
                            } catch (error) {
                                res.status(400).json({
                                    message: "Error while fetching evaluations"
                                })
                            }
                        }
                        
                    }
                });
            }

        }

    } catch (error) {
        res.status(500).json({
            message: "Error getting evaluations"
        })
    }
}

const getEvaluation = async (req, res) => {
    try {
        const id = req.params.id;
        try {
            const evaluation = await Evaluation.findById(id);
            if (!evaluation) {
                res.status(404).json({ message: "Evaluation not found" })
            }
            res.status(200).json(evaluation)
        } catch (error) {
            message: "Error getting evaluation"
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const createEvaluation = async (req, res) => {
    try {
        const { title, description, questionId, evaluatedPositions, evaluatorPositions, deadline } = req.body;

        if (!(title && description && questionId && evaluatedPositions && evaluatorPositions && deadline)) {
            res.status(400).send("Fill all the required fields")
        }


        const evaluation = await Evaluation.create({
            title: title,
            description: description,
            questionId: questionId,
            evaluatedPositions: evaluatedPositions,
            evaluatorPositions: evaluatorPositions,
            deadline: deadline
        });

        res.status(201).json({ evaluation });
    } catch (err) {
        console.log(err);
    }
}

const editEvaluation = async (req, res) => {
    try {
        const id = req.params.id;
        const evaluationToBeUpdated = await Evaluation.findById(id);
        if (!evaluationToBeUpdated) {
            res.status(404).json({
                message: "Evaluation not found"
            });
        } else {
            const { title, description, questionId, evaluatedPositions, evaluatorPositions, deadline } = req.body;
            if (title) {
                evaluationToBeUpdated.title = title
            };
            if (description) {
                evaluationToBeUpdated.description = description
            };
            if (questionId) {
                evaluationToBeUpdated.questionId = questionId
            };
            if (evaluatedPositions) {
                evaluationToBeUpdated.evaluatedPositions = evaluatedPositions;
            };
            if (evaluatorPositions) {
                evaluationToBeUpdated.evaluatorPositions = evaluatorPositions
            };
            if (deadline) {
                evaluationToBeUpdated.deadline = deadline
            }
            
            try {
                await evaluationToBeUpdated.save();
                res.status(200).json({
                    message: "Evaluation updated successfully"
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error updating evaluation"
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const deleteEvaluation = async (req, res) => {
    try {
        const id = req.params.id;
        const evaluationToBeDeleted = await Evaluation.findById(id);
        if (evaluationToBeDeleted) {
            try {
                await evaluationToBeDeleted.remove();
                res.status(200).json({
                    message: "Evaluation deleted successfully"
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error deleting evaluation"
                });
            }
        } else {
            res.status(404).json({
                message: "Evaluation not found"
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const evaluationController = { createEvaluation, getEvaluation, getEvaluations, editEvaluation, deleteEvaluation };
export default evaluationController;