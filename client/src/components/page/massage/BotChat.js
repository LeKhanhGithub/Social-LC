import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function BotChat({ me, msg, recipient }) {
  const showImage = (url) => (
    <img className="img-thumbnail rounded" src={url} alt="images" />
  );
  const { auth } = useSelector((state) => state);
  const [imagePartner, setImagePartner] = useState("");

  useEffect(() => {
    if (recipient) {
      const partner = recipient.totalUser.filter(
        (member) => member.email !== auth.user.email
      );
      setImagePartner(partner[0].avatar);
    }
  }, [recipient]);

  const showVideo = (url) => (
    <video controls className="img-thumbnail rounded" src={url} alt="videos" />
  );
  return (
    <div className="boxChat">
      {me ? (
        <div className="boxChat_content_end">
          {msg.media.length !== 0 && (
            <div>
              {msg.media.map((img, index) => (
                <div key={index} className="showMedia_chat">
                  {img.url
                    ? img.url.match(/video/i)
                      ? showVideo(img.url)
                      : showImage(img.url)
                    : img.type.match(/video/i)
                    ? showVideo(URL.createObjectURL(img))
                    : showImage(URL.createObjectURL(img))}
                </div>
              ))}
            </div>
          )}
          <p
            className={`${
              msg?.content ? "boxChat_content_txt_send" : "d-none"
            }`}
          >
            {msg?.content}
          </p>
        </div>
      ) : (
        <div className="boxChat_content">
          <img
            className="boxChat_content_img"
            src={imagePartner ? imagePartner : "/assets/person/1.jpeg"}
            alt=""
          />
          <p
            className={`${
              msg?.content ? "boxChat_content_txt_take" : "d-none"
            }`}
          >
            {msg?.content}
          </p>
          {msg.media.map((img, index) => (
            <div key={index} className="showMedia_chat">
              {img.url
                ? img.url.match(/video/i)
                  ? showVideo(img.url)
                  : showImage(img.url)
                : img.type.match(/video/i)
                ? showVideo(URL.createObjectURL(img))
                : showImage(URL.createObjectURL(img))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BotChat;
