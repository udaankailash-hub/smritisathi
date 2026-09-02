/**
 * MementoCare AI - 100% Offline-First Outbox Synchronization Engine
 * Handles idempotent event queuing, storage, and synchronization with unique event_id.
 */

const STORAGE_KEY = 'mementocare_offline_outbox';
const SYNCED_KEY = 'mementocare_synced_events';

class OfflineOutbox {
  constructor() {
    this.listeners = new Set();
  }

  getOutbox() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  getSyncedHistory() {
    try {
      const data = localStorage.getItem(SYNCED_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveLocalSession(sessionData) {
    const outbox = this.getOutbox();
    const eventId = sessionData.eventId || `evt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const event = {
      ...sessionData,
      eventId,
      createdAt: new Date().toISOString(),
      synced: false,
    };

    outbox.push(event);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(outbox));
    this.notify();
    return event;
  }

  getPendingCount() {
    return this.getOutbox().length;
  }

  syncNow() {
    const outbox = this.getOutbox();
    if (outbox.length === 0) return { count: 0, status: 'NO_OP' };

    const synced = this.getSyncedHistory();
    const seenEventIds = new Set(synced.map((e) => e.eventId));

    // Deduplicate against already synced events
    const newItems = outbox.filter((e) => !seenEventIds.has(e.eventId));
    const newlySynced = newItems.map((e) => ({ ...e, synced: true, syncedAt: new Date().toISOString() }));

    const updatedSynced = [...newlySynced, ...synced].slice(0, 100);
    localStorage.setItem(SYNCED_KEY, JSON.stringify(updatedSynced));
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));

    this.notify();
    return { count: newlySynced.length, status: 'SYNCED_SUCCESS' };
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.getPendingCount());
      } catch {}
    });
  }
}

export const offlineOutbox = new OfflineOutbox();
