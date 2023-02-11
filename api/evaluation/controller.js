import Evaluation from "./model.js";

const getEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find();

        res.status(200).json(evaluations)
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
            res.status(400).json({
                message: "Error getting evaluations"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Invalid Request"
        });
    }
}

const createEvaluation = async (req, res) => {
    try {
        const { evaluatorId, evaluatedId, formId, result} = req.body;

       
            const evaluation = await Evaluation.create({
                evaluatedId: evaluatedId,
                evaluatorId: evaluatorId,
                formId: formId,
                result: result
            });
        
            res.status(201).json(evaluation)
    } catch (err) {
        res.status(500).json({
            message: "Invalid Request"
        });
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
            const { evaluatorId, evaluatedId, formId, result} = req.body;
            if (evaluatorId) {
                evaluationToBeUpdated.evaluatorId = evaluatorId;
            };
            if (evaluatedId) {
                evaluationToBeUpdated.evaluatedId = evaluatedId
            };
            if (formId) {
                evaluationToBeUpdated.formId = formId
            };
            if(result) {
                evaluationToBeUpdated.result = result
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