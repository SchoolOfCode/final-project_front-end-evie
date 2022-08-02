//https://api.openchargemap.io/v3/poi?maxresults=1&compact=true&boundingbox=(52.40493%2C%20-1.51230)%2C%20(52.49348%2C%20-2.06584)&key=267df5b8-6a34-4295-970a-3072b912f363
async function Fetch() {
    const response = await fetch('https://api.openchargemap.io/v3/poi?maxresults=1&compact=true&boundingbox=(52.40493%2C%20-1.51230)%2C%20(52.49348%2C%20-2.06584)&key=267df5b8-6a34-4295-970a-3072b912f363');
    // waits until the request completes...
    const data = await response.json();
    console.log(data[0]);
  }
  export default Fetch