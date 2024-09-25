import { useState } from "react";
import { executeCode } from "../Api";
import toast from "react-hot-toast";

const Output = ({codeRef, javascript}) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    
    const sourceCode = codeRef.current;
    console.log(codeRef.current);
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode("javascript", sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
      toast.success("code is runned");
    } catch (error) {
      console.log(error);
      toast.error("some error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div  className="output_main">
      <button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      className="btn_run">
        Run Code
      </button>
      <div
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
    </>
  );
};
export default Output;
