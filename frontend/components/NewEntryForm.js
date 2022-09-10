import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoremIpsum } from "lorem-ipsum";
import { getRandomInt } from "../utils/Random.js";


const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

const AddEntry = ({setRowData, rowData}) => {
    
    const {
        register, 
        handleSubmit, 
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        setRowData(rowData => [...rowData, data])
    }

    return ( 
        <form onSubmit={() => handleSubmit(onSubmit)}>
                <label>title:</label>
                <input type="text" name="title" placeholder={lorem.generateWords(5)} ref={register}/>
                <label>description:</label>
                <textarea type="text" name="description" placeholder={lorem.generateSentences(2)} ref={register}/>
                <label>expiry:</label>
                <input type="text" name="expiry" placeholder={getRandomInt(1000000000)} ref={register}/>
                <label>created:</label>
                <input type="text" name="created" placeholder={getRandomInt(1000000000)} ref={register}/>
                <label>status:</label>
                <input type="text" name="status" placeholder={lorem.generateWords(1)} ref={register}/>
                <label>tags:</label>
                <input type="text" name="tags" placeholder={lorem.generateWords(3)} ref={register}/>
                <label>outcome:</label>
                <textarea type="text" name="outcome" placeholder={lorem.generateSentences(1)} ref={register}/>
                <input type="submit"/>
        </form>
     );
}
 
export default AddEntry;