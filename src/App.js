import { useEffect } from "react";
import { useNodes } from "./hooks/useNodes";
import { convertToDateFormat } from "./utils/utils";
import "./App.css";

function App() {
  const { isLoading, isError, error, items, hasNextPage, handleCallback } =
    useNodes();

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      console.log(hasNextPage);
      if (scrollTop + clientHeight >= scrollHeight - 20 && hasNextPage) {
        handleCallback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleCallback]);

  return (
    <div>
      {isLoading && <h4>Please Wait for a moment!!</h4>}
      {isError && <h3 style={{ color: "red" }}>{error?.message}</h3>}
      {!isError &&
        items?.map((data, key) => (
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
