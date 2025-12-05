from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas import PromptRequest
from .services import get_all_tables_name, feed_schema_description, get_schema_description, get_data_from_prompt
from .ai import add_all_tables_as_prompt, feed_table_schema_with_ai, generate_sql_query as ai_generate_sql_query

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/initiate-sql-ai-agent")
def fetch_db_schema():
    tables = get_all_tables_name()
    return add_all_tables_as_prompt(tables)

@app.get("/load-db-tables-schema")
def fetch_db_tables_schema():
    schemas, table_schema_dict = feed_schema_description()
    return feed_table_schema_with_ai(schemas, table_schema_dict=table_schema_dict)

@app.post("/get-sql-query")
def get_sql_query(request: PromptRequest):
    schema = get_schema_description()
    return ai_generate_sql_query(request.prompt, schema_description=schema)

@app.post("/get-dataframe")
def get_dataframe(request: PromptRequest):
    return get_data_from_prompt(request.prompt)
