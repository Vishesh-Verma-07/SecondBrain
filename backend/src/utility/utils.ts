

export function random(len: number){
    let options = "dfjkasljnweoangoanweignoiwehagjnweiahgnelgiawegnwleriahtg";
    let ans = "";
    for(let i = 0; i < len/2; i++){
        ans += options[Math.floor(Math.random() * len)]
    }

    let date = Date.now().toString(36);
    for(let i = 0; i < len/2; i++){
        ans += date[Math.floor(Math.random() * date.length)]
    }

    if(ans.length < len){
        ans = ans.padEnd(len, date[Math.floor(Math.random() * date.length)]);
    }
    return ans;
}

export function getYouTubeEmbedUrl(url: string) {
  let videoId: string | null = null;

  // Case 1: Full watch URL
  const watchMatch = url.match(/v=([^&]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }

  // Case 2: Short youtu.be link
  if (!videoId) {
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) {
      videoId = shortMatch[1];
    }
  }

  // Case 3: Embed URL
  if (!videoId) {
    const embedMatch = url.match(/embed\/([^?]+)/);
    if (embedMatch) {
      videoId = embedMatch[1];
    }
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  } else {
    return null;
  }
}


