import React from "react";
import Card from "../Card";
import { Headlines } from "../headlines/Headlines";

const ArticleList = ({ articles, favorites, toggleFavorite }) => {
  return (
    <div className="w-11/12 px-5 mx-auto">
      <Headlines
        favorites={favorites}
        newest={articles.slice(0, 3)}
        toggleFavorite={toggleFavorite}
      />

      <div className="grid grid-cols-3 xs:grid-cols-1 custom:grid-cols-2 2xl:grid-cols-4 gap-5 my-4">
        {articles?.slice(3)?.map((article) => (
          <Card
            showImage={true}
            article={article}
            favorites={favorites}
            showDescription={true}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
