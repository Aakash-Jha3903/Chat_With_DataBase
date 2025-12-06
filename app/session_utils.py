import json
import os

SESSION_FILE = "chatgpt_session.json"
SESSION_URL_FILE = "chatgpt_session_url.json"

def save_session_url(driver, filepath=SESSION_URL_FILE):
    session_url = driver.current_url
    with open(filepath, "w") as f:
        json.dump({"url": session_url}, f)

def load_session_data(filepath=SESSION_FILE):
    if os.path.exists(filepath):
        with open(filepath, "r") as f:
            return json.load(f)
    return None

def load_session_url(filepath=SESSION_URL_FILE):
    if os.path.exists(filepath):
        with open(filepath, "r") as f:
            data = json.load(f)
            return data.get("url")
    return None

def add_table_schema_into_session_memory(new_table_schema_dict, filepath=SESSION_FILE):
    if new_table_schema_dict:
        print("######################## inside table schema session storage #########################")
        if os.path.exists(filepath):
            with open(filepath, "r") as f:
                data = json.load(f)
        else:
            data = {}
        data.update(new_table_schema_dict)
        with open(filepath, "w") as f:
            json.dump(data, f, indent=2)

def get_cached_tables_schemas():
    return load_session_data()
