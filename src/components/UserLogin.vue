
<template>

    <h1 class="header">Douglas Skill Tree</h1>
    <div>
      <form>
        <div>
          <label for="userName">User Name</label>
          <input type="text" placeholder="please enter user name" id="userName" v-model="userLoginService.userID"/>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" placeholder="please enter password" id="password" v-model="userLoginService.password"/>
        </div>
        <div>
          <button type="submit" @click="login">Login</button>
        </div>
      </form>
    </div>

</template>

  <script>
  import UserService from "../services/UserService.js"

  export default {
    name: "userLogin",
    data() {
      return {
        userLoginService: { userID: "", password: "" },
        message: ""
      }
    },
    methods: {
      login(event) {
        event.preventDefault();
        UserService.login(this.userLoginService)
          .then(response => {
            let user = response.data;
            console.log(user);
            localStorage.setItem('userId', user.id); // id by h2DB
            let isAdmin = user.admin;
            localStorage.setItem('userName', user.username);
            localStorage.setItem('isAdmin', isAdmin);
            localStorage.setItem('program', JSON.stringify(user.program));
            this.$router.push({ name: "adminHomePage" });
          })
          .catch(err => {
            this.userLoginService.userID = "";
            this.userLoginService.password = "";
            console.log(err);
          })
      }
    },
    mounted() {
      this.message = " ";
    }
  }
  </script>

  <style scoped>
   body {
    background-color: #080710;
  }

  .background {
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 20px; /* Adjusted top position */
  }

  .header {
    text-align: center;
    color: #1a1a1a;
    font-size: 48px;
    margin-bottom: 30px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
    form {
      height: 520px;
      width: 400px;
      background-color: #dfd7d7;
      position: absolute;
      transform: translate(-50%, -50%);
      top: 60%;
      left: 50%;
      border-radius: 10px;
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
      padding: 50px 35px;
    }
    form * {
      font-family: 'Poppins', sans-serif;
      color: #a27e7e;
      letter-spacing: 0.5px;
      outline: none;
      border: none;
      font-size: 18px;
    }
    form h3 {
      font-size: 32px;
      font-weight: 500;
      line-height: 42px;
      text-align: center;
    }
    label {
      display: block;
      margin-top: 30px;
      font-size: 16px;
      font-weight: 500;
    }
    input {
      display: block;
      height: 50px;
      width: 100%;
    background-color: #f0ebe5;
      border-radius: 3px;
      padding: 0 10px;
      margin-top: 8px;
      font-size: 14px;
      color: black;
      font-weight: 300;
    }
    button {
      margin-top: 50px;
      width: 100%;
      background-color: #ffffff;
      color: #080710;
      padding: 15px 0;
      font-size: 18px;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
    }


  </style>
