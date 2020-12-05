import Task from "../models/Task"

export const findAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()

        res.json(tasks)
    } catch (error) {
        res.status(500).json({
            message: 'Algo salio mal al obtener las tarea'
        })
    }

}

export const createTasks = async (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            message: 'Title is required'
        })
    }

    try {
        const newtask = new Task({
            title: req.body.title,
            description: req.body.description,
            done: req.body.done ? req.body.done : false
        })

        const taskSave = await newtask.save();

        res.json(taskSave)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Algo salio mal al crear la tarea'
        })
    }
}

export const findOneTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task)
            return res.status(404).send({
                message: `Tarea con el id ${id} no existe`
            })

        res.json(task)
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Id invalido'
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;

        await Task.findByIdAndDelete(id)

        res.json({
            message: `tarea eliminada sastisfactoriamente`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Id invalido'
        })
    }
}

export const findAllDoneTasks = async (req, res) => {
    const tasks = await Task.find({done: true})

    res.json(tasks)
}

export const updateTasks = async ({params, body}, res) => {
    try {
        const { id } = params;

        await Task.findByIdAndUpdate(id, body)

        res.json({
            message: 'Tarea actualizada'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Algo salio mal al actualizar la tarea'
        })
    }
}