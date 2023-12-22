import React, { useState, useEffect } from "react";
import { marked } from 'marked';
import MarkdownComponent from "../components/Markdown";
function TextNote() {

      return (
        <div className={"content-container"}>
            <MarkdownComponent></MarkdownComponent>
        </div>
    );
}

export default TextNote;
