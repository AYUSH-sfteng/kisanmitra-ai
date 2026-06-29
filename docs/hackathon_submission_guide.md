# Hackathon Submission Guide - KisanMitra AI

A reference script, judging alignments, and pitch guidelines for the hackathon presentations.

---

## 1. Problem Statement
Millions of smallholder farmers struggle to coordinate fragmented advice. Weather alerts don't account for crop schedules; disease diagnoses lack cost-aware spray times; and crop protection advice is disconnected from market prices.

**KisanMitra AI** coordinates these signals using a secure, parallel Multi-Agent Network, synthesizing telemetry into one actionable strategy.

---

## 2. Pitch Presentation Structure

### Slide 1: Title (KisanMitra AI)
- **Tagline**: Secure Multi-Agent AI System: "Your Intelligent Farming Companion"
- **Focus**: Integrating crop health, weather, APMC market rates, and subsidy matches.

### Slide 2: The Core Challenge
- Farmers use 4+ disconnected apps or sources (news, SMS, local dealers).
- Results in pesticide wash-off, selling crop yield at loss, and missing crop insurance policies.

### Slide 3: The Multi-Agent Orchestrator Model
- Multi-agent asynchronous pipeline.
- Orchestrator splits execution to sub-agents (Disease, Weather, Market, Schemes).
- Security Guardrail Agent screens output before presentation.

---

## 3. Demo Walkthrough Script (3 Minutes)

1. **Introduction (30s)**: Start at the Landing Hero page. Explain the value proposition. Click "Watch Demo".
2. **Sequential Multi-Agent Flow (60s)**: Show the Orchestrator Fan-Out flow in the Dashboard. Explain the 900ms transition as separate agent processes query microservices.
3. **Consolidated Results (60s)**: Show the Disease card, Weather chip forecasts, Recharts Tomato price graphs, Mandi comparisons, and Schemes checklist. Explain the **Action Plan** card combining all these data points.
4. **Architecture tab (30s)**: Show the HTML/CSS flowchart to the judges to prove agent modularity and safety filters.
