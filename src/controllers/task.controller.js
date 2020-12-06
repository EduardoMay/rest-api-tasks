import Task from '../models/Task';
import { getPagination } from './../libs/getPagination';

export const findAllTasks = async ({ query }, res) => {
	try {
		const { size, page, title } = query;

		const condition = title
			? { title: { $regex: new RegExp(title), $options: 'i' } }
			: {};

		const { limit, offset } = getPagination(page, size);

		const tasks = await Task.paginate(condition, { offset, limit });

		res.json(tasks);
	} catch (error) {
		res.status(500).json({
			message: 'Algo salio mal al obtener las tarea',
		});
	}
};

export const createTasks = async ({ body }, res) => {
	const { title, description, done } = body;

	if (!title) {
		return res.status(400).send({
			message: 'Title is required',
		});
	}

	try {
		const newtask = new Task({
			title: title,
			description: description,
			done: done ? done : false,
		});

		const taskSave = await newtask.save();

		res.json(taskSave);
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Algo salio mal al crear la tarea',
		});
	}
};

export const findOneTask = async ({ params }, res) => {
	try {
		const { id } = params;

		const task = await Task.findById(id);

		if (!task)
			return res.status(404).send({
				message: `Tarea con el id ${id} no existe`,
			});

		res.json(task);
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Id invalido',
		});
	}
};

export const deleteTask = async ({ params }, res) => {
	const { id } = params;

	try {
		await Task.findByIdAndDelete(id);

		res.json({
			message: `tarea eliminada sastisfactoriamente`,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Id invalido',
		});
	}
};

export const findAllDoneTasks = async (req, res) => {
	const tasks = await Task.find({ done: true });

	res.json(tasks);
};

export const updateTasks = async ({ params, body }, res) => {
	try {
		const { id } = params;

		await Task.findByIdAndUpdate(id, body);

		res.json({
			message: 'Tarea actualizada',
		});
	} catch (error) {
		res.status(500).json({
			message: error.message || 'Algo salio mal al actualizar la tarea',
		});
	}
};
