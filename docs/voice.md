# MementoCare AI — Voice-Assisted Interaction Layer

## 1. Multimodal Voice Architecture

Elderly seniors living with cognitive decline or low visual acuity frequently struggle with small keyboard inputs. MementoCare AI provides a voice-assisted interface:
- **Speech-to-Text (STT):** Web Speech API listening for spoken answers in supported dialects.
- **Answer Normalization:** Fuzzy matching matches spoken phrases against approved correct answers.
- **Text-to-Speech (TTS):** Calm 0.85x speech synthesis for spoken instructions and verbal congratulations.
- **Voice Fallback:** If microphone permission is denied or audio confidence is low, seniors can tap large cards or use typing fallback without penalty.
