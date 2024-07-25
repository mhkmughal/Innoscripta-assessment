import React from "react";
import Icon from "../Icon";
import moment from "moment";

export default function Card({
  article,
  favorites,
  toggleFavorite,
  showImage = false,
  showDescription = false,
}) {
  const { url, date, title, image, source, author, category, description } =
    article || {};

  return (
    <div
      className="bg-white border-2 rounded-md flex flex-col"
      style={{
        backgroundImage: !showImage ? `url(${image || "/default.jpeg"})` : "",
      }}
    >
      {showImage && (
        <img
          src={image || "/default.jpeg"}
          alt={image}
          className="max-h-60 object-cover"
        />
      )}

      <div className="flex items-center gap-3 px-3 py-2 font-semibold text-activeColor">
        <p className="text-lg uppercase">{category}</p>
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

      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="font-bold text-xl px-3 hover:underline hover:text-activeColor w-fit"
      >
        {title}
      </a>

      <p className="py-4 px-3 flex-grow text-gray1">
        {showDescription && (
          <>
            {moment(date).format("MMMM D, YYYY")}:{" "}
            <span className="text-black">{description}</span>
          </>
        )}
      </p>

      <hr className="mx-4 mb-2 bg-activeColor h-1" />

      <div className="flex justify-between items-center font-serif font-semibold gap-1 px-4 pb-3">
        <div className="flex gap-2 items-center text-lg text-activeColor">
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
          <p>{source}</p>
        </div>

        <div className="flex gap-3 items-center">
          <p className="text-lg text-activeColor break-all">{author || "-"}</p>
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
      </div>
    </div>
  );
}
