import Position from "./model.js";
import request from "supertest";
import app from "../../loaders/app.js";

const getPositions = async (req, res) => {
    try {
        const positions = await Position.find();

        res.status(200).json(positions)
    } catch (error) {
        res.status(500).json({
            message: "Error getting positions"
        })
    }
}

const getPosition = async (req, res) => {
    try {
        const id = req.params.id;
        try {
            const position = await Position.findById(id);
            if (!position) {
                res.status(404).json({ message: "Position not found" })
            }
            res.status(200).json(position)
        } catch (error) {
            res.status(400).json({
                message: "Error getting positions"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Invalid Request"
        });
    }
}

const createPosition = async (req, res) => {
    try {
        const { title, initialSalary } = req.body;
            const position = await Position.create({
                title: title,
                initialSalary: initialSalary
            });
            res.status(201).json(position)
        
    } catch (err) {
        res.status(500).json({
            message: "Invalid Request"
        });
    }
}

const editPosition = async (req, res) => {
    try {
        const id = req.params.id;
        const positionToBeUpdated = await Position.findById(id);
        if (!positionToBeUpdated) {
            res.status(404).json({
                message: "Position not found"
            });
        } else {
            const { title, initialSalary } = req.body;
            if (title) {
                positionToBeUpdated.title = title
            };
            if (initialSalary) {
                positionToBeUpdated.initialSalary = initialSalary
            };

            try {
                await positionToBeUpdated.save();
                res.status(200).json({
                    message: "Position updated successfully"
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error updating position"
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const deletePosition = async (req, res) => {
    try {
        const id = req.params.id;
        const positionToBeDeleted = await Position.findById(id);
        if (positionToBeDeleted) {
            try {
                await positionToBeDeleted.remove();
                res.status(200).json({
                    message: "Position deleted successfully"
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error deleting position"
                });
            }
        } else {
            res.status(404).json({
                message: "Position not found"
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "Invalid Request"
        });
    }
}

const positionController = { createPosition, getPosition, getPositions, editPosition, deletePosition };
export default positionController;