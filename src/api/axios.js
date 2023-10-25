import axios from "axios";
export const getNodes = async (pageParam = 1) => {
  const response = await axios.get(
    `app-api/v1/photo-gallery-feed-page/page/${pageParam}`
  );
  return response.data;
};
