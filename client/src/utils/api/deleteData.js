import { API_DOMAIN } from '../../constants/urls';

const deleteData = async ({ domain = API_DOMAIN, path = '', success, error, signal, credential = true }) => {
    try {
        const resp = await fetch(`${domain}${path}`, {
            method: 'DELETE',
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

export default deleteData;
