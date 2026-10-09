import { afterEach, expect, it, vi } from "vitest";

vi.mock("@/utils/maybe-window", () => ({ maybeWindow: () => undefined }));

afterEach(() => vi.unstubAllEnvs());

const prod = "https://cached.lindas.admin.ch/query";
const custom = "http://proxy/sparql";

it.each([
  [undefined, [prod]],
  [["Prod", "Unknown"], [prod]],
  [["Prod", custom], [prod, custom]],
  [[custom], [custom]],
] as const)("resolves sources and allowlist (%j)", async (whitelist, urls) => {
  vi.resetModules();
  vi.stubEnv("WHITELISTED_DATA_SOURCES", whitelist && JSON.stringify(whitelist));
  const { SOURCE_OPTIONS } = await import("./constants");
  const { isDataSourceUrlAllowed } = await import("./urls");
  expect(SOURCE_OPTIONS.map((s) => s.url)).toEqual(urls);
  expect(SOURCE_OPTIONS.map((s) => s.value)).toEqual(urls.map((url) => `sparql+${url}`));
  for (const url of [prod, custom, "http://other/sparql"]) {
    expect(isDataSourceUrlAllowed(url)).toBe(urls.some((allowed) => allowed === url));
  }
});
