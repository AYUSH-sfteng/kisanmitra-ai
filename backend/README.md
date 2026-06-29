# KisanMitra AI Backend API

🌾 Secure Multi-Agent AI platform for farmers. This is the FastAPI backend service which simulates multi-agent routing, security audits, APMC mandi lists, and weather alerts.

## Tech Stack
- **FastAPI**: Modern, high-performance web framework.
- **Pydantic**: Data validation and schemas.
- **Uvicorn**: Lightning-fast ASGI server implementation.

---

## Getting Started

### Prerequisites
- Python 3.9 or higher

### Installation
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Execution
Start the development server:
```bash
python main.py
```
Or use uvicorn CLI:
```bash
uvicorn main:app --reload --port 8000
```
The interactive Swagger API documentation will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## API Endpoints

### 1. Health Status
- **URL**: `GET /api/health`
- **Description**: Returns status checks and security agent availability flags.

### 2. Crop Diagnosis Pipeline
- **URL**: `POST /api/diagnose`
- **Parameters** (Form Data):
  - `image`: UploadFile (optional leaf image)
  - `location`: str (default: "Bengaluru, India")
  - `crop_type`: str (default: "Tomato")
- **Description**: Simulates the Orchestrator-Agent workflow and returns structured diagnosis, weather warnings, mandi price trends, schemes eligibility matches, action steps, and safety auditing metadata.
