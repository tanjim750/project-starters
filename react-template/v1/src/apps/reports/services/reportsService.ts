import { apiClient } from "../../../services/api/client";
import { endpoints } from "../../../services/api/endpoints";

export async function getReports() {
  const response = await apiClient.get(endpoints.reports.list);
  return response.data;
}
