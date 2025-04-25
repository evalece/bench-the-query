FROM python:3.11-slim

# Set working directory
WORKDIR /code

# Install dependencies
COPY requirements.txt .
RUN  pip install --no-cache-dir -r requirements.txt \
    && pip install "uvicorn==0.29.0"

# Copy your FastAPI app
COPY . /code

# Run the app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
