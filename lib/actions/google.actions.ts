export const getGooglePLace = () =>
  fetch(
    "/api/google-place?category=restaurant&radius=500&lat=40.712776&lng=-74.005974",
    {
      method: "GET",
    }
  );
