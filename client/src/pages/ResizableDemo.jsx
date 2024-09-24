import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
const ResizableDemo=()=>{
    return (
      <PanelGroup autoSaveId="example" direction="horizontal">
        <Panel defaultSize={25}>
          {/* <SourcesExplorer /> */}
          <div className="c">
            <p>hi</p>
          </div>
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={25}>
        <div className="b">
            <p>hi</p>
          </div>
        </Panel>
        {/* <PanelResizeHandle /> */}
        {/* <Panel defaultSize={25}>
        <div className="a">
            <p>hi</p>
          </div>
        </Panel> */}
      </PanelGroup>
    )
  }

  export default ResizableDemo;