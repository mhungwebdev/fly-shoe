<template>
  <div class="home-view dis-flex flex-column">
    <div class="form">
      <div class="title font-24 font-weight-600 mb-40 mt-20">Thêm mới user</div>
      <FSTextBox
        v-model="user.FullName"
        class="mb-8"
        :config="{
          label: 'Họ tên',
          labelMode: 'floating',
        }"
      />

      <FSTextBox
        v-model="user.Address"
        class="mb-8"
        :config="{
          label: 'Địa chỉ',
          labelMode: 'floating',
        }"
      />

      <FSDateBox
        class="mb-8"
        v-model="user.Birthday"
        :config="{
          label: 'Ngày sinh',
          labelMode: 'floating',
        }"
      />
    </div>

    <button @click="createUser">Tạo User</button>
    <button class="mt-8" @click="logout">Logout</button>

    <div class="mt-40 dis-flex flex-column align-center">
      <FSTextBox v-model="keyword" :config="{}" />
      <div class="mt-16">
        <div class="mt-8" v-for="user in users">
          {{ user.FullName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FSDateBox, FSTextBox } from "@/components/controls";
import { dbFireStore } from "@/firebase";
import { endAt, query, startAt } from "@firebase/database";
import { addDoc, collection, getDocs, orderBy, Query, where } from "@firebase/firestore";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";

interface IUser {
  FullName: string;
  Address: string;
  Birthday: Date;
}

const auth = useFirebaseAuth();
const $router = useRouter();

const user = ref<IUser>({
  FullName: "",
  Address: "",
  Birthday: new Date(),
});

const keyword = ref<string>("");
const timeDelaySearch = ref<any>(null);

watch(
  () => keyword.value,
  (newValue) => {
    if (timeDelaySearch.value) clearTimeout(timeDelaySearch.value);

    timeDelaySearch.value = setTimeout(async() => {
      const userDocRef:Query = collection(dbFireStore, "Users");
      if(userDocRef){
        const querySearch = query(
          userDocRef,
          orderBy("FullName","desc"),
          startAt(`${newValue}`),
          endAt(`${newValue}` + '\uf8ff')
        );
        const querySnapshot = await getDocs(querySearch);
        users.value = [];
  
        querySnapshot.forEach((doc) => {
          let user = doc.data() as any;
          user.Birthday = new Date(user.Birthday.seconds * 1000);
  
          if (user) users.value = [...users.value, user as IUser];
        });
      }
    }, 500);
  }
);

const logout = () => {
  auth?.signOut().then(() => {
    $router.push("login");
  });
};

const users = ref<Array<IUser>>([]);

onMounted(async () => {
  await getUser();
  // console.log(users.value);
  // console.log(dbFireStore);
});

const getUser = async (): Promise<void> => {
  try {
    const querySnapshot = await getDocs(collection(dbFireStore, "Users"));
    querySnapshot.forEach((doc) => {
      let user = doc.data();
      user.Birthday = new Date(user.Birthday.seconds * 1000);

      if (user) users.value = [...users.value, user as IUser];
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async () => {
  try {
    const docRef = await addDoc(collection(dbFireStore, "Users"), {
      FullName: user.value.FullName,
      Address: user.value.Address,
      Birthday: user.value.Birthday,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
</script>

<style lang="scss" scoped>
button {
  height: 32px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
  background: #fff;
  transition: all 0.1s linear;
  &:hover {
    border-color: teal;
    color: teal;
  }

  &:active {
    background-color: teal;
    color: #fff;
  }
}
</style>
