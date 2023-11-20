import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

// Settings in Standard Time to get daylight savings time -100 from values

let imageObj = {
  // night
  newsNine: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+News+at+9+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg",
    startTime: "250",
    endTime: "330",
  },
  // night
  newsTen: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+News+at+10+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg",
    startTime: "350",
    endTime: "430",
  },
  // morning
  firstNewsFive: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+First+News+at+5+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg",
    startTime: "1050",
    endTime: "1130",
  },
  // morning
  firstNewsSix: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+First+News+at+6+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg",
    startTime: "1150",
    endTime: "1230",
  },
  // morning
  firstNewsSaturday: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+First+News+Saturday+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg",
    startTime: "1250",
    endTime: "1330",
  },
  // morning
  firstNewsSunday: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+First+News+Sunday+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg",
    startTime: "1250",
    endTime: "1330",
  },
  agWeek: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/AgWeek+TV+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg",
    startTime: "1425",
    endTime: "1440",
  },
  // morning
  hotMic: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/Hot+Mic+-+1920+x+1080+-+Web+Thumbnail.jpg",
    startTime: "1450",
    endTime: "1530",
  },
  // morning
  newsEleven: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+News+at+11+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg",
    startTime: "1650",
    endTime: "1730",
  },
  // Bison Wednesdays
  bisonMediaZone: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/Bison+Media+Zone+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg",
    startTime: "1620",
    endTime: "1640",
  },
  // Bison Saturday
  bisonGameday: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/Bison+Gameday+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg",
    startTime: "1550",
    endTime: "1610",
  },
  // evening
  newsFour: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+News+at+4+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg",
    startTime: "2150",
    endTime: "2230",
  },
  // evening
  newsFive: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+News+at+5+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg",
    startTime: "2250",
    endTime: "2330",
  },
  // evening
  newsFiveThirty: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+News+at+530+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg",
    startTime: "2320",
    endTime: "2345",
  },
  // evening
  newsSix: {
    imageUrl:
      "https://static.forumcomm.com/images/wdayplus-thumbnails/WDAY+News+at+6+-+Web+Thumbnail+-+Landscape+-+1920+x+1080.jpg",
    startTime: "2350",
    endTime: "2430",
  },
};

const getLiveChannels = async (site_id, channel_id) => {
  const response = await axios({
    method: "GET",
    url: `https://api.jwplayer.com/v2/sites/${site_id}/channels/${channel_id}/`,
    headers: {
      accept: "application/json",
      Authorization: process.env.JWPLAYER_SECRET,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            status: error.response.status,
            data: error.response.data,
          },
        };
      } else {
        return "Error", error.message;
      }
    });
  return response;
};

const createThumbnail = async (site_id, media_id, imageUrl) => {
  const response = await axios({
    method: "POST",
    url: `https://api.jwplayer.com/v2/sites/${site_id}/thumbnails/`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: process.env.JWPLAYER_SECRET,
    },
    data: {
      relationships: { media: [{ id: media_id }] },
      upload: {
        method: "fetch",
        thumbnail_type: "static",
        source_type: "custom_upload",
        download_url: imageUrl,
      },
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            status: error.response.status,
            data: error.response.data,
          },
        };
      } else {
        return "Error", error.message;
      }
    });
  return response;
};

const enableThumbnail = async (site_id, thumbnail_id) => {
  const response = axios({
    method: "patch",
    url: `https://api.jwplayer.com/v2/sites/${site_id}/thumbnails/${thumbnail_id}/`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: process.env.JWPLAYER_SECRET,
    },
    data: { relationships: { media: [{ is_poster: true }] } },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            status: error.response.status,
            data: error.response.data,
          },
        };
      } else {
        return "Error", error.message;
      }
    });
  return response;
};

const isDST = (d) => {
  let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
  let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
  return Math.max(jan, jul) !== d.getTimezoneOffset();
};

const dateCalc = () => {
  // sets as GMT in lambda
  const currentDate = new Date();
  let hours = currentDate.getUTCHours();
  let minutes = currentDate.getUTCMinutes();
  if (minutes < 10) {
    minutes = minutes.toString().padStart(2, 0);
  }
  return `${hours}${minutes}`;
};

const isDateInRange = (time, startTime, endTime) => {
  return time > startTime && time < endTime;
};

const getImage = (imageArr) => {
  let time = dateCalc();
  let daylightOffset = 0;
  //if (!isDST) {
  //  daylightOffset = 100;
  //}
  let imageUrl = "";

  const image = Object.keys(imageArr).forEach((event) => {
    if (
      time > imageArr[event].startTime - daylightOffset &&
      time < imageArr[event].endTime - daylightOffset
    ) {
      imageUrl = imageArr[event].imageUrl;
    }
  });
  if (imageUrl === "") {
    imageUrl = imageArr["newsSix"].imageUrl;
  }
  return imageUrl;
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const handler = async (event) => {
  console.log(event);
  if (event === undefined) {
    return {
      status: 401,
      message: "malformed event",
    };
  }
  if (event.channel_id !== "oQI9YDnI") {
    return { message: "not wday event" };
  }
  const channel = await getLiveChannels(event.site_id, event.channel_id);
  if (channel.status !== "active") {
    return { message: "no active wday stream" };
  }
  // need to check for media_id and status = active
  const liveEvent = channel.recent_events[0];
  if (liveEvent.status !== "active") {
    return { message: "no active wday event" };
  }
  // calculate date and get corresponding event
  const image = getImage(imageObj);
  const thumbnail = await createThumbnail(
    event.site_id,
    liveEvent.media_id,
    image
  );
  if (thumbnail.status === "processing") {
    let isIncomplete = true;
    let response;
    while (isIncomplete) {
      await sleep(10000);
      const request = await enableThumbnail(event.site_id, thumbnail.id);
      if (response?.status !== undefined) {
        isIncomplete = false;
        response = request;
      }
    }
    console.log(response);
    return response;
  } else {
    return await enableThumbnail(event.site_id, thumbnail.id);
  }
};
