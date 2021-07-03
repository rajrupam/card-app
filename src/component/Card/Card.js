import { 
    focusNextElement, 
    focusPreviousElement, 
    limitInputTextLength,
    getEmptyArray,
    splitText,
    disableInput,
    focusElement
} from "../../helpers/helper";
import React, { useEffect, useRef, useState } from "react";
import SmallInput from "../SmallInput/SmallInput";
import Button from "../SubmitButton/SubmitButton";
import { VALUE_LIMIT, INPUTS, REQUIRED_LENGTH} from "../../helpers/constants";
import "./Card.css";

const Card = ({ setList }) => {
    const initialState = getEmptyArray(INPUTS);
    const [cardNum, setCardNum] = useState(initialState);
    const [validValue,  setValidValue] = useState(false); 
    const lastInput = useRef();


    // Submit the value 
    const submitValue = (lastInput) => {
        setList(cardNum.join("-"));
        setCardNum(initialState);   // Reset fields

        let checkPrev = lastInput;
        let flag = INPUTS;

        // Disable fields and set focus on first field and submit
        while (checkPrev) {
            focusElement(checkPrev);
            (flag > 1) && disableInput(checkPrev);
            checkPrev = checkPrev.previousElementSibling
            flag--;
        }
    } 

    const handleChange = (input, index) => {
        const value = input.value;

        /**
         * Return if the value is not a number.
         * (We can also implement the validation for this.)
         *  */ 
        if(isNaN(input.value)) return;

        // Limit value length to VALUE_LIMIT
        limitInputTextLength(input, VALUE_LIMIT);   
        
        // Focus on next element if value is more than and equals VALUE_LIMIT    
        (value.length >= VALUE_LIMIT) && focusNextElement(input);
        
        // Focus on previous element if value is empty    
        (!value.length) && focusPreviousElement(input);
        
        /**
         * Set cardnum only if input has reached to VALUE_LIMIT
         */
        (value.length <= VALUE_LIMIT) &&
            setCardNum([
                ...cardNum.map((num, i) => (i === index) ? input.value : num)
            ]);
        
    }

    const handleKeyDown = (e, index) => {
        let inputElem = e.target;
        /**
         * Detect Backspace button and set focus to previous input if current is empty 
         * (Only usefull if we decide to keep the inputs enabled)
         */
        (!inputElem.value && e.key === "Backspace") && focusPreviousElement(inputElem);

        if(index === INPUTS - 1){
            if(e.key === "Enter" && validValue){
                submitValue(lastInput.current);
            }
        }
    }

    const handleFocus = (e) => {
        const prevElem = e.target.previousElementSibling;

        /**
         * Prevent user from focusing on the next element before filling the current one
         * (Only usefull if we decide to keep the inputs enabled)
         * */
        if(!prevElem?.value) return;
    }

    const handlePaste = (e, index) => {
        e.preventDefault();
        // Allow paste on first field only
        if(index !==0) return;
        
        const input = e.target;
        let currentInput = input;
        
        let i = 0;
        
        /**
         * Get copied text from clipboard. 
         * (Permission is not required, As clipboard is called inside paste event)
         * */ 
        const value = (e.clipboardData || window.clipboardData).getData('Text');

        // Return if the value is not a number. we can also implement the validation for this.
        if(isNaN(value)) return;
        
        const chunkedValues = splitText(value, VALUE_LIMIT);         // Get text splitted in 4 different chunks
        
        /**
         * Using this as loop limit will help us in deciding the input focus
         * For E.g. If paste a value having 8 numbers, The focus will be on 3rd input not
         * on last one 
         *  */  
        const loopLimit = (chunkedValues.filter((value) => value)).length;    
        

        for (; i < loopLimit; i++) {
            
            currentInput.value = chunkedValues[i];   // Set element's value from chunkValues

            (i < INPUTS - 1) && focusNextElement(currentInput);     // Prevent focus overflow
                        
            currentInput = currentInput.nextElementSibling;     // Set next element 
            
        }

        /**
         * Setting values in Cardnum also to keep it in sync with inputs
         */
        setCardNum([...chunkedValues]);
    }

    
    const handleSubmit = () => {
        submitValue(lastInput.current);
    }
    
    
    useEffect(() => {
        setValidValue(
            (cardNum.join("").length === REQUIRED_LENGTH) // True if length is 16 in this case
        );
    }, [cardNum])

    return ( 
     <div className="cardContainer">
        <div className="fieldContainer">
            <div className="fields">
                {
                    cardNum.map((data, index) => (
                        <SmallInput
                            type="text"
                            onChange={(e) => handleChange(e.target, index)}
                            key={index}
                            disabled={(index !== 0) && true}
                            onFocus={handleFocus}
                            value={data}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={(e) => handlePaste(e, index)}
                            inputRef = {(index === INPUTS-1 ? lastInput : null)}
                        />
                        
                    ))
                }
                <p className="note">*Only numbers are allowed</p>
            </div>
            <div className="button">
                    <Button text="Submit" onClick={handleSubmit} disabled={!validValue && true} />
            </div>
        </div>
     </div>
    )
}
 
export default Card;