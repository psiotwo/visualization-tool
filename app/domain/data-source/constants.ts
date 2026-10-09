import keyBy from "lodash/keyBy";

import { WHITELISTED_DATA_SOURCES } from "../env";

export const UNCACHED_PROD_DATA_SOURCE_URL = "https://lindas.admin.ch/query";

export const PROD_DATA_SOURCE_URL = "https://cached.lindas.admin.ch/query";

interface SourceOption {
  value: string;
  key: string;
  label: string;
  url: string;
  isTrusted: boolean;
  supportsCachingPerCubeIri: boolean;
}

const DEFAULT_SOURCE_OPTIONS: SourceOption[] = [
  {
    value: `sparql+${PROD_DATA_SOURCE_URL}`,
    key: "Prod",
    label: "LINDASnext PROD",
    url: PROD_DATA_SOURCE_URL,
    isTrusted: true,
    supportsCachingPerCubeIri: true,
  },
  {
    value: `sparql+${UNCACHED_PROD_DATA_SOURCE_URL}`,
    key: "Prod-uncached",
    label: "LINDASnext PROD (uncached)",
    url: UNCACHED_PROD_DATA_SOURCE_URL,
    isTrusted: true,
    supportsCachingPerCubeIri: true,
  },
  {
    value: "sparql+https://int.cached.lindas.admin.ch/query",
    key: "Int",
    label: "LINDASnext INT",
    url: "https://int.cached.lindas.admin.ch/query",
    isTrusted: false,
    supportsCachingPerCubeIri: true,
  },
  {
    value: "sparql+https://int.lindas.admin.ch/query",
    key: "Int-uncached",
    label: "LINDASnext INT (uncached)",
    url: "https://int.lindas.admin.ch/query",
    isTrusted: false,
    supportsCachingPerCubeIri: true,
  },
  {
    value: "sparql+https://test.cached.lindas.admin.ch/query",
    key: "Test",
    label: "LINDASnext TEST",
    url: "https://test.cached.lindas.admin.ch/query",
    isTrusted: false,
    supportsCachingPerCubeIri: true,
  },
  {
    value: "sparql+https://test.lindas.admin.ch/query",
    key: "Test-uncached",
    label: "LINDASnext TEST (uncached)",
    url: "https://test.lindas.admin.ch/query",
    isTrusted: false,
    supportsCachingPerCubeIri: true,
  },
];

export const SOURCE_OPTIONS: SourceOption[] = [
  ...DEFAULT_SOURCE_OPTIONS.filter((d) => WHITELISTED_DATA_SOURCES.includes(d.key)),
  ...WHITELISTED_DATA_SOURCES.filter((url: string) => /^https?:\/\//.test(url)).map(
    (url: string) => ({
      key: url,
      label: url,
      url,
      value: `sparql+${url}`,
      isTrusted: false,
      supportsCachingPerCubeIri: false,
    })
  ),
];

export const SOURCES_BY_KEY = keyBy(SOURCE_OPTIONS, (d) => d.key);
export const SOURCES_BY_VALUE = keyBy(SOURCE_OPTIONS, (d) => d.value);
export const SOURCES_BY_URL = keyBy(SOURCE_OPTIONS, (d) => d.url);
