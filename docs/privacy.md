# MementoCare AI — Privacy, Consent & Governance

## Tagline
**"AI that remembers the person, not just the score."**

## SIH Problem Statement Reference
**SIH26003 — AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region**

---

## 1. Compliance with Digital Personal Data Protection (DPDP) Act 2023

MementoCare AI is designed with strict adherence to India's DPDP Act 2023 and healthcare privacy principles:
- **Purpose Limitation:** Data is collected solely for cognitive engagement, routine assistance, and caregiver reassurance.
- **Data Minimisation:** No unnecessary biometrics, video feeds, or continuous background audio are ever recorded or transmitted.
- **Explicit Informed Consent:** Every patient-caregiver link, memory photo upload, and healthcare worker access requires explicit digital consent.
- **Right to Revocation & Erasure:** Caregivers and patients can revoke sharing permissions or purge personal memory assets at any time.

---

## 2. Privacy Center Controls

The interactive **Privacy Center** allows patients and caregivers to configure granular permissions:

```typescript
export interface PrivacyCenterConfig {
  patientId: string;
  voiceRecordingEnabled: boolean;
  storeAudioLocallyOnly: boolean;
  locationSharingEnabled: boolean;
  analyticsSharingApproved: boolean;
  doctorAccessApproved: boolean;
  dataRetentionDays: number;
  lastDataExportedAt?: string;
}
```

- **Voice Privacy Toggle:** Option to process speech 100% on-device without cloud transmission.
- **Private Storage:** Personal family photos are stored in private encrypted storage buckets accessible only via time-bounded signed URLs.
- **Immutable Audit Logging:** Every access, approval, consent modification, and export event is cryptographically timestamped in the audit log.
