export const getDataFromStorage = (key: string): string[] => {
  let dataFromStorage;
  if (typeof window !== 'undefined') {
    dataFromStorage = localStorage.getItem(key);
  }
  return dataFromStorage ? JSON.parse(dataFromStorage) : [];
}

export const setDataToStorage = (key: string, value: string[]): void => {
  localStorage.setItem(key, JSON.stringify(value));
}