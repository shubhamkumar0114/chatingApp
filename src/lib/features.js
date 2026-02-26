import moment from "moment";

const fileFormat = (url) => {
  const fileEx = url.split(".").pop();

  if (fileEx === "mp4" || fileEx === "webm" || fileEx === "ogg") {
    return "video";
  }

  if (fileEx === "mp3" || fileEx === "wav") {
    return "audio";
  }

  if (
    fileEx === "png" ||
    fileEx === "jpeg" ||
    fileEx === "gif" ||
    fileEx === "jpg"
  ) {
    return "image";
  }

  return "file";
};

const transFormImage = (url, width = 200) => url;

 const getLast7Days = () => {
  const currDates = moment();

  const last7Days = [];

  for (let i = 0; i < 7; i++) {
   const dayDate = currDates.clone().subtract(i, "days");
   const dayName = dayDate.format("dddd");
    last7Days.unshift(dayName);
  }
  return last7Days;
};

export { fileFormat, transFormImage, getLast7Days };
