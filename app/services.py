from sqlalchemy import inspect, text
import pandas as pd
import numpy as np
from datetime import datetime
from .database import engine, SessionLocal
from .ai import generate_sql_query
from .session_utils import get_cached_tables_schemas

def _sanitize_dataframe_for_json(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return df
    df = df.replace({np.nan: None})
    for col in df.columns:
        if str(df[col].dtype).startswith("datetime") or any(isinstance(x, (pd.Timestamp, datetime)) for x in df[col].dropna()):
            df[col] = df[col].apply(lambda x: x.isoformat() if isinstance(x, (pd.Timestamp, datetime)) else x)
    return df

def get_all_tables_name():
    inspector = inspect(engine)
    return inspector.get_table_names()

def get_schema_description():
    inspector = inspect(engine)
    schema = ""
    for table in inspector.get_table_names():
        columns = inspector.get_columns(table)
        col_desc = ", ".join(f"{col['name']} {col['type']}" for col in columns)
        schema += f"{table}({col_desc})\n"
    return schema

def execute_query(sql: str):
    db = SessionLocal()
    try:
        print("################################ Sending sql to db engine ###################################")
        print(text(sql))
        result = db.execute(text(sql))
        print("############################## QUERY EXECUTED #########################")
        print(result)
        if sql.strip().lower().startswith("select"):
            columns = result.keys()
            rows = result.fetchall()
            return pd.DataFrame(rows, columns=columns)
        db.commit()
        return "Query executed successfully."
    except Exception as e:
        db.rollback()
        return f"Error: {e}"
    finally:
        db.close()

def get_data_from_prompt(prompt: str) -> dict:
    schema = get_schema_description()
    sql = generate_sql_query(prompt, schema)
    print("SQL: ", sql)
    df_or_msg = execute_query(sql["sql_query"])
    print("df_or_msg :", df_or_msg)
    if isinstance(df_or_msg, pd.DataFrame):
        safe_df = _sanitize_dataframe_for_json(df_or_msg)
        return {"query": sql, "data": safe_df.to_dict(orient="records")}
    return {"query": sql, "message": df_or_msg, "data": []}

def get_data_from_prompt_v2(prompt: str) -> dict:
    sql = generate_sql_query(prompt)
    print("SQL: ", sql)
    df_or_msg = execute_query(sql["sql_query"])
    print("df_or_msg :", df_or_msg)
    if isinstance(df_or_msg, pd.DataFrame):
        return {"query": sql, "data": df_or_msg.to_dict(orient="records")}
    return {"query": sql, "message": df_or_msg, "data": []}

def get_data_from_raw_query(raw_query: str) -> dict:
    df_or_msg = execute_query(raw_query)
    if isinstance(df_or_msg, pd.DataFrame):
        return {"query": raw_query, "data": df_or_msg.to_dict(orient="records")}
    return {"query": raw_query, "message": df_or_msg, "data": []}

def feed_schema_description():
    inspector = inspect(engine)
    schema = ""
    table_schema_dict = {}
    cached_table_schema = get_cached_tables_schemas()
    for table in inspector.get_table_names():
        if cached_table_schema and cached_table_schema.get(table) and cached_table_schema.get(table)["sent_to_gpt"]:
            continue
        columns = inspector.get_columns(table)
        col_desc = ", ".join(f"{col['name']} {col['type']}" for col in columns)
        table_schema = f"{table}({col_desc})\n"
        table_schema_dict[table] = {"schema": table_schema, "sent_to_gpt": True}
        schema += table_schema
        if len(schema) > 15000:
            break
    return schema, table_schema_dict
