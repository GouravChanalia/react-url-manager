import { toast } from 'react-toastify';
import { UrlContext } from '../../../Context/url-context';
import { createUrl } from '../../../utils/Helpers';
import useLocalStorage from '../../../utils/Local-Storrage';
import Modal from '../../../utils/Modal.component';
import './index.css';
import React, { useContext, useState } from 'react'

const Urls = () => {
    const [storage, setStorage, getStorage] = useLocalStorage();
    const { currentUrlGroup, setCurrentUrlGroup } = useContext(UrlContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [ACTION, setACTION] = useState("");
    const [idOfEditableRecord, setIdOfEditableRecord] = useState("");

    const setToDefault = () => {
        setIsModalOpen(!isModalOpen);
        setName("");
        setUrl("");
        setACTION("");
        setIdOfEditableRecord("");
    }

    const handleAdd = () => {
        const updatedGroup = { ...currentUrlGroup, urls: [...currentUrlGroup.urls, createUrl(name, url)] };
        setCurrentUrlGroup(updatedGroup);
        const newStorage = getStorage("Url-Groups").map(group => {
            if (group.id === currentUrlGroup.id) return updatedGroup;
            else return group;
        });
        setStorage("Url-Groups", newStorage);
        setToDefault();
    }

    const handleOpenUrls = (...urls) => urls.forEach(({ url }) => window.open(url, "_blank"));

    const handleEdit = () => {
        const updatedGroup = {
            ...currentUrlGroup,
            urls: currentUrlGroup.urls.map((urlDetail) => {
                if (urlDetail.id === idOfEditableRecord) return { ...urlDetail, url: url, name: name };
                else return urlDetail;
            })
        };
        setCurrentUrlGroup(updatedGroup);
        const newStorage = getStorage("Url-Groups").map(group => {
            if (group.id === currentUrlGroup.id) return updatedGroup;
            else return group;
        });
        setStorage("Url-Groups", newStorage);
        setToDefault();
    }

    const handleEditForGroupDetails = () => {
        setCurrentUrlGroup({...currentUrlGroup, name: name, description: url});
        const newStorage = getStorage("Url-Groups").map(group => 
            group.id === currentUrlGroup.id ? { ...group, name: name, description: url } : group
        );
        setStorage("Url-Groups", newStorage);
        setToDefault();
    }

    const handleDelete = () => {
        const remainingUrls = currentUrlGroup?.urls?.filter(({ id }) => id !== idOfEditableRecord);
        setCurrentUrlGroup({ ...currentUrlGroup, urls: remainingUrls });
        const newStorage = getStorage("Url-Groups").map(group => {
            if (group.id === currentUrlGroup.id) {
                return { ...group, urls: remainingUrls };
            } else {
                return group;
            }
        });
        setStorage("Url-Groups", newStorage);
        setToDefault();
    }

    const copyUrl = (url) => {
        window.navigator.clipboard.writeText(url);
        toast("Copied");
    }
    return (
        <>
            {
                currentUrlGroup &&
                <div className='urlsContainer p-2 m-2 bg-slate-600 text-white h-fit'>
                    <div>
                        <div className='flex flex-row justify-between items-center'>
                            <span><b>Group Name: </b> {currentUrlGroup.name}</span>
                            <span className='flex flex-row justify-between'>
                                {
                                    currentUrlGroup.urls.length > 0 &&
                                    <button className='m-1 rounded-2xl bg-green-500 px-3 py-1 hover:bg-green-600' onClick={() => handleOpenUrls(...currentUrlGroup.urls)}>Open All</button>
                                }
                                {
                                    !currentUrlGroup.isDefault &&
                                    <button className='m-1 rounded-2xl bg-slate-500 px-3 py-1 hover:bg-slate-600' onClick={() => {setACTION('EDIT_GROUP_DETAILS'); setName(currentUrlGroup.name); setUrl(currentUrlGroup.description); setIsModalOpen(!isModalOpen)}}>Edit</button>
                                }
                                <button className='m-1 rounded-2xl bg-slate-500 px-3 py-1 hover:bg-slate-600' onClick={() => { setACTION('NEW'); setIsModalOpen(!isModalOpen) }}>Add New Url</button>
                            </span>
                        </div>
                        <div className='text-left'><b>Group Description: </b><p className='px-2'>{currentUrlGroup.description}</p></div>
                        {
                            currentUrlGroup.urls.length > 0 &&
                            <div className='my-2'>
                                <table className="border-collapse border border-slate-800 bg-white text-slate-600">
                                    <thead>
                                        <tr>
                                            <th className="border border-slate-800 p-1">Name</th>
                                            <th className="border border-slate-800 p-1">Url</th>
                                            <th className="border border-slate-800 p-1">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            currentUrlGroup.urls.map(({ id, name, url, isDefault }, index) => {
                                                return (
                                                    <tr key={id} className='px-3 py-1'>
                                                        <td className="border border-slate-800 p-1">{name}</td>
                                                        <td className="flex flex-row justify-between items-center p-1 text-ellipsis">
                                                            <span className='p-1 truncate' style={{width: '560px'}} title={url}>{url}</span>
                                                            <svg onClick={() => copyUrl(url)} className='p-1 hover:fill-green-500 hover:cursor-pointer' width={25} height={25} xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" 
                                                                text-rendering="geometricPrecision" image-rendering="optimizeQuality" 
                                                                fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 438 511.52">
                                                                <path fill-rule="nonzero" d="M141.44 0h172.68c4.71 0 8.91 2.27 11.54 5.77L434.11 123.1a14.37 14.37 0 0 1 3.81 9.75l.08 251.18c0 17.62-7.25 33.69-18.9 45.36l-.07.07c-11.67 11.64-27.73 18.87-45.33 18.87h-20.06c-.3 17.24-7.48 32.9-18.88 44.29-11.66 11.66-27.75 18.9-45.42 18.9H64.3c-17.67 0-33.76-7.24-45.41-18.9C7.24 480.98 0 464.9 0 447.22V135.87c0-17.68 7.23-33.78 18.88-45.42C30.52 78.8 46.62 71.57 64.3 71.57h12.84V64.3c0-17.68 7.23-33.78 18.88-45.42C107.66 7.23 123.76 0 141.44 0zm30.53 250.96c-7.97 0-14.43-6.47-14.43-14.44 0-7.96 6.46-14.43 14.43-14.43h171.2c7.97 0 14.44 6.47 14.44 14.43 0 7.97-6.47 14.44-14.44 14.44h-171.2zm0 76.86c-7.97 0-14.43-6.46-14.43-14.43 0-7.96 6.46-14.43 14.43-14.43h136.42c7.97 0 14.43 6.47 14.43 14.43 0 7.97-6.46 14.43-14.43 14.43H171.97zM322.31 44.44v49.03c.96 12.3 5.21 21.9 12.65 28.26 7.8 6.66 19.58 10.41 35.23 10.69l33.39-.04-81.27-87.94zm86.83 116.78-39.17-.06c-22.79-.35-40.77-6.5-53.72-17.57-13.48-11.54-21.1-27.86-22.66-48.03l-.14-2v-64.7H141.44c-9.73 0-18.61 4-25.03 10.41C110 45.69 106 54.57 106 64.3v319.73c0 9.74 4.01 18.61 10.42 25.02 6.42 6.42 15.29 10.42 25.02 10.42H373.7c9.75 0 18.62-3.98 25.01-10.38 6.45-6.44 10.43-15.3 10.43-25.06V161.22zm-84.38 287.11H141.44c-17.68 0-33.77-7.24-45.41-18.88-11.65-11.65-18.89-27.73-18.89-45.42v-283.6H64.3c-9.74 0-18.61 4-25.03 10.41-6.41 6.42-10.41 15.29-10.41 25.03v311.35c0 9.73 4.01 18.59 10.42 25.01 6.43 6.43 15.3 10.43 25.02 10.43h225.04c9.72 0 18.59-4 25.02-10.43 6.17-6.17 10.12-14.61 10.4-23.9z"/>
                                                            </svg>
                                                        </td>
                                                        <td className="border border-slate-800 p-1">
                                                            <button className='px-3 py-0.5 m-1 rounded-sm text-white bg-green-600 hover:bg-green-700' onClick={() => handleOpenUrls({ url })}>Open</button>
                                                            {
                                                                !isDefault &&
                                                                <span>
                                                                    <button className='px-3 py-0.5 m-1 rounded-sm text-white bg-slate-600 hover:bg-slate-700' onClick={() => { setIdOfEditableRecord(id); setACTION('EDIT'); setIsModalOpen(!isModalOpen); setName(name); setUrl(url); }}>Edit</button>
                                                                    <button className='px-3 py-0.5 m-1 rounded-sm text-white bg-red-600 hover:bg-red-700' onClick={() => { setIdOfEditableRecord(id); setACTION('DELETE'); setIsModalOpen(!isModalOpen); }}>Delete</button>
                                                                </span>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            }
            <Modal isOpen={isModalOpen}>
                {
                    ACTION === 'NEW' &&
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: "5px" }}>
                        <div>
                            <label htmlFor="name">Name: </label>
                            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="name">Url: </label>
                            <br />
                            <textarea cols={75} rows={5} type="text" name="url" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                        </div>
                        <button className='bg-green-500 text-white px-3 py-1 m-2 hover:bg-green-600' onClick={handleAdd}>Add</button>
                        <button className='bg-slate-500 text-white px-3 py-1 m-2 hover:bg-slate-600' onClick={() => {
                            setToDefault();
                        }}>Cancel</button>
                    </div>
                }
                {
                    ACTION === 'EDIT' && idOfEditableRecord &&
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: "5px" }}>
                        <div className='m-2'>
                            <label htmlFor="name">Name: </label>
                            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='m-2'>
                            <label htmlFor="name">Url: </label>
                            <br />
                            <textarea cols={75} rows={5} type="text" name="url" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                        </div>
                        <button className='bg-green-500 text-white px-3 py-1 m-2 hover:bg-green-600' onClick={handleEdit}>Save</button>
                        <button className='bg-slate-500 text-white px-3 py-1 m-2 hover:bg-slate-600' onClick={() => {
                            setToDefault();
                        }}>Cancel</button>
                    </div>
                }
                {
                    ACTION === 'EDIT_GROUP_DETAILS' &&
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: "5px" }}>
                        <div className='m-2'>
                            <label htmlFor="name">Name: </label>
                            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='m-2'>
                            <label htmlFor="name">Description: </label>
                            <br />
                            <textarea cols={75} rows={5} type="text" name="url" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                        </div>
                        <button className='bg-green-500 text-white px-3 py-1 m-2 hover:bg-green-600' onClick={handleEditForGroupDetails}>Save</button>
                        <button className='bg-slate-500 text-white px-3 py-1 m-2 hover:bg-slate-600' onClick={() => {
                            setToDefault();
                        }}>Cancel</button>
                    </div>
                }
                {
                    ACTION === 'DELETE' && idOfEditableRecord &&
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: "5px" }}>
                        <div>
                            Do you want to delete <b>{currentUrlGroup.urls.find(({ id, name }) => id === idOfEditableRecord).name}?</b>
                        </div>
                        <button className='bg-slate-500 text-white px-3 py-1 m-2 hover:bg-slate-600' onClick={() => {
                            setToDefault();
                        }}>Cancel</button>
                        <button className='bg-red-500 text-white px-3 py-1 m-2 hover:bg-red-600' onClick={handleDelete}>Delete</button>
                    </div>
                }
            </Modal>
        </>
    )
}

export default Urls