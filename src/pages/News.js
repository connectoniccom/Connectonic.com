import React, { useState, useEffect } from 'react';
import './News.css';

const API_BASE_URL = 'https://3001-firebase-studio-1750940658370.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev';

function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/news`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setNewsData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="news" className="content-section">
        <h2>News & Updates</h2>
        <p>Loading news...</p>
      </section>
    );
  }

  if (!newsData.length) {
    return (
      <section id="news" className="content-section">
        <h2>News & Updates</h2>
        <p>No news found. Make sure the backend server is running.</p>
      </section>
    );
  }

  return (
    <section id="news" className="content-section">
      <h2>News & Updates</h2>
      <p>The latest happenings from our artists and community.</p>
      <div className="news-container">
        {newsData.map((article) => (
          <div key={article.id} className="news-card">
            <h3>{article.title}</h3>
            <p className="news-date">{new Date(article.date).toLocaleDateString()}</p>
            <p className="news-summary">{article.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default News;
