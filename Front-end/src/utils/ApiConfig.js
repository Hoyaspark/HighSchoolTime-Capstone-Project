import axios from "axios";
import { useState } from "react";
import { tokenData, udata } from "../Apollo";
import Message from "../component/Message";
import { SEM, SERVER_URL } from "./URL";
import react from "react";

export const client = axios.create({
  headers: {
    Authorization: localStorage.getItem("TOKEN"),
  },
});

export const clientset = (axios.defaults.headers.common["Authorization"] =
  localStorage.getItem("TOKEN"));

export const GetMessage = async (props) => {
  const { setmessage, setnullm, pageNum, setabc } = props;
  console.log(pageNum);
  await axios
    .get(SERVER_URL + "/api/v1/messages/received?page=" + pageNum, {
      headers: {
        Authorization: tokenData(),
      },
    })
    .then((res) => {
      console.log("Yes Message");
      setmessage(res);
      setabc(false);
    })
    .catch((err) => {
      console.log("No Message");
      console.log(err);

      setnullm(true);
      setabc(false);
    });
};

export const GetSendMessage = async (props) => {
  const { setsendmessage, setsnullm } = props;

  await axios
    .get(SERVER_URL + "/api/v1/messages/sent", {
      headers: {
        Authorization: tokenData(),
      },
    })
    .then((res) => {
      console.log("Yes sendMessage");
      setsendmessage(res);
    })
    .catch((err) => {
      console.log(err);
      console.log("No Message");
      setsnullm(true);
    });
};

