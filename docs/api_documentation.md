# API Documentation - KisanMitra AI

Detailed specifications of the backend routing and agent interfaces.

## Base URL
- Local Development: `http://localhost:8000`

---

## Endpoints

### 1. Service Health
Check server and multi-agent network status.

- **Endpoint**: `/api/health`
- **Method**: `GET`
- **Response Format**: `application/json`

#### Response Example
```json
{
  "status": "healthy",
  "service": "kisanmitra-backend",
  "version": "1.0.0",
  "agents_active": true,
  "security_guardrails": "enabled"
}
```

---

### 2. Multi-Agent Telemetry & Diagnosis
Upload crop leaf image and metadata to run the sequential multi-agent diagnostic analysis pipeline.

- **Endpoint**: `/api/diagnose`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`

#### Request Parameters
| Name | Type | Description | Required | Default |
| :--- | :--- | :--- | :--- | :--- |
| `image` | File | Binary leaf image (JPG, PNG, WEBP) | No (Optional) | - |
| `location` | String (Form) | GPS location name | No | "Bengaluru, India" |
| `crop_type` | String (Form) | Target crop variety | No | "Tomato" |

#### Response Schema (JSON)
- **disease**: (string) Diagnosed crop disease name.
- **scientific_name**: (string) Scientific genus and species of pathogen.
- **confidence**: (float) Classifier model confidence ratio (0.0 to 1.0).
- **severity**: (string) Severity index (`Low`, `Moderate`, `High`).
- **symptoms**: (array of strings) Bullet points describing leaf symptoms.
- **treatment**: (string) Recommended treatment chemical or cultural guide.
- **recovery**: (string) Expected recovery duration window.
- **risk_level**: (string) Color-coded risk status.
- **weather_advice**: (string) Weather agent suggestions.
- **market_recommendation**: (string) Pricing engine hold/sell advice.
- **nearby_prices**: (array of objects) Current Mandi listings.
- **schemes**: (array of objects) Government subsidies match criteria.
- **action_plan**: (array of strings) Consolidated execution plan.
- **security_audit**: (object) Safety guardrails audit report.

#### Response Example
```json
{
  "disease": "Early Blight",
  "scientific_name": "Alternaria solani",
  "confidence": 0.94,
  "severity": "Moderate",
  "symptoms": [
    "Concentric rings (target board spot structure) on older leaves.",
    "Progressive foliar chlorosis surrounding lesions.",
    "Early defoliation commencing from basal foliage."
  ],
  "treatment": "Spray Mancozeb 75% WP formulation at 2 grams per Liter of clean water. Spray on leaf undersides thoroughly.",
  "recovery": "10-14 days",
  "risk_level": "Medium",
  "weather_advice": "Avoid spraying pesticides for the next 2 days. Pesticides require a 6-hour dry window for absorption to prevent soil and run-off wash away.",
  "market_recommendation": "Wait 3-5 days — prices expected to rise by 15-20% due to supply squeeze",
  "nearby_prices": [
    { "market": "Kolar Mandi", "distance": "12 km", "price": "₹17.50/kg" }
  ],
  "schemes": [
    {
      "name": "PMFBY Crop Insurance",
      "description": "Comprehensive insurance yield protection covering disease losses.",
      "eligible": true,
      "badge": "Eligible"
    }
  ],
  "action_plan": [
    "Apply Mancozeb fungicide: Treat tomato plants showing early blight symptoms immediately."
  ],
  "security_audit": {
    "prompt_injection_check": "Passed",
    "sensitive_data_removed": "Verified",
    "output_safety_check": "Passed",
    "confidence_threshold_score": "96%",
    "safety_audit_status": "Passed"
  }
}
```
