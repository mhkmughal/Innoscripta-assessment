import "./headline.css";
import Card from "../Card";

export const Headlines = ({ newest }) => {
  return (
    <div className="headlines">
      {newest?.map((item, index) => (
        <div key={index} className={index === 0 ? "first" : "other" + index}>
          <Card article={item} />
        </div>
      ))}
    </div>
  );
};
