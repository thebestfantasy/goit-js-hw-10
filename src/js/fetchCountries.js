export default function fetchCountries(name) {
     return fetch(name)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            
            return resp.json();
        });
};