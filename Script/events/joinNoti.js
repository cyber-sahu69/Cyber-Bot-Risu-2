module.exports.config = {
  name: "joinnoti",
  eventType: ["log:subscribe"],
  version: "1.0.2",
  credits: "Nojrul Modify Shahadat",
  description: "Welcome message with optional image/video",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.onLoad = function () {
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const path = join(__dirname, "Shahadat", "font");
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
};

module.exports.run = async function({ api, event }) {
  const fs = require("fs");
  const path = require("path");
  const { threadID } = event;

  // যদি বট নিজে জয়েন করে
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`${global.config.BOTNAME || "Bot"}`, threadID, api.getCurrentUserID());

    // প্রথম টেক্সট (শুধু টেক্সট)
    api.sendMessage("চ্ঁলে্ঁ এ্ঁসে্ঁছি্ঁ 𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 এঁরঁ ─꯭─⃝‌‌𝐂𝐲𝐛𝐞𝐫 𝐁𝐨𝐭 𝐑𝐢𝐬𝐮 এঁখঁনঁ তোঁমাঁদেঁরঁ সাঁথেঁ আঁড্ডাঁ দিঁবঁ..!", threadID, () => {

      // দ্বিতীয় টেক্সট (টেক্সট + মিডিয়া)
      const mediaPath = path.join(__dirname, "Shahadat", "font", "join.mp4"); // join.jpeg বা অন্য মিডিয়া ব্যবহার করতে পারো

      let messageBody = `╔══════• ✿ •══════╗
   আ্ঁস্ঁসা্ঁলা্ঁমু্ঁ💚আ্ঁলা্ঁই্ঁকু্ঁম্ঁ
╚══════• ✿ •══════╝

𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐬𝐨 𝐦𝐮𝐜𝐡 𝐟𝐨𝐫 𝐚𝐝𝐝𝐢𝐧𝐠 𝐦𝐞 𝐭𝐨 𝐲𝐨𝐮𝐫 𝐢-𝐠𝐫𝐨𝐮𝐩-🖤🤗
𝐈 𝐰𝐢𝐥𝐥 𝐚𝐥𝐰𝐚𝐲𝐬 𝐬𝐞𝐫𝐯𝐞 𝐲𝐨𝐮 𝐢𝐧𝐚𝐡𝐚𝐥𝐥𝐚𝐡 🌺❤️

𝐓𝐨 𝐯𝐢𝐞𝐰 𝐚𝐧𝐲 𝐜𝐨𝐦𝐦𝐚𝐧𝐝:
${global.config.PREFIX}Help
${global.config.PREFIX}Info
${global.config.PREFIX}Admin

★ যেকোনো অভিযোগ অথবা হেল্প এর জন্য এডমিন 𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 কে নক করতে পারেন ★
➤𝐌𝐞𝐬𝐬𝐞𝐧𝐠𝐞𝐫: https://m.me/61575698041722
➤𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩: https://wa.me/8801882333052

⋆✦━━━━━━━━━━━━━━━━━━━━✦⋆
𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫➢ 𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦`;

      if (fs.existsSync(mediaPath)) {
        api.sendMessage({
          body: messageBody,
          attachment: fs.createReadStream(mediaPath)
        }, threadID);
      } else {
        api.sendMessage(messageBody, threadID);
      }
    });

    return;
  }

  // নতুন সদস্য এলে
  try {
    const { createReadStream, readdirSync } = global.nodemodule["fs-extra"];
    let { threadName, participantIDs } = await api.getThreadInfo(threadID);
    const threadData = global.data.threadData.get(parseInt(threadID)) || {};
    let mentions = [], nameArray = [], memLength = [], i = 0;

    for (id in event.logMessageData.addedParticipants) {
      const userName = event.logMessageData.addedParticipants[id].fullName;
      nameArray.push(userName);
      mentions.push({ tag: userName, id });
      memLength.push(participantIDs.length - i++);
    }
    memLength.sort((a, b) => a - b);

    let msg = (typeof threadData.customJoin == "undefined") ? `╔══════• ✿ •══════╗
    আ্ঁস্ঁসা্ঁলা্ঁমু্ঁ💚আ্ঁলা্ঁই্ঁকু্ঁম্ঁ
╚══════• ✿ •══════╝
হাসি, মজা, ঠাট্টায় গড়ে উঠুক  
চিরস্থায়ী বন্ধুত্বের বন্ধন।🥰
ভালোবাসা ও সম্পর্ক থাকুক আজীবন।💝

➤ আশা করি আপনি এখানে হাসি-মজা করে 
আড্ডা দিতে ভালোবাসবেন।😍
➤ সবার সাথে মিলেমিশে থাকবেন।😉
➤ উস্কানিমূলক কথা বা খারাপ ব্যবহার করবেন না।🚫
➤ গ্রুপ এডমিনের কথা শুনবেন ও রুলস মেনে চলবেন।✅

›› প্রিয় {name},  
আপনি এই গ্রুপের {soThanhVien} নম্বর মেম্বার!

›› গ্রুপ: {threadName}

🥀 গ্রুঁপেঁরঁ পঁক্ষঁ থেঁকেঁ আঁপঁনাঁকেঁ স্বাঁগঁতঁমঁ♥

🥰🥀ᏔᎬᏞᏟϴᎷᎬ 🥀🥰 
    ┌────♦️─────┐
      ─꯭─⃝‌‌𝐂𝐲𝐛𝐞𝐫 𝐁𝐨𝐭 𝐑𝐢𝐬𝐮
    └────♦️─────┘

⋆✦━━━━━━━━━━━━━━━━━━━━✦⋆` : threadData.customJoin;

    msg = msg
      .replace(/\{name}/g, nameArray.join(', '))
      .replace(/\{soThanhVien}/g, memLength.join(', '))
      .replace(/\{threadName}/g, threadName);

    const mediaFiles = readdirSync(path.join(__dirname, "Shahadat", "font"));
    const selectedFile = mediaFiles.find(file => file.endsWith(".mp4") || file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg"));
    const mediaAttachment = selectedFile ? createReadStream(path.join(__dirname, "Shahadat", "font", selectedFile)) : null;

    return api.sendMessage(
      mediaAttachment ? { body: msg, attachment: mediaAttachment, mentions } : { body: msg, mentions },
      threadID
    );

  } catch (e) {
    console.error(e);
  }
};

