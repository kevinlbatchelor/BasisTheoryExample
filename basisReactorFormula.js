import fetch from 'node-fetch';

const javascript = `
module.exports = async function (req) {
  // 3.15576e+10 is number of milliseconds in a year
  const ages = req.args.map(user => Math.floor((new Date() - new Date(user.date_of_birth).getTime()) / 3.15576e+10));
  const averageAge = ages.reduce((a, b) => a + b) / ages.length;

  return {
    raw: {
      averageAge
    }
  };
};
`;

const url = 'https://api.basistheory.com/reactor-formulas';
const headers = {
    'BT-API-KEY': 'key_LT2H1icWadQywc1niWmD9U',
    'Content-Type': 'application/json'
};
const method = 'POST';
const body = {
    "name": "Average User Reactor",
    "description": "Compute average age of users",
    "type": "private",
    "code": javascript
}

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