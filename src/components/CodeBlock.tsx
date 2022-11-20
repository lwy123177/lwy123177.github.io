import classes from "./CodeBlock.module.css";
import { GridContext } from "../store/GridContext";
import { useContext } from "react";
const CodeBlock: React.FC<{ value: string }> = (props) => {
  const gridContext = useContext(GridContext);
  const highlighted = new Set<number>();
  for (let i = 0; i < gridContext.highlightLines.length; i++) {
    highlighted.add(gridContext.highlightLines[i]);
  }
  const lines = props.value.split("\n");
  let result = "";
  for (let i = 0, lineNo = 1; i < lines.length; i++) {
    if (lines[i].trim().length === 0) continue;
    let line = lineNo + lines[i];
    if (highlighted.has(lineNo)) {
      line = `<span class=${classes["high-light"]}>${line}</span>`;
    }
    result += line + "\n";
    lineNo++;
  }
  return (
    <pre
      className={classes["code-block"]}
      dangerouslySetInnerHTML={{ __html: result }}
    />
  );
};
export default CodeBlock;
