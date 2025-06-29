module.exports.config = {
  name: "antiout",
  eventType: ["log:unsubscribe"],
  version: "0.0.1",
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "Listen events"
};

module.exports.run = async ({ event, api, Threads, Users }) => {
  let data = (await Threads.getData(event.threadID)).data || {};
  if (!data.antiout) return;

  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;

  const userID = event.logMessageData.leftParticipantFbId;
  const name = global.data.userName.get(userID) || await Users.getNameUser(userID);

  const type = (event.author == userID) ? "self-separation" : "forced-removal";

  if (type === "self-separation") {
    api.addUserToGroup(userID, event.threadID, (error) => {
      if (error) {
        api.sendMessage(
          `সরি বস, ${name} কে আবার এড করতে পারলাম না। 
সম্ভবত উনি বটকে ব্লক করেছে অথবা তার প্রাইভেসি সেটিংসের কারণে এড করা যায় না। 
\n──────꯭─⃝‌‌𝐂𝐲𝐛𝐞𝐫 𝐁𝐨𝐭 𝐑𝐢𝐬𝐮─────`,
          event.threadID
        );
      } else {
        api.sendMessage(
          `শোন, ${name}, এই গ্রুপ হইলো গ্যাং!
এখান থেকে যাইতে হলে এডমিনের পারমিশন লাগে!
তুই পারমিশন ছাড়া লিভ নিছোস – তোকে আবার মাফিয়া স্টাইলে এড দিলাম।
\n──────꯭─⃝‌‌𝐂𝐲𝐛𝐞𝐫 𝐁𝐨𝐭 𝐑𝐢𝐬𝐮─────`,
          event.threadID
        );
      }
    });
  }
};
