<template>
    <div class="container">
      <div class="form">
        <div class="field">
          <div class="label">Email</div>
          <input v-model="email" type="text" />
        </div>
  
        <div class="field">
          <div class="label">Mật khẩu</div>
          <input v-model="password" type="password" />
        </div>
  
        <div class="field">
          <div class="label">Nhập lại mật khẩu</div>
          <input v-model="confirmPassword" type="password" />
        </div>
  
        <div class="button-group">
          <button @click="signupWithEmailAndPassword">Signup</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { createUserWithEmailAndPassword } from '@firebase/auth';
  import { ref,computed } from 'vue';
  import { useFirebaseAuth } from 'vuefire';
  
  const auth = useFirebaseAuth();
  const email = ref<string>('');
  const password = ref<string>('');
  const confirmPassword = ref<string>('');
  
  const isValidRegister = computed(() => {
    return !(email.value == '' || password.value == '' || confirmPassword.value == '' || password.value != confirmPassword.value);
  })
  
  /**
   * Tạo tài khoản với email và mật khẩu
   */
  const signupWithEmailAndPassword = () => {
    if(isValidRegister.value){
      if(auth != null)
      createUserWithEmailAndPassword(auth,email.value,password.value)
        .then((userCredential) => {
          console.log(userCredential.user);
        }).catch(error => {
          console.log(error);
        })
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .container{
    height: 100vh;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
  
    .form{
      background: rgb(241, 241, 241);
      padding:20px;
      border-radius: 4px;
  
      .field{
        font-size: 14px;
        margin-bottom: 12px;
      }
      .label{
        font-weight: 500;
        margin-bottom: 2px;
      }
  
      input {
        height: 32px;
        outline: none;
        border: 1px solid #333;
        border-radius: 4px;
        text-indent: 10px;
        &:focus,&:hover {
          border-color:teal;
        }
      }
  
      button {
        height: 32px;
        border-radius: 4px;
        outline: none;
        border:1px solid #333;
        border-radius: 4px;
        cursor: pointer;
        background: #fff;
        transition: all .1s linear;
        &:hover {
          border-color: teal;
          color:teal
        }
  
        &:active {
          background-color: teal;
          color: #fff;
        }
      }
    }
  }
  
  </style>