import React, { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

const CodeSnippetEditor = ({ codeData, setShowCode, updateCode, index }) => {
  const [code, setCode] = useState(codeData);

  return (
    <>
      <div className='code-editor-container'>
        <div className="code-editor-header">
          <span className="code-editor-title">Code Snippet</span>
          <svg onClick={() => setShowCode(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="code-editor-close-icon"><path strokeLinecap="round" strokeWidth="2" stroke="#4C4F5A" d="M6 6L18 18"></path> <path strokeLinecap="round" strokeWidth="2" stroke="#4C4F5A" d="M18 6L6 18"></path></svg>
        </div>
        <div className="code-editor" data-color-mode="dark">
          <CodeEditor
            value={code}
            language="js"
            placeholder="Please enter JS code."
            onChange={(e) => setCode(e.target.value)}
            padding={15}
            style={{
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              fontSize: 13
            }}
          />
        </div>
        <button className="shared-btn" id="save-btn" onClick={() => updateCode({ index: index, code: code })}>
          <p className="shared-text"> Save </p>
          <span className="shared-icon-box">
            <svg className="shared-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          </span>
        </button>
      </div>
    </>
  )
}

export default CodeSnippetEditor;
