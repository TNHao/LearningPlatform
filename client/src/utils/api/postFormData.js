import { API_DOMAIN } from "../../constants/urls";

const toFormData = (object) => {
  const formData = new FormData();
  Object.entries(object).forEach(([key, value]) => formData.append(key, value));
  return formData;
};

const postFormData = async ({
  domain = API_DOMAIN,
  path = "",
  body,
  success,
  error,
  credential = true
}) => {
  try {
    const resp = await fetch(`${domain}${path}`, {
      method: "POST",
      headers: credential
        ? {
            Authorization: localStorage.getItem("accessToken")
          }
        : undefined,
      body: toFormData(body)
    });
    const data = await resp.json();
    success?.(data || {});
    return data || {};
  } catch (ex) {
    error?.(ex);
    return {};
  }
};

export default postFormData;
