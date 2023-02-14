import fetch from 'node-fetch';

const javascript = `
module.exports = async function (req) {
    const { bt, args } = req;
    const { body, headers } = args; // access any args provided with the transform request
    const { MY_CONFIG } = req.configuration; // access any static config defined on the Proxy

    return {
        body: {myFlabby:body}, // Proxy request/response body
        headers: headers // Proxy request/response headers
    };
};
`;

const url = 'https://api.basistheory.com/proxies';
const headers = {
    'BT-API-KEY': '',
    'Content-Type': 'application/json'
};
const method = 'POST';
const body = {
    'name': 'Inbound Proxy Example',
    'destination_url': 'https://webhook.site/4201c3a6-abb3-4c66-abc1-534056a24622',
    'request_transform': {
        'code': javascript
    },
    'application': {
        'id': '1a7896cb-2dd3-4ca5-bef8-26fd31dfb1e3'
    },
    'require_auth': false
};

const addProxy = async function () {
    try {
        const r = await fetch(url, { body: JSON.stringify(body), headers, method });
        const rt = await r.json();
        console.log(rt);
    } catch (e) {
        console.error(e);

    }
};

await addProxy();