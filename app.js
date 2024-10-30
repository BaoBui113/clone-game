const express = require("express");
const cors = require("cors");
const AxiosDigestAuth = require("@mhoc/axios-digest-auth").default;
const querystring = require("querystring");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const digestAuth = new AxiosDigestAuth({
  username: "aXV4htTwC",
  password: "X3dsvSGAkj",
});
const URI = "http://api.plusgalaxy.com";

// Digest Authentication with username & password
async function callApiWithDigestAuth(url, method, params = {}, data = {}) {
  try {
    const response = await digestAuth.request({
      method,
      url: URI + url,
      params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: querystring.stringify(data),
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

// ======== USER ============
app.post("/user/login", async (req, res) => {
  const postData = req.body;
  try {
    const response = await callApiWithDigestAuth(
      "/user/login",
      "POST",
      {},
      { ...postData, host: "plus.plusgalaxy.com" }
    );

    res.json(response);
  } catch (error) {
    console.error("error:", error);
    res.status(500).send("error");
  }
});
app.post("/user/mypage", async (req, res) => {
  const { token, host } = req.body;

  if (token && host) {
    try {
      const response = await callApiWithDigestAuth(
        "/user/mypage",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response user my page",
        token: token,
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json(error.response.data);
    }
  } else {
    res.status(400).json({ message: "Missing token or host" });
  }
});

app.post("/user/mypagePwUpdate", async (req, res) => {
  const { host,old_password,new_password,userip,token } = req.body;

  if (host && old_password && new_password && userip && token) {
    try {
      const response = await callApiWithDigestAuth(
        "/user/mypagePwUpdate",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response mypage update password",
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res.status(400).json({ message: "Missing host | token | userip | old_pass | new_pass" });
  }
});
app.post("/user/mypagePwUpdate", async (req, res) => {
  const { host,old_password,new_password,userip,token } = req.body;

  if (host && old_password && new_password && userip && token) {
    try {
      const response = await callApiWithDigestAuth(
        "/user/mypagePwUpdate",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response mypage update password",
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res.status(400).json({ message: "Missing host | token | userip | old_pass | new_pass" });
  }
});

// ======== CODE ============

app.post("/code/loginMsg", async (req, res) => {
  const { token, host } = req.body;

  if (token) {
    try {
      const response = await callApiWithDigestAuth(
        "/code/loginMsg",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response",
        token: token,
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.json(error.response.data)
    }
  } else {
    res.status(400).json({ message: "Missing token or host" });
  }
});
app.post("/code/getTellEmail", async (req, res) => {
  const { token, host } = req.body;

  if (token && host) {
    try {
      const response = await callApiWithDigestAuth(
        "/code/getTellEmail",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response getTellEmail",
        token: token,
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res.status(400).json({ message: "Missing token or host" });
  }
});
app.post("/code/coupon", async (req, res) => {
  const { token, host, mtype, use_yn } = req.body;

  if (token && host && use_yn && mtype) {
    try {
      const response = await callApiWithDigestAuth(
        "/code/coupon",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response coupon",
        token: token,
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json(error.response.data)

    }
  } else {
    res
      .status(400)
      .json({ message: "Missing token or host or mtype or use_yn" });
  }
});
app.post("/code/sitetype", async (req, res) => {
  const { token, host } = req.body;

  if (token || host) {
    try {
      const response = await callApiWithDigestAuth(
        "/code/sitetype",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response sitetype",
        token: token,
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res.status(400).json({ message: "Missing token or host " });
  }
});
// ======== BBS  ============

app.post("/bbs/mainNoticeBoard", async (req, res) => {
  const { token, host, top, notice_type } = req.body;

  if (token || (host && top && notice_type)) {
    try {
      const response = await callApiWithDigestAuth(
        "/bbs/mainNoticeBoard",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response mainNoticeBoard",
        token: token,
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res
      .status(400)
      .json({ message: "Missing token or host || top || notice_type" });
  }
});
app.post("/bbs/mainNoticeBoardPaging", async (req, res) => {
  const { token, host, notice_type, page, list_block } = req.body;

  if (token || (host && notice_type && page && list_block)) {
    try {
      const response = await callApiWithDigestAuth(
        "/bbs/mainNoticeBoardPaging",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response mainNoticeBoardPaging",
        token: token,
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res.status(400).json({
      message: "Missing token or host || page  || list_block || notice_type",
    });
  }
});
app.post("/bbs/faqSel", async (req, res) => {
  const { token, host, notice_kind, page, list_block } = req.body;

  if (
    token ||
    (host && (notice_kind || notice_kind == "") && page && list_block)
  ) {
    try {
      const response = await callApiWithDigestAuth(
        "/bbs/faqSel",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response faqSel",
        token: token,
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res.status(400).json({
      message: "Missing token or host || page  || list_block || notice_type",
    });
  }
});
app.post("/bbs/noticeSel", async (req, res) => {
  const { seq, host } = req.body;

  if (host && seq) {
    try {
      const response = await callApiWithDigestAuth(
        "/bbs/noticeSel",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response noticeSel",
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res.status(400).json({
      message: "Missing  host or seq  ",
    });
  }
});
// ======== EXCHANGE  ============

app.post("/exchange/withdrawTopList/", async (req, res) => {
  const { token, host, io_type, list_type, top } = req.body;
  if (token || (host && io_type && list_type && top)) {
    try {
      const response = await callApiWithDigestAuth(
        "/exchange/withdrawTopList/",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response withdrawTopList",
        token: token,
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res
      .status(400)
      .json({ message: "Missing host || top || io_type || list_type" });
  }
});

app.post("/exchange/history/", async (req, res) => {
  const { token, host, type } = req.body;
  if (token && type) {
    try {
      const response = await callApiWithDigestAuth(
        "/exchange/history/",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response exchange history",
        token: token,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json(error.response.data)
    }
  } else {
    res.status(400).json({ message: "Missing token or type" });
  }
});

//========= PARTNER ================

app.post("/partner/view/", async (req, res) => {
  const { token, host } = req.body;
  if (token || host) {
    try {
      const response = await callApiWithDigestAuth(
        "/partner/view/",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response partner view",
        token: token,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res.status(400).json({ message: "Missing token or type" });
  }
});
app.post("/partner/inquryproc/", async (req, res) => {
  const { token, host } = req.body;
  if (token || host) {
    try {
      const response = await callApiWithDigestAuth(
        "/partner/inquryproc/",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response register partner ",
        token: token,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res.status(400).json({ message: "Missing token or type" });
  }
});

// ================= GAME ====================

app.post("/game/game_check/", async (req, res) => {
  const { token, game_title, host } = req.body;
  if (token && host && game_title) {
    try {
      const response = await callApiWithDigestAuth(
        "/game/game_check/",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response game check",
        token: token,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json(error.response.data)
    }
  } else {
    res.status(400).json({ message: "Missing token or game_title or host" });
  }
});

app.post("/game/game_start_new/", async (req, res) => {
  const {
    token,
    userip,
    game_title,
    host,
    vendor,
    os,
    game_id,
    width,
    height,
  } = req.body;
  if (
    token &&
    host &&
    userip &&
    game_title &&
    vendor &&
    os &&
    game_id &&
    width &&
    height
  ) {
    try {
      const response = await callApiWithDigestAuth(
        "/game/game_start_new/",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response game start_new",
        token: token,
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res.status(400).json({
      message:
        "Missing token or game_title or host | userip | vendor | os | game_id | width | height",
    });
  }
});
app.post("/game/game_start/", async (req, res) => {
  const { token, userip, game_title, host } = req.body;
  if (token && host && userip && game_title) {
    try {
      const response = await callApiWithDigestAuth(
        "/game/game_start/",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response game start",
        token: token,
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res
      .status(400)
      .json({ message: "Missing token or game_title or host | userip " });
  }
});
app.post("/game/allbet_start/", async (req, res) => {
  const { token, userip, game_title, host } = req.body;
  if (token && host && game_title && userip) {
    try {
      const response = await callApiWithDigestAuth(
        "/game/game_start/",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response game start",
        token: token,
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res
      .status(400)
      .json({ message: "Missing token or game_title or host | userip " });
  }
});
app.post("/game/slot_games_popup/", async (req, res) => {
  const { token, game_title, host, width, height } = req.body;
  if (game_title && width && height && token && host) {
    try {
      const response = await callApiWithDigestAuth(
        "/game/slot_games/",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response game slot_games_popup",
        token: token,
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res.status(400).json({ message: "Missing token or game_title or host " });
  }
});
app.post("/game/mini_start/", async (req, res) => {
  const { token, game_title, host, userip } = req.body;
  if (token && host && game_title && userip) {
    try {
      const response = await callApiWithDigestAuth(
        "/game/game_start/",
        "POST",
        {},
        req.body
      );

      const responseData = {
        message: "API response game mini",
        token: token,
        host: host,
        data: response,
      };

      res.json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error");
    }
  } else {
    res.status(400).json({ message: "Missing token or game_title or host " });
  }
});


app.post("/exchange/deposit/", async (req, res) => {

  try {
    const response = await callApiWithDigestAuth(
      "/exchange/deposit/",
      "POST",
      {},
      req.body
    );


    res.json(response);
  } catch (error) {
    res.status(500).json(error.response.data)
  }

});

app.post("/exchange/depositproc/", async (req, res) => {
  try {
    const response = await callApiWithDigestAuth(
      "/exchange/depositproc/",
      "POST",
      {},
      req.body
    )
    res.json(response);
  } catch (error) {
    res.json(error.response.data)
  }
});

app.post("/exchange/withdraw/", async (req, res) => {
  try {
    const response = await callApiWithDigestAuth(
      "/exchange/withdraw/",
      "POST",
      {},
      req.body
    );
    res.json(response);
  } catch (error) {
    res.json(error.response.data)
  }
});

app.post("/exchange/money_check/", async (req, res) => {
    try{
      const response = await callApiWithDigestAuth(
        "/exchange/money_check/",
        "POST",
        {},
        req.body
      );
      res.json(response);
    } catch (error) {
      console.log(error)
      res.json(error.response.data)
    }
});

app.post("/exchange/checkHasWithdrawAccnt/", async (req, res) => {
 
    try {
      const response = await callApiWithDigestAuth(
        "/exchange/checkHasWithdrawAccnt/",
        "POST",
        {},
        req.body
      );
      res.json(response);
    } catch (error) {
      res.json(error.response.data)
    }
});

app.post("/exchange/withdrawproc/", async (req, res) => {
  try {
    const response = await callApiWithDigestAuth(
      "/exchange/withdrawproc/",
      "POST",
      {},
      req.body
    )
    res.json(response);
  } catch (error) {
    res.json(error.response.data)
  }
});

app.post("/exchange/move/", async (req, res) => {
  try {
    const response = await callApiWithDigestAuth(
      "/exchange/move/",
      "POST",
      {},
      req.body
    )
    res.json(response);
  } catch (error) {
    res.status(error.response.status).json(error.response.data)
    
  }
});

app.post("/exchange/moveproc/", async (req, res) => {
  try {
    const response = await callApiWithDigestAuth(
      "/exchange/moveproc/",
      "POST",
      {},
      req.body
    )
    res.json(response);
  } catch (error) {
    res.json(error.response.data)
  }
});

app.post("/user/idcheck/", async (req, res) => {
  try {
    const response = await callApiWithDigestAuth(
      "/user/idcheck/",
      "POST",
      {},
      req.body
    )
    res.json(response);
  } catch (error) {
    res.status(error.response.status).json(error.response.data)
    
  }
});

app.post("/user/join/", async (req, res) => {
  try {
    const response = await callApiWithDigestAuth(
      "/user/join/",
      "POST",
      {},
      req.body
    )
    res.json(response);
  } catch (error) {
    res.status(error.response.status).json(error.response.data)
    
  }
});

app.post("/user/smsNumSend/", async (req, res) => {
  try {
    const response = await callApiWithDigestAuth(
      "/user/smsNumSend/",
      "POST",
      {},
      req.body
    )
    res.json(response);
  } catch (error) {
    res.status(error.response.status).json(error.response.data)
    
  }
});

app.post("/user/smsNumCheck/", async (req, res) => {
  try {
    const response = await callApiWithDigestAuth(
      "/user/smsNumCheck/",
      "POST",
      {},
      req.body
    )
    res.json(response);
  } catch (error) {
    res.status(error.response.status).json(error.response.data)
    
  }
});

app.post("/user/bankcheck/", async (req, res) => {
  try {
    const response = await callApiWithDigestAuth(
      "/user/bankcheck/",
      "POST",
      {},
      req.body
    )
    res.json(response);
  } catch (error) {
    res.status(200).json(error.response.data)
  }
});

app.post("/user/joininsert/", async (req, res) => {
  try {
    const response = await callApiWithDigestAuth(
      "/user/joininsert/",
      "POST",
      {},
      req.body
    )
    res.json(response);
  } catch (error) {
    res.status(error.response.status).json(error.response.data)
    
  }
});

app.post("/code/sitetype/", async (req, res) => {
  try {
    const response = await callApiWithDigestAuth(
      "/code/sitetype/",
      "POST",
      {},
      req.body
    )
    res.json(response);
  } catch (error) {
    res.status(error.response.status).json(error.response.data)
    
  }
});



app.listen(8080);
