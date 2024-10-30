import { useAuth } from "@/libs/provider/auth-provider";
import { GetUserInfo } from "@/libs/repo/auth";
import React, { useEffect, useState } from "react";

const LiveChatScript: React.FC = () => {
  const { user } = useAuth();
  const userInfo = GetUserInfo();
  const [scriptAppended, setScriptAppended] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";

    let userID = "";

    if (!user) {
      const gameAlias = userInfo?.GAME_ALIAS || "";
      const randomNum = Math.floor(Math.random() * 10000) + 1;
      userID = `${gameAlias}손님${randomNum}`;
    } else {
      const gameAlias = userInfo?.GAME_ALIAS || "";
      const memLid = userInfo?.MEM_LID || "";
      userID = `${gameAlias}${memLid}`;
    }
    script.innerHTML = `
            window.__lc = window.__lc || {};
            window.__lc.license = 10702757;
            window.__lc.group = 2;
            window.__lc.chat_between_groups = false;
            window.__lc.visitor = {
                name: '${userID}'
            };
            (function () {
                var lc = document.createElement('script');
                lc.type = 'text/javascript';
                lc.async = true;
                lc.src = (
                    'https:' == document.location.protocol ?
                    'https://' :
                    'http://'
                ) + 'cdn.livechatinc.com/tracking.js';
                var s = document.getElementsByTagName('script')[0];
                s
                    .parentNode
                    .insertBefore(lc, s);
            })();
        `;
    if (!scriptAppended) {
      document?.head?.appendChild(script);
      setScriptAppended(true);
    }

    return () => {
      if (scriptAppended) {
        document?.head?.removeChild(script);
      }
    };
  }, [user, userInfo, scriptAppended]);

  return null;
};

export default LiveChatScript;
