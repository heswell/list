import {
  memo,
  // useEffect,
  useRef
} from "react";
import { useVirtualization } from "./useVirtualization";
import "./List.css";

const ListItem = memo(({ children, offset }) => {
  // useEffect(() => {
  //   console.log("ListItem mounted");
  //   return () => console.log("ListItem unmounted");
  // }, []);
  // useEffect(() => {
  //   console.log(`Listitem child changed => ${children}`);
  // }, [children]);
  // useEffect(() => {
  //   console.log(`Listitem offset changed => ${offset}`);
  // }, [offset]);
  // console.log(`%cListItem.render ${children}`, "color: blue");

  return (
    <div
      className="ListItem"
      style={{
        transform: `translate3d(0px, ${offset}px, 0px)`
      }}
    >
      {children}
    </div>
  );
});

export const List = ({ data }) => {
  const [viewportRef, rows, contentHeight, onScroll] = useVirtualization(data);
  return (
    <div className="List">
      <div className="List-viewport" onScroll={onScroll} ref={viewportRef}>
        <div
          className="List-scrollingContentContainer"
          style={{ height: contentHeight }}
        >
          {rows.map(([key, offset, item]) => (
            <ListItem key={key} offset={offset}>
              {item}
            </ListItem>
          ))}
        </div>
      </div>
    </div>
  );
};
