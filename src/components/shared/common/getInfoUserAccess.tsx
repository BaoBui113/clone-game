
export function getOperatingSystem(userAgent: any) {
  const operatingSystems = [
    { name: "Windows", regex: /Windows/ },
    { name: "Mac OS", regex: /Macintosh/ },
    { name: "Linux", regex: /Linux/ },
    { name: "iOS", regex: /iPhone|iPad|iPod/ },
    { name: "Android", regex: /Android/ },
  ];

  const detectedOS = operatingSystems.find((os) => os.regex.test(userAgent));
  return detectedOS ? detectedOS.name : "Unknown";
}

export function  getBrowserName(userAgent: any) {
  if (userAgent.includes("Firefox")) {
    return "Firefox";
  } else if (userAgent.includes("Chrome")) {
    return "Chrome";
  } else if (userAgent.includes("Safari")) {
    return "Safari";
  } else if (userAgent.includes("Edge")) {
    return "Microsoft Edge";
  } else if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
    return "Internet Explorer";
  } else {
    return "Unknown";
  }
}

export async function getUserIP() {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
}

export async function collectDeviceInfo() {
  const userAgent = navigator.userAgent;


  const os = getOperatingSystem(userAgent);
  const browserName = getBrowserName(userAgent);
  const userIp = await getUserIP();
  const host = typeof window !== "undefined" ? window.location.host : null;
  const device = typeof window !== "undefined" ? navigator.platform : null;

  return {
    os,
    browserName,
    userIp,
    host,
    device,
  };
}
