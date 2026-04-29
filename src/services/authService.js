import assets from "../mock/assets.json";

// simulate API delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getAssets = async () => {
  await delay(500);
  return assets;
};

export const addAsset = async (newAsset) => {
  await delay(300);
  return { ...newAsset, id: Date.now() };
};