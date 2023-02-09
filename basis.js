import fetch from 'node-fetch';

const javascript = `module.exports = async function (req) {
const socialSecurityNumber = req.args.body.socialSecurityNumber;

const token = await req.bt.tokens.create({
    type: "token",
    data: socialSecurityNumber
});

return {
    headers: req.args.headers,
    body: {
        ...req.args.body,
        socialSecurityNumber: token.id
    }
};
}`;

const url = 'https://api.basistheory.com/proxies';
const headers = {
    'BT-API-KEY': '',
    'Content-Type': 'application/json'
};
const method = 'POST';
const body = {
    'name': 'Inbound Proxy Example',
    'destination_url': 'https://echo.basistheory.com/anything',
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
        const rt = await r.json()
        console.log(rt);
    } catch (e) {
        console.error(e);

    }
};

await addProxy();