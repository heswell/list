import { Profiler } from "react";
// import { List } from "./List";
import { List } from "./VirtualizedList";
import "./styles.css";

const data = [];
for (let i = 0; i < 1000; i++) {
  data.push(`Item ${i + 1}`);
}

// function onRenderCallback(
//   id, // the "id" prop of the Profiler tree that has just committed
//   phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
//   actualDuration, // time spent rendering the committed update
//   baseDuration, // estimated time to render the entire subtree without memoization
//   startTime, // when React began rendering this update
//   commitTime, // when React committed this update
//   interactions // the Set of interactions belonging to this update
// ) {
//   console.log(
//     `[${id}] ${phase} actual ${Math.round(actualDuration)} ms base ${Math.round(
//       baseDuration
//     )}`
//   );
// }

export default function App() {
  return (
    <div className="Dropdown">
      {/* <Profiler id="List" onRender={onRenderCallback}> */}
      <List data={data} />
      {/* </Profiler> */}
    </div>
  );
}
