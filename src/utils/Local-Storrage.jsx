
function useLocalStorage() {
    const storage = window.localStorage;
    const setStorage = (K, V) => {
        console.log(K, V);
        storage.setItem(K, JSON.stringify(V));
    }
    const getStorage = K => {
        const value = storage.getItem(K);
        return value? JSON.parse(value): [];
    }
    return [storage, setStorage, getStorage];
}

export default useLocalStorage;