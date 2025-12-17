# 🗣️ Chat with Database - AI-Powered Natural Language to SQL

<div align="center">

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Transform natural language into SQL queries using AI**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Architecture](#-architecture) • [API](#-api-endpoints)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Chat with Database** is an intelligent database query interface that allows users to interact with PostgreSQL databases using natural language. Powered by OpenAI's models, it translates plain English queries into SQL, executes them, and presents results in a beautiful, modern UI.

### Why Chat with Database?

- 🚀 **No SQL Knowledge Required** - Query your database using plain English
- 🛡️ **Safe Operations** - Confirmation dialogs for destructive queries (UPDATE, DELETE, INSERT)
- 📊 **Visual Results** - Beautiful table displays with syntax-highlighted SQL
- 🎯 **Smart Suggestions** - Quick query templates and recent query history
- 🌓 **Dark Mode** - Eye-friendly interface for day and night coding
- ⚡ **Real-time** - Instant query generation and execution

---

## ✨ Features

### 🤖 AI-Powered Query Generation
- Natural language to SQL conversion using OpenAI 
- Context-aware query generation based on database schema
- Support for complex queries, joins, aggregations, and more

### 🔒 Safety First
- **Confirmation Dialogs** for destructive operations (UPDATE, DELETE, INSERT, DROP, ALTER, TRUNCATE, CREATE)
- SQL query preview before execution
- Cancel option to prevent accidental data modifications
- Clear visual distinction between read and write operations

### 💡 Smart Query Interface
- **Quick Query** section with common database operations:
  - Show all table names
  - Count tables
  - Get database name
  - View all records from tables
- **Recent Queries** - Automatically saves last 5 successful queries
- One-click query execution from history

### 🎨 Modern UI/UX
- Clean, glassmorphic design with smooth animations
- Syntax-highlighted SQL display
- Color-coded success (green) and error (red) messages
- Responsive layout for all screen sizes
- Dark mode support with persistent preference

### 📈 Results Display
- Tabular data presentation with proper formatting
- Automatic data type handling (dates, numbers, strings)
- Empty state handling
- Export-ready data format

---

## 🎬 Demo

### Query Flow

1. **Natural Language Input**
   ```
   "Show me all users who registered in the last 30 days"
   ```

2. **AI Generates SQL**
   ```sql
   SELECT * FROM users 
   WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
   ORDER BY created_at DESC;
   ```

3. **Results Displayed**
   - Beautiful table with all matching records
   - Success message confirmation

### Destructive Query Protection

1. **User Input**
   ```
   "Remove the phone number of admin@gmail.com user"
   ```

2. **Confirmation Dialog Appears**
   - Shows the generated SQL query
   - "Cancel" or "Confirm" options
   - Query executes ONLY after confirmation

3. **Success Feedback**
   - Green success message: "Query executed successfully"
   - SQL query display for reference

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Robust relational database
- **OpenAI API** - For natural language processing
- **Pandas** - Data manipulation and analysis
- **Python-dotenv** - Environment variable management

### Frontend
- **React.js** - UI library with hooks
- **Vite** - Next-generation frontend tooling
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────────┐
│                         Frontend (React)                   │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │  QueryInput│  │ConfirmDialog │  │  ResultsTable    │    │
│  └────────────┘  └──────────────┘  └──────────────────┘    │
└────────────────────────────────────────────────────────────┘
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend (FastAPI)                      │
│  ┌────────────────────────────────────────────────────┐     │
│  │  API Endpoints                                     │     │
│  │  • /initiate-sql-ai-agent                          │     │
│  │  • /load-db-tables-schema                          │     │
│  │  • /get-sql-query (generate only)                  │     │
│  │  • /get-dataframe (execute)                        │     │
│  └────────────────────────────────────────────────────┘     │
│                           │                                 │
│  ┌────────────────┐       │        ┌─────────────────┐      │
│  │   AI Service   │◄──────┴──────► │  Database Layer │      │
│  │   (OpenAI)     │                │  (SQLAlchemy)   │      │
│  └────────────────┘                └─────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │  PostgreSQL  │
                    │   Database   │
                    └──────────────┘
```

### Data Flow

1. **Initialization**
   - Frontend calls `/initiate-sql-ai-agent` to load table names
   - Calls `/load-db-tables-schema` to get detailed schema
   - AI agent stores schema context for query generation

2. **Query Generation (Non-Destructive)**
   - User enters natural language query
   - Frontend calls `/get-dataframe` with prompt
   - Backend uses OpenAI to generate SQL
   - Executes query and returns results
   - Frontend displays data in table

3. **Query Generation (Destructive)**
   - User enters destructive query (UPDATE/DELETE/etc.)
   - Frontend calls `/get-sql-query` (generates SQL without executing)
   - Detects destructive keywords
   - Shows confirmation dialog with SQL preview
   - On confirm: calls `/get-dataframe` to execute
   - On cancel: aborts without execution

---

## 📦 Installation

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- OpenAI API Key

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aakash-Jha3903/Chat_With_DataBase.git
   cd Chat_With_DataBase/postgresql_ai_agent
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   .\venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirement.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials:
   ```env
   # Database Configuration
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   DB_PORT=5432
   
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key
   ```

5. **Start the backend server**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

   Server will be running at `http://localhost:8000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   Frontend will be running at `http://localhost:5173`

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DB_NAME` | PostgreSQL database name | ✅ | - |
| `DB_USER` | Database username | ✅ | - |
| `DB_PASSWORD` | Database password | ✅ | - |
| `DB_HOST` | Database host | ✅ | `localhost` |
| `DB_PORT` | Database port | ✅ | `5432` |
| `OPENAI_API_KEY` | OpenAI API key | ✅ | - |

### CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)

To add more origins, edit `app/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🚀 Usage

### 1. Initialize the System

1. Open the application at `http://localhost:5173`
2. Click **"Initiate AI Agent"** to load database tables
3. Click **"Load Schema"** to fetch table structures
4. Wait for both to show ✅ success

### 2. Query Your Database

#### Using Quick Query Templates
- Click any predefined query button:
  - "Show me all users"
  - "Show all table names"
  - "Number of tables"
  - etc.

#### Using Natural Language
Type your question in plain English:
```
"Show me the top 10 customers by total purchase amount"
"List all orders from the last week"
"Find users who haven't logged in for 30 days"
"Count how many products are out of stock"
```

#### Using Recent Queries
- After executing queries, they appear in "Recent Successful Queries"
- Click any recent query to re-execute it

### 3. Handling Destructive Queries

For queries that modify data:
```
"Update the email of user with ID 123 to newemail@example.com"
"Delete all inactive users"
"Insert a new product with name 'Widget' and price 29.99"
```

1. Confirmation dialog appears
2. Review the generated SQL
3. Click **"Confirm"** to execute or **"Cancel"** to abort

### 4. View Results

- **SELECT queries**: Data displayed in formatted table
- **Modification queries**: Success message with affected rows
- **Errors**: Clear error messages with troubleshooting hints

---

## 🔌 API Endpoints

### `GET /initiate-sql-ai-agent`
Initialize the AI agent with database table names.

**Response:**
```json
{
  "message": "AI agent initiated with tables",
  "tables": ["users", "orders", "products"]
}
```

### `GET /load-db-tables-schema`
Load detailed schema for all tables.

**Response:**
```json
{
  "message": "Schema loaded successfully",
  "tables_count": 3
}
```

### `POST /get-sql-query`
Generate SQL query from natural language (without executing).

**Request:**
```json
{
  "prompt": "Show me all users"
}
```

**Response:**
```json
{
  "sql_query": "SELECT * FROM users;",
  "explanation": "Retrieves all records from users table"
}
```

### `POST /get-dataframe`
Generate and execute SQL query, return results.

**Request:**
```json
{
  "prompt": "Show me all users"
}
```

**Response:**
```json
{
  "query": {
    "sql_query": "SELECT * FROM users;",
    "explanation": "..."
  },
  "data": [
    {"id": 1, "name": "Aakash Jha", "email": "aakashjha343@gmail.com"},
    {"id": 2, "name": "Ayush Kumar", "email": "ayushkumar@example.com"}
  ]
}
```

For non-SELECT queries:
```json
{
  "query": {...},
  "message": "Query executed successfully.",
  "data": []
}
```

---

## 📁 Project Structure

```
postgresql_ai_agent/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application & routes
│   ├── database.py          # Database connection & session
│   ├── ai.py                # OpenAI integration & prompt engineering
│   ├── services.py          # Business logic & query execution
│   ├── schemas.py           # Pydantic models
│   └── session_utils.py     # Session management utilities
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── features/
│   │   │   │   ├── QueryInput.jsx           # Query input with suggestions
│   │   │   │   ├── SQLDisplay.jsx           # Syntax-highlighted SQL
│   │   │   │   ├── ResultsTable.jsx         # Data table display
│   │   │   │   └── InitializationPanel.jsx  # Setup controls
│   │   │   ├── layout/
│   │   │   │   └── Header.jsx               # App header with dark mode
│   │   │   └── ui/
│   │   │       ├── Button.jsx               # Reusable button component
│   │   │       ├── Card.jsx                 # Card container
│   │   │       ├── Input.jsx                # Input components
│   │   │       ├── LoadingSpinner.jsx       # Loading indicator
│   │   │       └── ConfirmationDialog.jsx   # Confirmation modal
│   │   ├── api/
│   │   │   └── client.js                    # API client with axios
│   │   ├── utils/
│   │   │   └── constants.js                 # App constants
│   │   ├── App.jsx                          # Main app component
│   │   ├── App.css                          # Global styles
│   │   └── main.jsx                         # React entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── .env                     # Environment variables (gitignored)
├── .env.example             # Environment template
├── requirement.txt          # Python dependencies
└── README.md               # This file
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint and Prettier for JavaScript/React code
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Aakash Jha**

- GitHub: [@Aakash-Jha3903](https://github.com/Aakash-Jha3903)
- Project: [Chat with Database](https://github.com/Aakash-Jha3903/Chat_With_DataBase)

---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for API
- [FastAPI](https://fastapi.tiangolo.com/) for the amazing Python framework
- [React](https://react.dev/) for the UI library
- [TailwindCSS](https://tailwindcss.com/) for styling utilities
- [Lucide](https://lucide.dev/) for beautiful icons

---

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/Aakash-Jha3903/Chat_With_DataBase/issues) page
2. Create a new issue with detailed description
3. Contact: [Your Email]

---

<div align="center">

**Made with ❤️ by Aakash Jha**

⭐ Star this repo if you find it helpful!

</div>