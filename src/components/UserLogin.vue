<template>
    <div>
        <h1>Login</h1>
        <form>
            <div>
                <label for="userName">UserName:</label>
                <input type="text" id="userName" v-model="userLoginService.userID"/>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="userLoginService.password"/>
            </div>
            <div>
                <button type="submit" @click="login">Login</button>
            </div>

        </form>
        <p>This is a test {{ message }}</p>
    </div>

</template>

<script>
import LoginService from "../services/LoginService.js"

export default{
    name:"userLogin",
    data(){
        return{
            userLoginService:{userID: "", password:""},
            message: ""
        }

    },
    methods:{
        login(event){
            event.preventDefault();
            LoginService.login(this.userLoginService)
                .then( response =>{

                    let user = response.data;
                    console.log(user)


                    localStorage.setItem('uid', user.id) // id by h2DB

                    let isAdmin = user.admin
                    console.log("check the admin " + isAdmin)
                    localStorage.setItem('uName', user.id)

                    // going to admin page
                    if (isAdmin){
                        //this.message = user;
                        this.$router.push({name:"adminHomePage"});
                    }
                    // going to user UI
                    else{
                        //this.message = " Not Admin"
                    }


                }

                )
                .catch(err =>{
                    this.userLoginService.userID = "";
                    this.userLoginService.password  ="";
                    // this.message = err.response.data.message;
                    console.log(err);
                })
        }

    },

    mounted(){
        this.message = " ";

    }


}



</script>

<style>
</style>
