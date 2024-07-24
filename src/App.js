import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import SearchBar from "./components/SearchBar";
import ArticleList from "./components/ArticleList";
import {
  fetchBbcArticles,
  fetchNewsApiArticles,
  fetchGuardianArticles,
} from "./api/newsApi";

const App = () => {
  const [loading, setLoading] = useState([]);
  const [articles, setArticles] = useState([]);
  const [favorites, setFavorites] = useState({
    author: [],
    source: [],
    category: [],
  });

  useEffect(() => {
    handleSearch({ query: "test" });
  }, []);

  const handleSearch = async (filters) => {
    try {
      console.log("Filters", filters);


      setLoading(true);
      const bbcArticles = await fetchBbcArticles(filters);
      const newsApiArticles = await fetchNewsApiArticles(filters);
      const guardianArticles = await fetchGuardianArticles(filters);

      setArticles(
        [...newsApiArticles, ...guardianArticles, ...bbcArticles]?.filter(
          (article) => article?.title !== "[Removed]"
        )
      );
      setLoading(false);
    } catch (e) {
      console.log("Error", e);
    }
  };

  const toggleFavorite = (type, value) => {
    setFavorites((prevFavorites) => {
      const currentFavorites = prevFavorites[type];
      const isAlreadyFavorite = currentFavorites.includes(value);

      return {
        ...prevFavorites,
        [type]: isAlreadyFavorite
          ? currentFavorites.filter((item) => item !== value)
          : [...currentFavorites, value],
      };
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <SearchBar
            articles={articles}
            favorites={favorites}
            onSearch={handleSearch}
            setArticles={setArticles}
          />
          {articles?.length > 0 ? (
            <ArticleList
              articles={articles}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ) : (
            "No favorite"
          )}
        </>
      )}
    </>
  );
};

export default App;
