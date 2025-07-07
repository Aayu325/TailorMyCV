import mammoth

def extract_html_from_docx(file_path):
    with open(file_path, "rb") as docx_file:
        result = mammoth.convert_to_html(docx_file)
        return result.value  # This is clean HTML
