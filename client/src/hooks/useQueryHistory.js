import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sql_agent_query_history';
const MAX_HISTORY = 20;

export const useQueryHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse history:', e);
      }
    }
  }, []);

  const addQuery = (query, sql, timestamp = new Date().toISOString()) => {
    const newEntry = { query, sql, timestamp, id: Date.now() };
    const updated = [newEntry, ...history].slice(0, MAX_HISTORY);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const removeQuery = (id) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { history, addQuery, removeQuery, clearHistory };
};
