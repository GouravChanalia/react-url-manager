import { v4 as uuidV4 } from "uuid";
export function createUrlGroup(name, description, isDefault=false) {
    const group = {
        id: uuidV4(),
        name: name,
        description: description,
        isDefault: isDefault,
        urls:[]
    }
    if(isDefault){
        group.urls.push(
            createUrl("Url Manager 3.0", "https://github.com/GouravChanalia/react-url-manager", true)
        )
    }
    return group;
}

export const createUrl = (name, url, isDefault=false) => {
    return {
        id: uuidV4(),
        name: name,
        url: url,
        isDefault: isDefault
    }
}