import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Output from "../components/Output";
import Editor from "../components/Editor";
const ResizableDemo=()=>{
    return (
      <PanelGroup autoSaveId="example" direction="horizontal">
        <Panel defaultSize={25}>
          {/* <SourcesExplorer /> */}
          <Editor socketref={socketRef} roomid={roomid} onCodeChange={(code) => {
                    codeRef.current = code;
                }}/>
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={25}>
        <Output codeRef={codeRef}></Output>
        </Panel>
      </PanelGroup>
    )
  }

  export default ResizableDemo;