import "./List.css";

export const List = ({ source }) => {
  const renderListItems = (data, listItems = []) => {
    let headerIdx = 0;
    for (let item of data) {
      if (item.listItems) {
        listItems.push(
          <div className="ListItem ListHeader" key={`header-${headerIdx++}`}>
            {item.label}
          </div>
        );
        listItems.push(...renderListItems(item.listItems));
      } else {
        listItems.push(
          <div className="ListItem" key={item}>
            {item}
          </div>
        );
      }
    }
    return listItems;
  };

  return <div className="List">{renderListItems(source)}</div>;
};
