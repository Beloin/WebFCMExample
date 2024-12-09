import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
};


console.log("[Firebase] Initializing App")
const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app);
const analytics = getAnalytics(app);
console.log("[Firebase] Initialized")

// onMessage(messaging, (payload) => {
//   console.log("recv: ", payload)
// })

function pFun() { }

async function privateGetToken() {
  const token = await getToken(messaging, { vapidKey: 'BNqkUI7rGrs683dJQCMILk02szjuvgkbJbu_OWZh5xy7v7N6ZaTemB0JvqC2-kGt1skWTeuNBvlLJB1hehULqy4' })
  return token;
}

function defineCallback(cb) {
  console.log("Defined Message callback")
  onMessage(messaging, (payload) => {
    console.log("recv: ", payload.notification.title)
    cb(payload)
  })
}

pFun.prototype.getToken = privateGetToken
pFun.prototype.defineCallback = defineCallback

const fun = new pFun();

export { fun as Fun, app as FbApp, messaging as FbMessaging }
