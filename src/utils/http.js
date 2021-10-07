export const api_address = "http://localhost:5002";
export const client_address = "http://localhost:3000";

export const get = async (endpoint, signal) => {
  return await fetch(api_address + endpoint, {
    method: "GET",
    signal: signal,
  }).then((res) => res.json());
};

export const post = async (endpoint, signal) => {
  return await fetch(api_address + endpoint, {
    method: "POST",
    signal: signal,
  }).then((res) => res.json());
};
