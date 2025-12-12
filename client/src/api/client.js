import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Initialize SQL AI Agent
  initiateSQLAgent: async () => {
    const response = await apiClient.get('/initiate-sql-ai-agent');
    return response.data;
  },

  // Load database tables schema
  loadDBTablesSchema: async () => {
    const response = await apiClient.get('/load-db-tables-schema');
    return response.data;
  },

  // Generate SQL query from natural language
  getSQLQuery: async (prompt) => {
    const response = await apiClient.post('/get-sql-query', { prompt });
    return response.data;
  },

  // Get dataframe (execute query and return results)
  getDataFrame: async (prompt) => {
    const response = await apiClient.post('/get-dataframe', { prompt });
    return response.data;
  },
};

export default apiClient;
