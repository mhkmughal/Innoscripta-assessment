import axios from "axios";

const NEWS_API_KEY = "355b5f5a84994b2ebff25d0f7622a0c8"; // Replace with your NewsAPI key
const GUARDIAN_API_KEY = "8e289141-51f6-4342-a5d0-4a9b1246bc71"; // Replace with your Guardian API key

const buildQueryString = (params) => {
  return Object.keys(params)
    .filter(
      (key) =>
        params[key] !== null && params[key] !== undefined && params[key] !== ""
    )
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");
};

export const fetchNewsApiArticles = async ({
  query,
  source,
  toDate,
  fromDate,
  category,
}) => {
  const params = {
    q: query || "news",
    from: fromDate,
    to: toDate,
    source,
    apiKey: NEWS_API_KEY,
  };
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?${buildQueryString(params)}`
    );

    return response?.data?.articles.map((item) => ({
      title: item.title,
      date: item.publishedAt,
      author: item.author
        ? String(item.author).split(",").slice(0, 2).join(",")
        : "Kate",
      source: item.source.name,
      category: "entertainment",
      url: item.url,
      image: item.urlToImage,
      description: item?.description,
    }));
  } catch (error) {
    console.error("Error fetching NewsAPI articles:", error);
    throw error;
  }
};

export const fetchGuardianArticles = async ({
  query,
  source,
  toDate,
  fromDate,
  category,
}) => {
  const params = {
    q: query,
    "from-date": fromDate,
    "to-date": toDate,
    section: category,
    "api-key": GUARDIAN_API_KEY,
  };
  try {
    const response = await axios.get(
      `https://content.guardianapis.com/search?show-elements=image&${buildQueryString(
        params
      )}`
    );

    return response?.data?.response?.results?.map((item) => ({
      title: item?.webTitle,
      date: item?.webPublicationDate,
      author: item?.tags
        ?.map((author) => String(author?.webTitle).trim())
        .slice(0, 2)
        .join(","),
      source: "Guardian",
      category: String(item?.pillarName).toLowerCase(),
      url: item?.webUrl,
      image: item?.elements && item?.elements[0]?.assets[0]?.file,
    }));
  } catch (error) {
    console.error("Error fetching Guardian articles:", error);
    throw error;
  }
};

export const fetchBbcArticles = async ({
  query,
  source,
  toDate,
  fromDate,
  category,
}) => {
  const params = {
    q: query,
    from: fromDate,
    to: toDate,
    category: category || "entertainment",
    source,
    apiKey: NEWS_API_KEY,
  };
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?source=bbc-news&${buildQueryString(
        params
      )}`
    );

    return response?.data?.articles.map((item) => ({
      title: item.title,
      description: item?.description,
      date: item.publishedAt,
      author: item.author
        ? String(item.author).split(",").slice(0, 2).join(",")
        : "Kate",
      source: item.source.name,
      category: "entertainment",
      url: item.url,
      image: item.urlToImage,
    }));
  } catch (error) {
    console.error("Error fetching NewsAPI articles:", error);
    throw error;
  }
};
