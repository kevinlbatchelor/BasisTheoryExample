import fetch from 'node-fetch';
import jq from 'node-jq';

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
        'id': ''
    },
    'require_auth': false
};

const addProxy = function async () {
    try {
        return fetch(url, { body, headers, method }).then((response) => {
            if (!response.ok) {
                return response.json().then((r) => {

                    throw r;
                });
            } else {

                console.log(response);
                return response;
            }
        });
    } catch (e) {
        console.error(e);

    }
};

await addProxy();