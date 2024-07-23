import React from "react";

export default function Card({ article, showDescription = false }) {
  return (
    <div
      className="bg-white border-2 rounded-md px-6 py-2 flex flex-col text-white"
      style={{
        backgroundImage: `url(${article?.image || "/default.jpeg"})`,
      }}
    >
      <p className="py-4 flex-grow">
        <p className="title font-bold text-xl">{article?.title}</p>
      </p>
      {showDescription && (
        <p className="py-4 flex-grow">{article?.description}</p>
      )}
      <p className="title text-lg">{article?.author}</p>
      <p className="mt-auto title">
        {article?.date}, <span>{article?.source}</span>
      </p>
    </div>
  );
}
