import Question from "./model.js";
import request from "supertest";
import app from "../../loaders/app.js";

const getQuestions = async (req, res) => {
    try {
        console.log(req.body)
        const questions = await Question.find();

        res.status(200).json(questions)
    } catch (error) {
        res.status(500).json({
            message: "Error getting questions"
        })
    }
}

const getQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        try {
            const question = await Question.findById(id);
            if (!question) {
                res.status(404).json({ message: "Question not found" })
            }
            res.status(200).json(question)
        } catch (error) {
            res.status(400).json({
                message: "Error getting questions"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Invalid Request"
        });
    }
}

const createQuestion = async (req, res) => {
    try {
        const { description, answer } = req.body;
            const question = await Question.create({
                answer: answer,
                description: description
            });
           
            res.status(201).json(question)
       
    } catch (err) {
        res.status(500).json({
            message: "Invalid Request"
        });
    }
}

const editQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        const questionToBeUpdated = await Question.findById(id);
        if (!questionToBeUpdated) {
            res.status(404).json({
                message: "Question not found"
            });
        } else {
           const { description, answer } = req.body;
            if (answer) {
                questionToBeUpdated.answer = answer
            };
            if (description) {
                questionToBeUpdated.description = description
            };

            try {
                await questionToBeUpdated.save();
                res.status(200).json({
                    message: "Question updated successfully"
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error updating question"
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        const questionToBeDeleted = await Question.findById(id);
        if (questionToBeDeleted) {
            try {
                await questionToBeDeleted.remove();
                res.status(200).json({
                    message: "Question deleted successfully"
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error deleting question"
                });
            }
        } else {
            res.status(404).json({
                message: "Question not found"
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const questionController = { createQuestion, getQuestion, getQuestions, editQuestion, deleteQuestion };
export default questionController;