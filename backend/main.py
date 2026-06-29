from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
from typing import List, Optional

app = FastAPI(
    title="KisanMitra AI Backend",
    description="🌾 Secure Multi-Agent AI platform for farmers built with Google ADK, Gemini, MCP, FastAPI, React & Next.js.",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MandiPrice(BaseModel):
    market: str
    distance: str
    price: str

class SchemeDetail(BaseModel):
    name: str
    description: str
    eligible: bool
    badge: str

class DiagnosisResponse(BaseModel):
    disease: str
    scientific_name: str
    confidence: float
    severity: str
    symptoms: List[str]
    treatment: str
    recovery: str
    risk_level: str
    weather_advice: str
    market_recommendation: str
    nearby_prices: List[MandiPrice]
    schemes: List[SchemeDetail]
    action_plan: List[str]
    security_audit: dict

@app.get("/api/health")
def health_check():
    """
    Sanity check route for docker or build verification.
    """
    return {
        "status": "healthy",
        "service": "kisanmitra-backend",
        "version": "1.0.0",
        "agents_active": True,
        "security_guardrails": "enabled"
    }

@app.post("/api/diagnose", response_model=DiagnosisResponse)
async def diagnose_crop(
    image: Optional[UploadFile] = File(None),
    location: str = Form("Bengaluru, India"),
    crop_type: str = Form("Tomato")
):
    """
    Mocked multi-agent crop leaf diagnostics pipeline.
    Simulates: Orchestrator -> Disease Classifier -> Weather Telemetry -> Market trends -> Scheme matching -> Security checks.
    """
    # 1. Disease Agent Analysis
    disease = "Early Blight"
    scientific_name = "Alternaria solani"
    confidence = 0.94
    severity = "Moderate"
    symptoms = [
        "Concentric rings (target board spot structure) on older leaves.",
        "Progressive foliar chlorosis surrounding lesions.",
        "Early defoliation commencing from basal foliage."
    ]
    treatment = "Spray Mancozeb 75% WP formulation at 2 grams per Liter of clean water. Spray on leaf undersides thoroughly."
    recovery = "10-14 days"
    risk_level = "Medium"
    
    # 2. Weather Agent Analysis
    weather_advice = "Avoid spraying pesticides for the next 2 days. Pesticides require a 6-hour dry window for absorption to prevent soil and run-off wash away."
    
    # 3. Market Agent Analysis
    market_recommendation = "Wait 3-5 days — prices expected to rise by 15-20% due to supply squeeze"
    nearby_prices = [
        MandiPrice(market="Kolar Mandi", distance="12 km", price="₹17.50/kg"),
        MandiPrice(market="Chintamani Mandi", distance="28 km", price="₹18.20/kg"),
        MandiPrice(market="Yeshwanthpura Mandi", distance="42 km", price="₹19.00/kg")
    ]
    
    # 4. Scheme Agent Analysis
    schemes = [
        SchemeDetail(
            name="PMFBY Crop Insurance",
            description="Comprehensive insurance yield protection covering disease outbreak losses.",
            eligible=True,
            badge="Eligible"
        ),
        SchemeDetail(
            name="PM-KISAN Subsidy",
            description="Direct benefit landholder cash transfer of ₹6,000 yearly in 3 splits.",
            eligible=True,
            badge="Eligible"
        ),
        SchemeDetail(
            name="Soil Health Card Scheme",
            description="Provide chemical nutrients analysis cards with fertilizer advisories.",
            eligible=False,
            badge="Pending Verification"
        )
    ]
    
    # 5. Final Action Plan (Synthesized by Orchestrator)
    action_plan = [
        "Apply Mancozeb fungicide: Treat tomato plants showing early blight symptoms immediately. Avoid overhead irrigation for the next 2 days to maintain leaf dry duration.",
        "Delay chemical spray operations: Rain is forecast on Thursday. Keep sprays scheduled for Friday or Saturday morning to prevent pesticide run-off.",
        "Hold tomato stock: Local Mandi prices are low (₹18/kg) but trending up. Price forecast suggests a delay in selling by 3-5 days will capture an expected ₹2-3/kg price increase.",
        "File insurance request: You have active tomato eligibility for the PMFBY Crop Insurance subsidy. Complete application registration prior to the July 31st season deadline."
    ]
    
    # 6. Security Guardrails Audit
    security_audit = {
        "prompt_injection_check": "Passed",
        "sensitive_data_removed": "Verified",
        "output_safety_check": "Passed",
        "confidence_threshold_score": "96%",
        "safety_audit_status": "Passed"
    }
    
    return DiagnosisResponse(
        disease=disease,
        scientific_name=scientific_name,
        confidence=confidence,
        severity=severity,
        symptoms=symptoms,
        treatment=treatment,
        recovery=recovery,
        risk_level=risk_level,
        weather_advice=weather_advice,
        market_recommendation=market_recommendation,
        nearby_prices=nearby_prices,
        schemes=schemes,
        action_plan=action_plan,
        security_audit=security_audit
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
