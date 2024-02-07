import { jwtDecode } from "jwt-decode";

export const time = (time: string) => {
  const d = new Date();
  const diff = d.getTimezoneOffset();
  const timezone = diff / -60;
  let hour = time.slice(11, 13);
  let actualHour = parseInt(hour) + timezone;
  let minute = time.slice(14, 16);
  const actualTime = actualHour + ":" + minute;

  return actualTime;
};

export const clock = () => {
  const currentDate = new Date();
  const isoString = currentDate.toISOString();

  return isoString;
};

export const check_jwt = () => {
  const profile_string = localStorage.getItem("profile");
  if (profile_string) {
    const profile = JSON.parse(profile_string);

    if (!profile.token) {
      return false;
    }

    const decodedToken = jwtDecode(profile.token);
    const currentDate = new Date();

    if (decodedToken.exp != undefined) {
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        return false;
      }
    } else {
      return false;
    }

    return true;
  } else {
    return false;
  }
};
