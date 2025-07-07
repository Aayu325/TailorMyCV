import re

def clean_json_string(raw):
    if not isinstance(raw, str):
        raise TypeError(f"[clean_json_string] Expected string, got {type(raw)} instead. Value: {raw}")
    
    match = re.search(r"```json(.*?)```", raw, re.DOTALL)
    if match:
        return match.group(1).strip()
    return raw.strip()
