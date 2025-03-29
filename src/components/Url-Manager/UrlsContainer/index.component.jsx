import './index.css';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import UrlContainer from './Url-Container.component'
import useLocalStorage from '../../../utils/Local-Storrage';
import { createUrlGroup } from '../../../utils/Helpers';
import Modal from '../../../utils/Modal.component';
import { UrlContext } from '../../../Context/url-context';

const UrlsContainer = () => {

    const [storage, setStorage, getStorage] = useLocalStorage();
    const [urlGroups, setUrlGroups] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");
    const [newGroupDescription, setNewGroupDescription] = useState("");
    const { currentUrlGroup, setCurrentUrlGroup } = useContext(UrlContext);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
        filterGroups(e.target.value);
    };

    const filterGroups = (val) => {
        setFilteredGroups(urlGroups?.filter(group => group.name.toLowerCase().includes(val.toLowerCase()) || group.description.toLowerCase().includes(val.toLowerCase())));
    }

    const handleCreateNewGroup = (e) => {
        if (newGroupName) {
            const group = createUrlGroup(newGroupName, newGroupDescription);
            setUrlGroups([...urlGroups, group]);
            setStorage('Url-Groups', [...urlGroups, group]);
            setModalOpen(!isModalOpen);
            setNewGroupName("");
            setNewGroupDescription("");
        }
    }

    const handleGroupDelete = (i) => {
        const filteredGroups = urlGroups?.filter((group, index) => index !== i);
        setUrlGroups(filteredGroups);
        setCurrentUrlGroup();
        setStorage('Url-Groups', filteredGroups);
    }

    useEffect(() => {
        const storageGroup = getStorage('Url-Groups');
        if (storageGroup?.length) {
            setUrlGroups(storageGroup);
        } else {
            const group = createUrlGroup("default", "This is default group.", true);
            setUrlGroups([...urlGroups, group]);
            setStorage('Url-Groups', [...urlGroups, group]);
        }
    }, [currentUrlGroup])

    useEffect(() => {
        filterGroups(searchValue);
    }, [urlGroups])

    return (
        <>
            <div className='urlsContainer bg-slate-600 text-white p-2 m-2 w-1/3 min-h-fit'>
                <div>
                    <div className='flex justify-between'>
                        <span>Groups</span>
                        <button className='rounded-2xl bg-slate-500 px-3 py-1 hover:bg-slate-600' onClick={() => setModalOpen(!isModalOpen)}>New Group</button>
                    </div>
                    <div className='text-right mt-2'>
                        <span>
                            <input className='text-slate-600 rounded-md bg-slate-200 focus:bg-white' type="text" name="search" id="search" placeholder='Search' value={searchValue} onChange={handleSearch} />
                        </span>
                    </div>
                </div>
                {
                    filteredGroups?.map((urlGroup, index) => <UrlContainer key={index} group={urlGroup} handleGroupDelete={(e) => handleGroupDelete(index)} />)
                }
            </div>
            <Modal isOpen={isModalOpen}>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: "5px" }}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" id="name" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="description">Description: </label>
                        <br />
                        <textarea cols={50} rows={10} name="description" id="description" value={newGroupDescription} onChange={(e) => setNewGroupDescription(e.target.value)}></textarea>
                    </div>
                    <button className='bg-green-500 text-white px-3 py-1 m-2 hover:bg-green-600' onClick={handleCreateNewGroup}>Add</button>
                    <button className='bg-slate-500 text-white px-3 py-1 m-2 hover:bg-slate-600' onClick={() => setModalOpen(!isModalOpen)}>Cancel</button>
                </div>
            </Modal>
        </>
    )
}

export default UrlsContainer