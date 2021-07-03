
export const disableInput = (elem) => {
    elem.disabled = true
}


export const enableInput = (elem) => {
    elem.disabled = false
}

export const focusElement = (elem) => {
    elem.focus();
}

export const focusNextElement = (elem) => {
    const nextElem = elem.nextElementSibling;
    
    
    if (nextElem) {
        enableInput(nextElem);
        focusElement(nextElem) 
    }   
}



export const focusPreviousElement = (elem) => {
    const prevElem = elem.previousElementSibling;

     
    if (prevElem) {
        disableInput(elem);
        focusElement(prevElem) 
    }
}



export const limitInputTextLength = (elem, limit) => {
    elem.value = elem.value.substr(0, limit);
}



export const getEmptyArray = (limit) => {
    return Array(limit).fill("");
}


export const splitText = (text, byValue) => {
    const trimmedtext = trimAllWhiteSpaces(text);   

    let chunk = [];

    for (let i = 0, j = 0; i < byValue; i++, j += byValue) {
        chunk[i] = trimmedtext.substr(j, byValue);
    }
    
    return chunk;
} 

//Remove white spaces from text
export const trimAllWhiteSpaces = (text) => {
    return text.replace(/\s+/g, '');
}