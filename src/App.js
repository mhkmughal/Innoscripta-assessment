import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ArticleList from "./components/ArticleList";
import {
  fetchBbcArticles,
  fetchNewsApiArticles,
  fetchGuardianArticles,
} from "./api/newsApi";
import Loader from "./components/Loader";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    handleSearch({ query: "" });
  }, []);

  const handleSearch = async (filters) => {
    try {
      setLoading(true);
      const bbcArticles = await fetchBbcArticles(filters);
      const newsApiArticles = await fetchNewsApiArticles(filters);
      const guardianArticles = await fetchGuardianArticles(filters);

      setArticles([...newsApiArticles, ...guardianArticles, ...bbcArticles]);
      setLoading(false);
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar articles={articles} handleSearch={handleSearch} />
          {articles?.length > 0 && <ArticleList articles={articles} />}
        </>
      )}
    </>
  );
};

export default App;
