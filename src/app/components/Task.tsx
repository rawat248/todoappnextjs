"use client"

import { ITask } from "../../../types/task";
import { BiEdit, BiTrash } from "react-icons/bi";
import { FormEventHandler, useState } from 'react';
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "../../../api";


interface TodoListProps {
    tasks: ITask
}

const Task: React.FC<TodoListProps> = ({ tasks }) => {
    const router = useRouter();
    const [modalEdit, setModalEdit] = useState<boolean>(false);
    const [modalDelete, setModalDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(tasks.text);

    const handleEditSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: tasks.id,
            text: taskToEdit,
        });
        setModalEdit(false);
        router.refresh();
    };
    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id);
        setModalDelete(false);
        router.refresh();
    };
    return (
        <tr key={tasks.id} className="bg-base-200">

            <td className="w-full">{tasks.text}</td>
            <td className="flex gap-10">
                <BiEdit cursor="pointer" className="text-blue-500" size={25} onClick={() => setModalEdit(true)} />
                <Modal modalOpen={modalEdit} setModalOpen={setModalEdit}>
                    <form onSubmit={handleEditSubmit}>
                        <h3 className="font-bold text-lg">Edit task</h3>
                        <div className="modal-action">
                            <input type="text" placeholder="Type here" className="input input-bordered w-full" value={taskToEdit} onChange={e => setTaskToEdit(e.target.value)} />
                            <button type="submit" className="btn">Submit</button>

                        </div>
                    </form>
                </Modal>
                <BiTrash cursor="pointer" className="text-red-500" size={25} onClick={() => setModalDelete(true)} />
                <Modal modalOpen={modalDelete} setModalOpen={setModalDelete}>
                    <h3 className="text-lg">Are you sure you want to delete this task?</h3>
                    <div className='modal-action'>
                        <button onClick={() => handleDeleteTask(tasks.id)} className='btn'>
                            Yes
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}

export default Task
