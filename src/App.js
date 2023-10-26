import React, { useEffect } from "react";
import { useMachine } from "@xstate/react";
import axios from "axios";
import { photoGalleryMachine } from "./machine/PhotoGalleryMachine";
import { convertToDateFormat } from "./utils/utils";
import "./App.css";

function StatelyApp() {
  const [state, send] = useMachine(photoGalleryMachine, {
    services: {
      loadPhotoGallery: async () => {
        return await axios
          .get(`app-api/v1/photo-gallery-feed-page/page/${state.context.index}`)
          .then((res) => res.data)
          .then((data) => data.nodes)
          .catch((err) => {
            throw new Error(err);
          });
      },
    },
  });

  const { photoInfo, hasNextPage, isError } = state.context;

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20 && hasNextPage) {
        send("LoadMore");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage]);
  return (
    <div>
      {isError && <h3 style={{ color: "red" }}>Api Call Error</h3>}
      {!isError &&
        photoInfo?.map((data, key) => (
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
export default StatelyApp;
