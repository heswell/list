import {
  memo
  // useEffect,
} from "react";
import { useVirtualization } from "./useVirtualization";
import "./List.css";

export const ListItem = memo(({ children, offset }) => {
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

export const List = ({ source }) => {
  const [viewportRef, data, contentHeight, onScroll] = useVirtualization(
    source
  );

  const renderListItems = () => {
    const listItems = [];
    for (let [key, offset, item] of data) {
      listItems.push(
        <ListItem key={key} offset={offset}>
          {item}
        </ListItem>
      );
    }
    return listItems;
  };

  return (
    <div className="List">
      <div className="List-viewport" onScroll={onScroll} ref={viewportRef}>
        <div
          className="List-scrollingContentContainer"
          style={{ height: contentHeight }}
        >
          {renderListItems()}
        </div>
      </div>
    </div>
  );
};
