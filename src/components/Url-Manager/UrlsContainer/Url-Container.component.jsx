import { UrlContext } from '../../../Context/url-context';
import Modal from '../../../utils/Modal.component'
import './Url-Container.css'
import React, { useContext, useState } from 'react'

const UrlContainer = ({ group, handleGroupDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setCurrentUrlGroup } = useContext(UrlContext);
    return (
        <>
            <div className='transition ease-in-out delay-75 m-1 bg-slate-50 text-slate-600 hover:cursor-pointer hover:bg-slate-600 hover:text-slate-50' onClick={() => setCurrentUrlGroup(group)}>
                <div className='flex flex-row justify-between items-center m-3'>
                    <span>{group?.name}</span>
                    {
                        !group.isDefault &&
                        <svg className='fill-white stroke-red-800 hover:fill-red-800' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30" onClick={() => setIsModalOpen(!isModalOpen)}>
                            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                        </svg>
                    }
                </div>
                <div className='text-left m-3 max-w-fit break-words'>
                    <p>{group?.description}</p>
                </div>
                <div className='text-left m-3'>
                    Links available: {group?.urls?.length}
                </div>
            </div>
            <Modal isOpen={isModalOpen}>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: "5px" }}>
                    <div>
                        <p>Do you want to delete group <b>{group.name}</b>?</p>
                        <button className='bg-slate-500 text-white px-3 py-1 m-2 hover:bg-slate-600' onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</button>
                        <button className='bg-red-500 text-white px-3 py-1 m-2 hover:bg-red-600' onClick={() => {
                            handleGroupDelete();
                            setIsModalOpen(!isModalOpen);
                        }}>Delete</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default UrlContainer