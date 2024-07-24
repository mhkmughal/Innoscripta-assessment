import "./headline.css";
import Card from "../Card";

export const Headlines = ({ newest, favorites, toggleFavorite }) => {
  return (
    <div className="headlines">
      {newest?.map((item, index) => (
        <div key={index} className={index === 0 ? "first" : "other" + index}>
          <Card
            article={item}
            favorites={favorites}
            showDescription={index == 0}
            toggleFavorite={toggleFavorite}
          />
        </div>
      ))}
    </div>
  );
};
