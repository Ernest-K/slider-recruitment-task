const { VITE_API_URL } = import.meta.env;

const getSlidesData = async () => {
  const response = await fetch(`${VITE_API_URL}/api/slides`);

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status}, Status text: ${response.text}`
    );
  }

  const data = await response.json();
  return data;
};

export default getSlidesData;
