import "./List.css";

export const List = ({ data }) => {
  return (
    <div className="List">
      {data.map((item) => (
        <div className="ListItem" key={item}>
          {item}
        </div>
      ))}
    </div>
  );
};
