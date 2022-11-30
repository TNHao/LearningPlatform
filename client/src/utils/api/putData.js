import { API_DOMAIN } from "../../constants/urls";
import toQueryString from "./toQueryString";

const putJson = async ({
  domain = API_DOMAIN,
  path = "",
  query,
  body,
  success,
  error,
  credential = true
}) => {
  try {
    const resp = await fetch(
      `${domain}${path}${query ? `?${toQueryString(query)}` : ""}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: credential
            ? localStorage.getItem("accessToken")
            : undefined
        },
        body: JSON.stringify(body)
      }
    );
    const data = await resp.json();
    success?.(data || {});
    return data || {};
  } catch (ex) {
    error?.(ex);
    return {};
  }
};

export default putJson;
