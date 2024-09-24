import Codemirror from "codemirror"
import React, { useState } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import ACTIONS from "./Actions";
import { useEffect,useRef} from "react";
const Editor=({roomid,socketref,onCodeChange})=>{
  const editorRef = useRef(null);
  const [savecode,setcode]=useState('');
  const a=()=>{
    console.log(savecode)
  }
  useEffect(() => {
    const init = async () => {
      const editor =Codemirror.fromTextArea(
        document.getElementById("liveeditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      editorRef.current = editor;
      editor.setSize(null, "90%");
      editorRef.current.on("change", (instance, changes) => {
        // console.log("changes", instance ,  changes );
        const { origin } = changes;
        // console.log(changes);
        const code = instance.getValue(); // code has value which we write
        onCodeChange(code);
        console.log(code);
        if (origin !=="setValue") {
            socketref.current.emit(ACTIONS.CODE_CHANGE, {
            roomid,
            code,
          });
        }
      });
    };
    init();
  }, []);
  
  useEffect(() => {
    if (socketref.current) {
        socketref.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }
    return () => {
        socketref.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketref.current]);
    return(<>
    <textarea className="Editor_textarea" id="liveeditor" value={savecode} onChange={(e)=>{
        setcode(e.target.value)
    }}></textarea>
    </>)
}
export default Editor;