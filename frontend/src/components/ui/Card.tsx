import ShareIcon from "../../icons/Shareicon";
import TweetComponent from "./TweetComponent";

interface CardProps { 
    title: string, 
    link: string, 
    type: "twitter" | "youtube",
}

export function Card({title, link, type} : CardProps){

    return (
        <div
          className={`p-7 bg-white max-w-96 rounded-md shadow-md outline-slate-200 border  border-slate-200 ${
            type === "youtube" ? "row-span-2" : "row-span-3"
          }`}
        >
          <div className="flex justify-between">
            <div className="flex items-center pr-4">
              <div className="text-gray-500">
                <ShareIcon />
              </div>
              {title}
            </div>
            <div className="flex items-center">
              <div className="pr-2 text-gray-500">
                <a href={link}>
                  <ShareIcon />
                </a>
              </div>
              <div className="text-gray-500">
                <ShareIcon />
              </div>
            </div>
          </div>
          <div className="pt-4 ">
            {type == "youtube" && (
              <iframe
                className="w-full  h-40"
                src={link.replace("watch", "embed").replace("?v=", "/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
            {
              type == "twitter" && (
                <div className="w-full pl-0.5 pr-0.5">
                  <TweetComponent
                    tweetId={link.replace("https://twitter.com/user/status/", "")}
                  />

                </div>
              )

              // <TweetComponent tweetId="1875218603966136424"/>
            }
          </div>
      </div>
    );


    
}