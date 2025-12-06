import os
import re
from typing import Optional, Dict, Any
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("OPEN_AI_KEY")
client = OpenAI(api_key=api_key)

def _extract_sql_from_text(text: str) -> str:
    m = re.search(r"```sql\s*(.+?)```", text, flags=re.IGNORECASE | re.DOTALL)
    if m:
        return m.group(1).strip()
    m2 = re.search(r"((?:SELECT|INSERT|UPDATE|DELETE)\s.+?);?$", text, flags=re.IGNORECASE | re.DOTALL)
    if m2:
        return m2.group(1).strip()
    return text.strip()

def _chat(system_prompt: str, user_content: str) -> str:
    resp = client.chat.completions.create(
        model="gpt-4.1",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_content},
        ],
        temperature=0.2,
        max_tokens=400,
    )
    return resp.choices[0].message.content.strip()

def generate_sql_query(prompt: str, schema_description: Optional[str] = None) -> Dict[str, Any]:
    sys = (
        "You convert natural language into safe, correct SQL for Postgres. "
        "Only return the SQL needed; no explanations unless asked. Prefer explicit column lists."
    )
    if schema_description:
        full = f"Database schema:\n{schema_description}\n\nUser request:\n{prompt}\n\nReturn only the SQL."
    else:
        full = f"User request:\n{prompt}\n\nReturn only the SQL."
    raw = _chat(sys, full)
    sql = _extract_sql_from_text(raw)
    return {"sql_query": sql, "raw_response": raw, "used_schema": bool(schema_description)}

def add_all_tables_as_prompt(tables) -> Dict[str, Any]:
    sys = "You are assisting with SQL generation."
    user = (
        "Here are the database table names. Acknowledge and wait for schemas later.\n\n"
        f"Tables: {tables}\n\n"
        "Reply briefly with 'acknowledged' and a one-line reminder on how to request SQL."
    )
    raw = _chat(sys, user)
    return {"message": raw, "tables_count": len(tables) if hasattr(tables, '__len__') else None}

def feed_table_schema_with_ai(schemas: str, table_schema_dict: Optional[dict] = None) -> Dict[str, Any]:
    sys = "You memorize provided DB schema chunks to generate future SQL."
    user = (
        "Memorize this schema chunk for future SQL generation.\n\n"
        f"{schemas}\n\n"
        "Reply with a brief 'schema received' and list which tables you saw."
    )
    raw = _chat(sys, user)
    seen = []
    for line in schemas.splitlines():
        line = line.strip()
        m = re.match(r"([A-Za-z0-9_]+)\s*\(", line)
        if m:
            seen.append(m.group(1))
    return {"message": raw, "tables_detected": seen, "stored_meta": list(table_schema_dict.keys()) if isinstance(table_schema_dict, dict) else []}
