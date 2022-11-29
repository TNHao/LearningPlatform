import { API_DOMAIN } from '../../constants/urls';
import toQueryString from './toQueryString';

const postJson = async ({ domain = API_DOMAIN, path = '', query, body, success, error, credential = true }) => {
    try {
        const resp = await fetch(`${domain}${path}${query ? `?${toQueryString(query)}` : ''}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: credential ? store.state.jwt : undefined,
            },
            body: JSON.stringify(body),
        });
        const data = await resp.json();
        success?.(data || {});
        return data || {};
    } catch (ex) {
        error?.(ex);
        return {};
    }
};

export default postJson;
