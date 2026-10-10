import request from '@/utils/request'

export function uploadUrl() {
  let baseURL = "";
  let url = "/api/Index/upload";
  if (process.env.NODE_ENV == "development") {
    baseURL = "/app"
  } else {
    baseURL = process.env.API_ROOT;
  }
  return `${baseURL}${url}`;
}
