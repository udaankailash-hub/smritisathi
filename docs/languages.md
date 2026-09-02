# MementoCare AI — Multilingual Architecture

## Tagline
**"AI that remembers the person, not just the score."**

---

## 1. Multilingual Support Overview

North East India is one of the most linguistically diverse regions in the world, with over 200 indigenous languages and dialects across eight states. For elderly seniors with dementia or mild cognitive impairment (MCI), interacting in their native mother tongue reduces cognitive load and emotional agitation.

MementoCare AI supports 7 North Eastern and Indian languages with English fallback:

| Language Code | Language Name | Native Script | Verification Status | Speech Synthesis (TTS) | Speech Recognition (STT) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `en` | English | English | ✅ Verified | ✅ Active | ✅ Active |
| `as` | Assamese | অসমীয়া | ✅ Verified | ✅ Native Voice Fallback | ✅ Web Speech / Lexicon |
| `bn` | Bengali | বাংলা | ✅ Verified | ✅ Active | ✅ Active |
| `mni` | Manipuri (Meiteilon) | মণিপুরী / ꯃꯤꯇꯩꯂꯣꯟ | ✅ Verified | ✅ Phonetic Synthesizer | ✅ Lexicon Matcher |
| `lus` | Mizo (Lushai) | Mizo ṭawng | ✅ Verified | ✅ Phonetic Synthesizer | ✅ Lexicon Matcher |
| `kha` | Khasi | Ka Ktien Khasi | ✅ Verified | ✅ Phonetic Synthesizer | ✅ Lexicon Matcher |
| `hi` | Hindi | हिन्दी | ✅ Verified | ✅ Active | ✅ Active |

---

## 2. Language Pack Data Structure

Each language pack adheres to a strict schema ensuring that all UI labels, game prompts, instructions, reassurance phrases, and voice utterances are localized:

```typescript
export interface LanguagePack {
  language_code: SupportedLanguage;
  language_name: string;
  native_label: string;
  translation_pack: {
    dashboard: Record<string, string>;
    games: Record<string, string>;
    reminders: Record<string, string>;
    voice_prompts: Record<string, string>;
    caregiver: Record<string, string>;
    reassurance: Record<string, string>;
  };
  voice_pack: {
    engine: 'browser_speech' | 'phonetic_synth' | 'audio_assets';
    voice_uri?: string;
    rate: number;
    pitch: number;
  };
  verified: boolean;
  version: string;
}
```

---

## 3. Respectful & Culturally Appropriate Terms of Address

The platform supports customizable kinship terms and honorifics that can be selected by the caregiver:
- **Aai / Bou** (Mother / Grandmother - Assamese)
- **Kaka / Khura** (Uncle - Assamese/Bengali)
- **Didi / Baideu** (Elder Sister - Bengali/Assamese)
- **Mei / Kong** (Mother / Elder Sister - Khasi)
- **Nu-pui / Ka-nu** (Mother - Mizo)
- **Ima / Eche** (Mother / Sister - Manipuri)

> [!IMPORTANT]
> Terms of address are **configurable by the caregiver** and never automatically or stereoptypically forced on the patient.

---

## 4. Voice Fallback & Tiered Recognition

1. **Native Browser Speech Synthesis / Recognition**: When supported by the client browser / operating system.
2. **Deterministic Phonetic & Lexicon Matcher**: Offline rule-based fuzzy matcher for regional voice commands ("Aai", "Pani", "Okhod", "Khel", "Help").
3. **Touch Fallback**: Big 64px tap buttons for every action.
4. **Text / Caregiver Input**: Direct typing option if voice recognition is uncertain.
