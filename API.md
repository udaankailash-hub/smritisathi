# MementoCare AI — REST API Documentation

## 1. Overview
All API endpoints follow RESTful conventions and return standardized JSON responses.

### Base URL:
`http://localhost:3000/api`

---

## 2. Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Detailed error explanation"
  }
}
```

---

## 3. Endpoints

### System Health
- **`GET /api/health`**
  - **Description:** Returns server status, version, and uptime.
  - **Response:**
    ```json
    {
      "status": "ok",
      "version": "1.0.0",
      "appName": "MindCare NER",
      "uptimeSeconds": 1240,
      "timestamp": "2026-09-01T08:45:00.000Z"
    }
    ```

### Patient Profiles
- **`GET /api/patients/:id`**
  - **Description:** Retrieve full demographic, clinical, and accessibility configuration for a patient.
  - **Example:** `GET /api/patients/p_abeni_01`

### Cognitive Games & Sessions
- **`GET /api/games`**
  - **Description:** Returns catalog of all available cognitive exercises, difficulty tiers, and regional themes.
- **`POST /api/games/session`**
  - **Description:** Submit a completed cognitive game interaction.
  - **Body:**
    ```json
    {
      "patientId": "p_abeni_01",
      "gameId": "game_familiar_sounds",
      "category": "SOUND_RECOGNITION",
      "difficulty": "medium",
      "score": 95,
      "accuracy": 95,
      "responseTimeMs": 1420,
      "durationSeconds": 65
    }
    ```
- **`GET /api/games/history/:patientId`**
  - **Description:** Returns historical session logs and accuracy trends for a patient.

### AI Recommendations
- **`GET /api/recommendations/:patientId`**
  - **Description:** Generates personalized, culturally adapted daily exercise recommendations using Google Gemini with deterministic offline fallback.

### Reminders & Routine
- **`GET /api/reminders`**
  - **Description:** Returns daily medication and hydration schedule.
- **`POST /api/reminders/:id/complete`**
  - **Description:** Acknowledge completed reminder.

### Caregiver Telemetry & Alerts
- **`GET /api/caregiver/alerts`**
  - **Description:** Returns real-time alerts, skipped routines, and priority notifications.
- **`GET /api/analytics/:patientId`**
  - **Description:** Returns domain-specific cognitive score breakdown and adherence telemetry.

### Admin & Audit Logs
- **`GET /api/audit-logs`**
  - **Description:** Returns chronological immutable security and access logs.
