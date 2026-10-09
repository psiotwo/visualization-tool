import { SOURCE_OPTIONS } from "@/domain/data-source/constants";

const allowedDataSourceUrls = SOURCE_OPTIONS.map((o) => o.url);

export type DataSourceUrl = string & {};

export const isDataSourceUrlAllowed = (url: string): url is DataSourceUrl => {
  return typeof url === "string" && allowedDataSourceUrls.includes(url);
};
