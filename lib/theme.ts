"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
export type ThemePreference = Theme | "system";
export const THEME_STORAGE_KEY = "portfolio-theme";

export function getThemePreference(): ThemePreference {
  const preference = document.documentElement.dataset.themePreference;
  return preference === "light" || preference === "dark"
    ? preference
    : "system";
}

export function applyTheme(preference: ThemePreference) {
  const theme =
    preference === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : preference;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute("content", theme === "dark" ? "#14232e" : "#edf2ed");
  });
}

export function setThemePreference(preference: ThemePreference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    /* The control also works when storage is blocked. */
  }
  applyTheme(preference);
}

function subscribe(notify: () => void) {
  const observer = new window.MutationObserver(notify);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "data-theme-preference"],
  });
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (getThemePreference() === "system") applyTheme("system");
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      applyTheme(
        event.newValue === "dark" || event.newValue === "light"
          ? event.newValue
          : "system",
      );
    }
  };
  media.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";
const getServerTheme = (): Theme => "dark";
const getServerPreference = (): ThemePreference => "system";

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, getServerTheme);
}

export function useThemePreference() {
  return useSyncExternalStore(
    subscribe,
    getThemePreference,
    getServerPreference,
  );
}
