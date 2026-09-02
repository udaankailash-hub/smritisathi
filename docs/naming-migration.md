# MindCare NER — Codebase Domain Architecture & Nomenclature Audit

**Document Version:** 2.0.0  
**Scope:** Domain-Driven Design (DDD) Terminology Standards  
**Compliance Standard:** Production Architecture & Domain-Driven Design

---

## 1. Executive Summary

This document establishes the systematic naming conventions and descriptive, domain-specific terminology enforced across the entire MindCare NER codebase.

The architecture enforces:
- React component names and file paths
- TypeScript types, interfaces, and enums
- REST API route schemas and URL parameters
- Database table and column names
- Service classes, helper methods, and state variables
- User-facing UI strings and accessibility landmarks

---

## 2. Standardized Domain Components & Typings

| # | Standardized Production Component / Type | Category | Target File(s) | Domain Feature | Architecture Standard |
|---|---|---|---|---|---|
| 1 | `DemonstrationModeModal` | React Component | `src/components/common/DemonstrationModeModal.tsx` | Simulation & Testing | Controlled evaluation sandbox for clinical flows. |
| 2 | `SimulationArchetype` | TypeScript Type | `src/types/index.ts` | Simulation & Testing | Standardizes the 4 evaluation archetypes (High Engagement, Moderate, Low Need, Offline). |
| 3 | `isDemonstrationModeOpen` | State Variable | `src/App.tsx` | Application State | Descriptive boolean flag managing modal presentation state. |
| 4 | `handleApplySimulationArchetype` | Handler | `src/App.tsx` | Application State | Handler for applying patient simulation parameters. |
| 5 | `onOpenDemonstrationMode` | Prop / Callback | `src/components/common/Header.tsx` | Navigation & Header | Specifies trigger action for evaluation mode. |
| 6 | `open-demonstration-sandbox-btn` | HTML ID / Selector | `src/components/common/Header.tsx` | Accessibility & UI | Accessible DOM ID reflecting evaluation sandbox. |
| 7 | `demonstration-mode-modal` | HTML ID / Selector | `src/components/common/DemonstrationModeModal.tsx` | Accessibility & UI | Unique modal DOM identifier conforming to naming standards. |
| 8 | `MindCare NER Production Platform` | UI String / Header | `src/components/common/Header.tsx` | Brand & Header | Reflects official platform name in clinical deployments. |
| 9 | `Demo Sandbox` | UI Badge Text | `src/components/common/Header.tsx` | Evaluation Suite | Clear badge label for evaluators and clinicians. |
| 10 | `Cognitive Simulation & Evaluation Sandbox` | UI Heading | `src/components/common/DemonstrationModeModal.tsx` | Evaluator Sandbox | Clinically grounded title for the archetype simulator. |
| 11 | `1.0.0` | Server Version Constant | `server.ts` | System Health API | Production semver release identifier for system telemetry. |
| 12 | `MindCare NER System Architecture Explorer` | UI String / Section | `src/components/admin/ArchitectureModal.tsx` | System Architecture | Descriptive title for technical architecture inspection view. |
| 13 | `AdminConsole` / `ContentManagement` | Component / Module | `src/components/admin/AdminConsole.tsx` | Administrative Console | Complete admin console with game, question, user, and audit management. |
| 14 | `cognitive_games` | Database Table & API | `server.ts`, `src/db/schema.ts` | Cognitive Activities | Standardizes activity catalog under RESTful `/api/cognitive-games` endpoint. |
| 15 | `caregiver_alerts` | Database Table & API | `server.ts`, `src/db/schema.ts` | Caregiver Safety | Clarifies alerts as belonging to the Caregiver Alert Center subsystem. |
| 16 | `AdaptiveCognitiveEngine` / `ActivityRecommendationEngine` | Service & API | `src/services/activityPlanService.ts` | AI Recommendation | Dual-layer adaptive engine with explainable rationale. |
| 17 | `OfflineSyncManager` / `SynchronizationService` | Service Class | `src/services/offlineSync.ts` | Offline Edge Resilience | Offline store synchronization engine with conflict detection and retry queue. |

---

## 3. Structural Conventions Enforced

- **React Components:** PascalCase (e.g., `DemonstrationModeModal`, `CaregiverAlertCenter`, `AdminConsole`, `MemoryGarden`)
- **TypeScript Types & Interfaces:** PascalCase (e.g., `SimulationArchetype`, `DailyActivityPlan`, `CaregiverAlert`, `MemoryAlbum`)
- **Variables & Functions:** camelCase (e.g., `isDemonstrationModeOpen`, `handleApplySimulationArchetype`, `syncPendingQueue`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `SIMULATION_ARCHETYPES`, `MAX_SYNC_RETRY_COUNT`)
- **Database Tables:** snake_case (e.g., `memory_albums`, `memory_items`, `caregiver_alerts`, `garden_progress`, `audit_logs`)
- **Database Columns:** snake_case (e.g., `patient_id`, `created_at`, `is_completed`, `resolved_by`)
- **API Endpoints:** kebab-case REST resources (e.g., `/api/cognitive-games`, `/api/caregiver/alerts`, `/api/activity-plan`)
- **File Names:** kebab-case for docs/utilities, PascalCase for React components.

---

## 4. Verification Checklist

- [x] Zero leftover prototype strings in source code files (`src/**`, `server.ts`).
- [x] All imports and exports updated cleanly.
- [x] RESTful API endpoints updated with backwards compatibility.
- [x] Database migrations created with non-destructive versioning.
- [x] Automated test runner validating domain standards in production code.
