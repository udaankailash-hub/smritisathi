# MementoCare AI — Adaptive Difficulty Engine

## 1. Objective & Non-Clinical Framing

The MementoCare AI Adaptive Engine is a **transparent, explainable rules-based algorithm**. It evaluates interaction fluidness and adjusts activity difficulty dynamically to maintain senior comfort, confidence, and engagement.

It is **NOT** a diagnostic test, disease progression predictor, or clinical cognitive scoring tool.

---

## 2. Weighted Performance Formula

$$\text{Performance Score} = (\text{Accuracy} \times 0.45) + (\text{Normalized Speed} \times 0.25) + (\text{Consistency} \times 0.20) + (\text{Assistance Efficiency} \times 0.10)$$

Where:
- **Accuracy (0–100%):** Ratio of correct answers to total attempts.
- **Normalized Speed (0–100%):** Fluidity of completion relative to baseline pacing (capped to prevent rush).
- **Consistency (0–100%):** Session-over-session variance in response latency.
- **Assistance Efficiency (0–100%):** $100 - (\text{Hints} \times 20 + \text{Instruction Repeats} \times 10)$.

---

## 3. Transition Rules & Boundary Thresholds

| Performance Score Range | Action | Difficulty Adjustment | Spoken/Visual Explanation |
| :--- | :--- | :--- | :--- |
| **85 – 100** | `INCREASE` | $+1$ Level (e.g. Easy $\rightarrow$ Medium) | *"Strong recent interaction performance. Progressing to the next level."* |
| **70 – 84** | `MAINTAIN` | Maintain current level | *"Difficulty maintained because performance is within comfortable expected range."* |
| **50 – 69** | `REDUCE_SLIGHTLY` | $-1$ Level + Offer Hint | *"Adjusting to an easier level and offering gentle hints for comfort."* |
| **Below 50** | `SIMPLIFY_AND_SUPPORT` | Set to Level 1 + Support | *"Simplifying activity, repeating instructions, and offering comforting assistance."* |
| **Distress / Pause** | `OFFER_BREAK` | Maintain Level + Pause | *"Activity paused to prioritize comfort and restful pacing."* |

---

## 4. Boundary Value Testing

The following boundary conditions are explicitly tested and guaranteed:
- **Score 85 vs 84:** Score 85 triggers `INCREASE`; Score 84 triggers `MAINTAIN`.
- **Score 70 vs 69:** Score 70 triggers `MAINTAIN`; Score 69 triggers `REDUCE_SLIGHTLY`.
- **Score 50 vs 49:** Score 50 triggers `REDUCE_SLIGHTLY`; Score 49 triggers `SIMPLIFY_AND_SUPPORT`.
- **Patient Pause Request:** Overrides all score thresholds and triggers `OFFER_BREAK` with no completion penalty.
