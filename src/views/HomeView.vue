<template>
  <div>
    <h1>Create a New Post</h1>
    <form @submit.prevent="sendEmail">
      <div>
        <label for="title">Email:</label>
        <input id="title" type="text" v-model="emailSend" />
      </div>
      <div>
        <label for="title">Subject:</label>
        <input id="title" type="text" v-model="subject" />
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea id="content" v-model="content"></textarea>
      </div>
      <button type="submit">Create Post</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseApp, token, messaging } from "@/firebase";
import { onMessage } from "@firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

if ("Notification" in window) {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    }
  });
}

onMounted(() => {
  // console.log(token);
  // onMessage(messaging, (payload) => {
  //   console.log(payload);
  // });

  onBackgroundMessage(messaging, (payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
      body: "Background Message body.",
      icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
});

const content = ref<string>("");
const emailSend = ref<string>("");
const subject = ref<string>("");

const sendEmail = async () => {
  const functions = getFunctions(firebaseApp);
  const send = httpsCallable(functions, "sendEmail");

  send({
    email: emailSend.value,
    subject: subject.value,
    content: content.value,
  })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style scoped></style>
