# Developer Guide - KisanMitra AI

Development guidelines for KisanMitra AI.

---

## 1. Local Workspace Setup

Clone the repository and install all node/python modules:

```bash
# Clone
git clone https://github.com/your-username/kisanmitra-ai.git
cd kisanmitra-ai

# Install Frontend Modules
cd frontend
npm install

# Install Backend Modules
cd ../backend
python -m venv venv
# Activate virtual environment
source venv/bin/activate # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

## 2. Running Local Dev Servers

Run both servers in separate terminal panes:

### Pane A: Frontend Dev Server
```bash
cd frontend
npm run dev
```
Available at [http://localhost:5173](http://localhost:5173).

### Pane B: Backend API Server
```bash
cd backend
python main.py
```
Available at [http://localhost:8000](http://localhost:8000).

---

## 3. Extending the Agent Network

To add a new sub-agent process (e.g., "Soil Nutrient Agent"):

### Step 1: Update Frontend
In `frontend/src/components/Dashboard.jsx`, append the new agent configuration to `agentsList`:
```javascript
{ id: 'soil', name: 'Soil Agent', emoji: '🧪', role: 'Nutrient Index Evaluator' }
```

### Step 2: Update Backend
In `backend/main.py`, define the mock database evaluations and adjust `DiagnosisResponse` schema to support the additional fields:
```python
# In main.py
class DiagnosisResponse(BaseModel):
    ...
    soil_health: str
```
Ensure uvicorn is restarted.
