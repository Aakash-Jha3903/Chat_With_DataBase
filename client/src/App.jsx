import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { InitializationPanel } from './components/features/InitializationPanel';
import { QueryInput } from './components/features/QueryInput';
import { SQLDisplay } from './components/features/SQLDisplay';
import { ResultsTable } from './components/features/ResultsTable';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { api } from './api/client';
import { AlertCircle } from 'lucide-react';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [initiateStatus, setInitiateStatus] = useState('idle');
  const [schemaStatus, setSchemaStatus] = useState('idle');
  const [queryLoading, setQueryLoading] = useState(false);
  const [sqlQuery, setSqlQuery] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Dark mode effect
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  const handleInitiate = async () => {
    setInitiateStatus('loading');
    setError(null);
    try {
      await api.initiateSQLAgent();
      setInitiateStatus('success');
    } catch (err) {
      setInitiateStatus('error');
      setError('Failed to initiate AI agent: ' + err.message);
    }
  };

  const handleLoadSchema = async () => {
    setSchemaStatus('loading');
    setError(null);
    try {
      await api.loadDBTablesSchema();
      setSchemaStatus('success');
    } catch (err) {
      setSchemaStatus('error');
      setError('Failed to load schema: ' + err.message);
    }
  };

  const handleQuerySubmit = async (prompt) => {
    setQueryLoading(true);
    setError(null);
    setSqlQuery(null);
    setResults(null);

    try {
      const response = await api.getDataFrame(prompt);

      if (response.query) {
        setSqlQuery(response.query);
      }

      if (response.data && response.data.length > 0) {
        setResults(response.data);
      } else if (response.message) {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to execute query: ' + err.message);
    } finally {
      setQueryLoading(false);
    }
  };

  const dbInitialized = initiateStatus === 'success' && schemaStatus === 'success';

  return (
    <div className="min-h-screen">
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        dbInitialized={dbInitialized}
      />

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Hero Section */}
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-4xl font-bold gradient-text mb-3">
              Transform Natural Language into SQL
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Powered by AI • Query your Database using plain English
            </p>
          </div>

          {/* Initialization Panel */}
          <InitializationPanel
            onInitiate={handleInitiate}
            onLoadSchema={handleLoadSchema}
            initiateStatus={initiateStatus}
            schemaStatus={schemaStatus}
          />

          {/* Error Display */}
          {error && (
            <div className="glass rounded-lg p-4 border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20 animate-slide-up">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800 dark:text-red-300 mb-1">
                    Error
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Query Input */}
          <QueryInput
            onSubmit={handleQuerySubmit}
            loading={queryLoading}
            disabled={!dbInitialized}
          />

          {/* Loading State */}
          {queryLoading && (
            <div className="glass rounded-lg p-12 text-center animate-slide-up">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Generating SQL query and fetching results...
              </p>
            </div>
          )}

          {/* SQL Display */}
          {sqlQuery && !queryLoading && (
            <SQLDisplay sqlData={sqlQuery} darkMode={darkMode} />
          )}

          {/* Results Table */}
          {results && !queryLoading && (
            <ResultsTable data={results} query={sqlQuery} />
          )}

          {/* Footer */}
          <div className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">
            <p>Built with React.js & FastAPI</p>
            <p>By Aakash Jha </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
