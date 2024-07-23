import React from "react";
import Card from "../Card";
import { Headlines } from "../headlines/Headlines";

const ArticleList = ({ articles }) => {
  return (
    <div className="my-6">
      <Headlines newest={articles.slice(0, 3)} />

      <div className="grid grid-cols-3 xs:grid-cols-1 custom:grid-cols-2 xl-grid-cols-4 gap-5 my-4">
        {articles?.slice(3)?.map((article) => (
          <Card showDescription={true} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
