import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { convertToDateFormat } from "./utils/utils";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(2);

  const fetchData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    await axios
      .get(`app-api/v1/photo-gallery-feed-page/page/${index}`)
      .then((res) => res.data)
      .then((data) => {
        setItems((prevItems) => [...prevItems, ...data.nodes]);
        data.nodes.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));
    setIndex((prevIndex) => prevIndex + 1);
    setIsLoading(false);
  }, [index, isLoading]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "app-api/v1/photo-gallery-feed-page/page/1"
        );
        setItems(response.data.nodes);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20 && hasMore) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  return (
    <div>
      {items.map((data, key) => (
        <div className="image-gallery" key={key}>
          <img
            className="image-field"
            src={`${data.node.field_photo_image_section}`}
          />
          <div className="data-field">
            <h3 className="title">{data.node.title}</h3>
            <h4 className="last-update">
              {convertToDateFormat(data.node.last_update)}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
