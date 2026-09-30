import { useSyncExternalStore } from 'react';

type Listener = () => void;

let listeners: Listener[] = [];
let state: Record<string, unknown> = {};

function emitChange() {
  for (const l of listeners) l();
}

function subscribe(listener: Listener) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return state;
}

export function createStore<T extends Record<string, unknown>>(initial: T) {
  state = { ...initial } as Record<string, unknown>;

  function setState(updater: (prev: T) => T) {
    const prev = state as T;
    const next = updater(prev);
    state = { ...next } as Record<string, unknown>;
    emitChange();
  }

  function useStore(): T {
    useSyncExternalStore(subscribe, getSnapshot);
    return state as T;
  }

  return { useStore, setState, getState: () => state as T };
}

export function create<T extends Record<string, unknown>>(initial: () => T) {
  return createStore(initial());
}
