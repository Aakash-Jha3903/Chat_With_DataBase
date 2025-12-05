from pydantic import BaseModel

class PromptRequest(BaseModel):
    prompt: str

class RawSQLQuery(BaseModel):
    raw_query: str
