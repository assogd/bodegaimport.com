export const getYear = (value) => new Date(value).getFullYear().toString();

export const getMonth = (value) => (new Date(value).getMonth() + 1).toString();

export const getDate = (value) => (new Date(value).getDate() - 1).toString();
