import { API_DOMAIN } from '../../constants/urls';
import toQueryString from './toQueryString';

const getJson = async ({ domain = API_DOMAIN, path = '', success, error, query, manualQuery = '', signal, credential = true }) => {
    try {
        const resp = await fetch(`${domain}${path}${query ? `?${toQueryString(query)}` : ''}${manualQuery}`, {
            // headers: credential
            //   ? {
            //       Authorization: store.state.jwt,
            //     }
            //   : undefined,
            signal,
        });
        const data = await resp.json();
        success?.(data || {});
        return data || {};
    } catch (ex) {
        error?.(ex);
        return {};
    }
};

export default getJson;
