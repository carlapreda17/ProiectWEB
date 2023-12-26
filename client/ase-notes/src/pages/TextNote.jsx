import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function TextNote() {
    const [noteText, setNoteText] = useState('');

    const handleInputChange = (event) => {
        setNoteText(event.target.value);
    };

    const stergeText = () =>{
        setNoteText('');
    }

    return (
        <div className={"text-container"}>
            <textarea className={"px-2 py-2"}
                value={noteText}
                onChange={handleInputChange}
                placeholder="Type your notes using Markdown..."
                rows={10}
                cols={50}
            ></textarea>
            <div className={"flex gap-[1.25rem] mt-3"}>
                <button className={"button-text button px-[1.25rem] py-[0.625rem]"}>Salveaza</button>
                <button onClick={stergeText} className={"button-text button px-[1.25rem] py-[0.625rem]"}>Sterge</button>
            </div>
            <div>
                <ReactMarkdown>{noteText}</ReactMarkdown>
            </div>
        </div>
    );
}

export default TextNote;
