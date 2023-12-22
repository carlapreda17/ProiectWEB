import Markdown from "marked-react";
import {marked} from "marked";

function MarkdownComponent(){
   const getMarkdownText = () =>{
        var rawMarkup = marked.parse("This is _Markdown_.");
        return { __html: rawMarkup };
    }
    return(
        <div dangerouslySetInnerHTML={getMarkdownText()} />
    )
};

export default MarkdownComponent