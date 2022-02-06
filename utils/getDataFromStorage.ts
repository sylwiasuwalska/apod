export const getDataFromStorage = (key: string): string[] => {
  const dataFromStorage = localStorage.getItem(key);
  return dataFromStorage ? JSON.parse(dataFromStorage) : [];
}

export const setDataToStorage = (key: string, value: string[]): void => {
  localStorage.setItem(key, JSON.stringify(value));
}