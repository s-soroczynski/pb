export const setItemToLocalStorage = (name: string, value: string) => {
  localStorage.setItem(name, value);
};

export const getItemFromLocalStorage = (name: string) => {
  return localStorage.getItem(name);
};

export const fetchHelper = (
  config: { url: string; options?: RequestInit } = { url: "", options: {} }
) => {
  const options = {
    headers: {
      Authorization: `Bearer ${getItemFromLocalStorage("token")}`,
    },
    ...config.options,
  };
  return fetch(config.url, options).then((res) => res.json());
};