export const PostSendMessage = async (props) => {
  const { content, tempid, settypemodal } = props;
  await axios
    .post(SERVER_URL + "/api/v1/messages", {
      toMemberId: tempid,
      content: content,
    })
    .then((res) => {
      settypemodal("1");
      window.alert("쪽지 전송이 완료되었습니다.");
      console.log("success!!!!!");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const SendMessage = (props) => {
  const { data, email } = props;
  axios
    .post(SERVER_URL + `/message/${email}`, data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetArticle = async (props) => {
  const { setarticle, show } = props;

  await axios
    .get(SERVER_URL + `/api/v1/board/${show}`, {
      headers: {
        Authorization: tokenData(),
      },
    })
    .then((res) => {
      setarticle(res.data.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log("hi");
      console.log(err);
    });
};

export const GetUserInfo = async (props) => {
  const { setloading } = props;
  await axios
    .get(SERVER_URL + "/api/v1/members", {
      headers: {
        Authorization: tokenData(),
      },
    })
    .then((res) => {
      console.log(res);
      udata(res.data.data);
      setloading(true);
    })
    .catch((err) => {
      console.log("hi");
      console.log(err);
    });
};

export const PutUserInfo = (props) => {
  const { nickName, password, seterror } = props;

  axios
    .patch(SERVER_URL + "/api/v1/members", {
      nickName: nickName,
      passWord: password,
    })
    .then((res) => {
      console.log(res);
      seterror(false);
    })
    .catch((err) => {
      console.log(err);
      seterror(true);
    });
};

export const PostCheckEmail = (props) => {
  const { email, setDuplicateEmail } = props;

  const form = new FormData();
  form.append("email", email);

  axios
    .post(SERVER_URL + "/api/v1/auth/join/email", form)
    .then((res) => {
      //success
      setDuplicateEmail(false);
    })
    .catch((err) => {
      //console.log(err);
      setDuplicateEmail(true);
    });
};

export const PostCheckNickname = (props) => {
  const { nickname, setDuplicateNick } = props;

  const form = new FormData();
  form.append("nickname", nickname);

  console.log(nickname);

  axios
    .post(SERVER_URL + "/api/v1/auth/join/nickname", form)
    .then((res) => {
      //success
      console.log(res);
      setDuplicateNick(false);
    })
    .catch((err) => {
      //console.log(err);
      console.log(err);
      setDuplicateNick(true);
    });
};

export const PostRegister = ({ data, setResResult }) => {
  axios
    .post(SERVER_URL + "/api/v1/auth/members", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      //success
      console.log(res);

      setResResult(true);
      localStorage.setItem("TOKEN", `Bearer ${res.data}`);
      tokenData(localStorage.getItem("TOKEN"));
    })
    .catch((err) => {
      //console.log(err);
      setResResult(false);
    });
};

export const GetFriendList = async (props) => {
  const { setFriendList } = props;

  await axios
    .get(SERVER_URL + "/user/friends", {
      headers: {
        Authorization: tokenData(),
      },
    })
    .then((res) => {
      setFriendList(res.data);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetFriendFollowList = async (props) => {
  const { setFriendFollowList } = props;

  await axios
    .get(SERVER_URL + "/user/followers", {
      headers: {
        Authorization: tokenData(),
      },
    })
    .then((res) => {
      setFriendFollowList(res.data);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetDinnerList = async (props) => {
  const { setdinnerlist } = props;

  await axios
    .get("/api/hub/mealServiceDietInfo", {
      params: {
        KEY: "d42c851653dc4a008d9e831aaf3b8a31",
        Type: "json",
        ATPT_OFCDC_SC_CODE: udata() && udata().educationCenter,
        SD_SCHUL_CODE: udata() && udata().schoolnumber,
        pIndex: "1",
        pSize: "1000",
        MLSV_FROM_YMD: "20210607",
        MLSV_TO_YMD: "20210611",
      },
    })
    .then((res) => {
      setdinnerlist(res);
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetTimeList = (props) => {
  const { setschedule } = props;
  axios
    .get("/api/hub/hisTimetable", {
      params: {
        KEY: "d42c851653dc4a008d9e831aaf3b8a31",
        Type: "json",
        AY: "2021", // 년도
        SEM: SEM, //학기
        ATPT_OFCDC_SC_CODE: udata() && udata().educationCenter, // 교육청 코드
        SD_SCHUL_CODE: udata() && udata().schoolnumber, // 학교 이름
        GRADE: udata() && udata().grade, //학년
        CLASS_NM: udata() && udata().classnum, //반
        pIndex: "1",
        pSize: "1000",
        TI_FROM_YMD: "20210607",
        TI_TO_YMD: "20210611",
      },
    })
    .then((res) => {
      setschedule(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetSchoolInfo = async (props) => {
  const { setreg, setschoolcode, schoolname, educationcenter } = props;

  let testmap = new Map();

  testmap.set("서울특별시", "B10");
  testmap.set("부산광역시", "C10");
  testmap.set("대구광역시", "D10");
  testmap.set("인천광역시", "E10");
  testmap.set("광주광역시", "F10");
  testmap.set("대전광역시", "G10");
  testmap.set("울산광역시", "H10");
  testmap.set("세종특별자치시", "I10");
  testmap.set("경기도", "J10");
  testmap.set("강원도", "K10");
  testmap.set("충청북도", "M10");
  testmap.set("충청남도", "N10");
  testmap.set("전라북도", "P10");
  testmap.set("전라남도", "Q10");
  testmap.set("경상북도", "R10");
  testmap.set("경상남도", "S10");
  testmap.set("제주특별자치도", "T10");

  await axios
    .get("/api/hub/schoolInfo", {
      params: {
        KEY: "d42c851653dc4a008d9e831aaf3b8a31",
        Type: "json",
        pIndex: "1",
        pSize: "1000",
        ATPT_OFCDC_SC_CODE: testmap.get(educationcenter),
        SCHUL_NM: schoolname,
      },
    })
    .then((res) => {
      console.log(res);
      setschoolcode(res.data.schoolInfo[1].row[0].SD_SCHUL_CODE);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const GetConfirmEmail = async (props) => {
  const { tokenURL, setSuccess } = props;

  await axios
    .get(SERVER_URL + "/confirm-email", {
      params: {
        token: tokenURL,
      },
    })
    .then((res) => {
      console.log(res);
      setSuccess(true);
    })
    .catch((err) => {
      console.log(err);
      setSuccess(false);
    });
};
