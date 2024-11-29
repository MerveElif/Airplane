export const fetchUserData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data.slice(0, 10);
  } catch (error) {
    console.error("API'den veri alınırken hata oluştu:", error);
    return [];
  }
};
