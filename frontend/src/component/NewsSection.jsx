import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/NewsSection.css';

const NewsSection = () => {
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=23280aeae61845458fdbf2dfaf73f5c7`
        );
        setHeadlines(response.data.articles.slice(0, 5));
      } catch (err) {
        setError('Failed to fetch news headlines');
      }
    };

    fetchHeadlines();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="news-section">
      <h2 className="news-title">Top Headlines</h2>
      <ul className="news-list">
        {headlines.map((article, index) => (
          <li key={index} className="news-item">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
              {article.title}
            </a>
            <p className="news-source">
              {article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsSection;