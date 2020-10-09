let lastTime = 1602198948239;

const howLongAgo = (timeStamp) => {
  let time = Date.now() - timeStamp;
  if (time < 60000) {
    return "Less than one minute ago";
  } else if (time > 60000 && time < 3600000) {
    let minutes = Math.floor(time / 60000);
    return `${minutes} minutes ago`;
  } else if (time > 3600000 && time < 86400000) {
    let hours = Math.floor(time / 3600000);
    return `${hours} hours ago`;
  } else if (time > 86400000 && time < 604800000) {
    let days = Math.floor(time / 86400000);
    return `${days} days ago`;
  } else if (time > 86400000 && time < 604800000) {
    let weeks = Math.floor(time / 86400000);
    return `${weeks} weeks ago`;
  } else {
    let years = Math.floor(time / 604800000);
    return `${years} years ago`;
  }
};
