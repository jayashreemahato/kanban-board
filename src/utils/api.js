export const fetchData = async () => {
  const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
  export const fetchData = async () => {
  try {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    const data = await response.json();
    console.log(data); // Check if data is fetched correctly
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

};
