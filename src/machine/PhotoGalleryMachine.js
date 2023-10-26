import { assign, createMachine } from "xstate";
export const photoGalleryMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAcAWB7ALug4gQwBsCwAnATwDoD08IBLAOygAIAFDbWAYgnQbAqMAbugDWAtFlyFi5KjXpM2HdLATD0AYzyY6fANoAGALpHjiFKrq6+FkAA9EhgDQgyTgL4fXk7PiKklNS0jCzsUtykJOgkFMgEOgBmMQC2cSr+skEKocoR6gwi2jYMZmZ2yFYldo4IhhQAbA0AHADsACwNAJwAzM0ATK2ths0AjO2u7giDAKyNhguGXQ39DaMzC+1e3iAM6BBwFRkygRVVegw1iAC07c2TN6M9oxTt7V29-TPtPV89y14fMcAnJgoowip4EgQJVYNYLldphQPh9Wh9mjMhp11hM3IhRqN+hR1gtCaNWj0fs0xoCYcCshRwpxmAAZBSQM5w6rQ2r9frNCgzFpdMaEnqtNZdB4ISlzRaGfo9IWGIW9Hq03zSEGUNkhJQAMTwdGIEE58NsPMQzwarxRzWWrXtaPueIQt3axPeavto2aS0MW22QA */
    id: "photoGallery",
    initial: "loading Photos",
    context: {
      photoInfo: [],
      index: 1,
      hasNextPage: true,
      isError: false,
      errorMessage: "",
    },
    states: {
      "loading Photos": {
        invoke: {
          src: "loadPhotoGallery",
          onDone: {
            target: "Photos Loaded",
            actions: "assignPhotostoContext",
          },
          onError: {
            target: "Loading Failed",
            actions: "assignErrorMessage",
          },
        },
      },

      "Photos Loaded": {
        on: {
          LoadMore: "loading Photos",
        },
      },
      "Loading Failed": {},
    },
  },
  {
    actions: {
      assignPhotostoContext: assign((context, event) => {
        return {
          photoInfo: [...context.photoInfo, ...event.data],
          index: context.hasNextPage && context.index + 1,
          hasNextPage: Boolean(event.data.length),
        };
      }),
      assignErrorMessage: assign((context, event) => {
        console.log(event.data);
        return {
          isError: true,
          errorMessage: event.data,
        };
      }),
    },
  }
);
