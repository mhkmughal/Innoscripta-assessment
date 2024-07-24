import React from "react";
import moment from "moment";

const Icon = ({
  src,
  alt = "",
  onClick,
  className = "w-6 h-6 cursor-pointer",
}) => <img src={src} alt={alt} className={className} onClick={onClick} />;

export default function Card({
  article,
  favorites,
  toggleFavorite,
  showDescription = false,
}) {
  const {
    date,
    title,
    source,
    author,
    category,
    description,
    image = "/default.jpeg",
  } = article || {};

  return (
    <div
      className="bg-white border-2 rounded-md px-6 py-2 flex flex-col text-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex gap-3 title">
        <p className="text-lg uppercase px-2">{category}</p>
        <Icon
          src={
            favorites?.category.includes(category)
              ? "/unfavorite.png"
              : "/Favorite.png"
          }
          alt={
            favorites?.category.includes(category)
              ? "Unfavorite category"
              : "Favorite category"
          }
          onClick={() => toggleFavorite("category", category)}
        />
      </div>

      <div className="py-4 flex-grow">
        <p className="title font-bold text-xl px-2">{title}</p>
      </div>

      {showDescription && (
        <div className="py-4 flex-grow title">
          <p>{description}</p>
        </div>
      )}

      <div className="flex gap-1 title">
        <p className="text-lg px-2">{author}</p>
        <Icon
          src={
            favorites?.author.includes(author)
              ? "/unfavorite.png"
              : "/Favorite.png"
          }
          alt={
            favorites?.author.includes(author)
              ? "Unfavorite Author"
              : "Favorite Author"
          }
          onClick={() => toggleFavorite("author", author)}
        />
      </div>

      <div className="flex gap-2 title px-2">
        <p>{moment(date).format("YYYY-DD-MM")}</p>
        <p>{source}</p>
        <Icon
          src={
            favorites?.source.includes(source)
              ? "/unfavorite.png"
              : "/Favorite.png"
          }
          alt={
            favorites?.source.includes(source)
              ? "Unfavorite source"
              : "Favorite source"
          }
          onClick={() => toggleFavorite("source", source)}
        />
      </div>
    </div>
  );
}
