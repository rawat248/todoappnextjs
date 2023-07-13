"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from './Modal';
import { FormEventHandler, useState } from "react";
import { addTodo } from "../../../api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [taskValue, setTaskValue] = useState<string>('');
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const [statusValue, setStatusValue] = useState<string>('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: taskValue,
      description: descriptionValue,
      status: statusValue
    });
    setTaskValue("");
    setDescriptionValue("");
    setStatusValue("");
    setModalOpen(false);
    router.refresh();
  }
  return (
    <div>
      <button className="btn btn-primary w-full" onClick={() => setModalOpen(true)}>Add new task
        <AiOutlinePlus className="ml-2" size={18} /></button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input type="text" placeholder="Type here" className="input input-bordered w-full" value={taskValue} onChange={e => setTaskValue(e.target.value)} />
            <textarea placeholder="Description" className="input input-bordered w-full" value={descriptionValue} onChange={(e) => setDescriptionValue(e.target.value)}
            />
            <input type="text" placeholder="Status" className="input input-bordered w-full" value={statusValue} onChange={(e) => setStatusValue(e.target.value)}
            />
            <button type="submit" className="btn">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask;