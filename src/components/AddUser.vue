<template>
    <div class="container">
        <div class="header">
            <h2 class="title">Add User</h2>
        </div>
        <div class="info">
            <label>User Name</label>
        <input class="searchbar" type="text" id="username" v-model="userName" />
        </div>
        <div class="info">
            <label>Password</label>
        <input class="searchbar" type="password" id="password" v-model="password" />
        </div>
        <div class="info">
            <label>Program Name</label>
            <select class="searchbar" v-model="program">
            <option v-for="(programOption) in programOptions" :key="programOption.id" :stream="programOption.stream"
                :value="programOption.id">{{ programOption.description }}</option>
             </select>
        </div>
        <div class="info">
            <label> is Admin ? </label>
            <select class="searchbar" v-model="isAdmin">
                <option>Yes</option>
                <option>No</option>
            </select>

        </div>
        <div class="button-container">
            <button class="searchbtn" @click="addUser">Add User</button>
            <button class="searchbtn" @click="returnHomePage">Return Home Page</button>
        </div>

        <div v-if="message" class="searchbar-w">
            <h4>User Added!</h4>
        </div>
    </div>
</template>

<script>
import UserService from '@/services/UserService';
import ProgramService from '@/services/ProgramService';
export default {
    name: "addUser",
    data() {
        return {
            userName: "",
            password: "",
            isAdmin: false,
            program: {},
            programOptions: [],
            message: "",
        }
    },
    methods: {
        returnHomePage(event) {
            event.preventDefault();
            this.$router.push({name: "adminHomePage"});
        },
        addUser(event) {
            event.preventDefault();
            console.log(this.userName);
            const admin = this.isAdmin === "Yes" ? true : false;
            UserService.addUser(this.userName, this.password, admin, this.program)
                .then(() => {
                    this.message = "User Added";
                })
                .catch(err => {
                    this.userName = "";
                    this.password = "";
                    this.program = "";
                    this.isAdmin = false;
                    this.message = err;
                })
        },
        getPrograms() {
            ProgramService.getAllPrograms()
                .then(response => {
                    this.programOptions = response.data;
                })
                .catch(error => {
                    console.error("Error fetching program options:", error);
                });
        }
    },
    mounted() {
        this.message = "";
        this.getPrograms();
    }

}
</script>
<style scoped>
@import '../css/message.css';
.container {
    padding: 20px;
    width: 70%;
    align-content: center;
    justify-content: center;
    margin: auto;
}

.header {
    border: 2px solid #000;
    border-radius: 5%;
    padding: 10px;
    text-align: center;
    margin-bottom: 10px;
}

.title {
    font-size: 24px;
    margin-bottom: 10px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

.info {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 20px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

.searchbtn {
    background-color: #d8caaf;
    color: white;
    padding: 15px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: 5px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

.searchbtn:hover {
    background-color: #d3d4cc;
}

.searchbar {
    width: 300px;
    height: 50px;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
    font-size: 16px;
    outline: none;
    margin-bottom: 10px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}
.searchbar-list {
    width: 350px;
    height: 350px;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
    font-size: 16px;
    outline: none;
    margin-bottom: 10px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

.text-f {
    margin-bottom: 20px;
    text-align: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}

.button-container {
    text-align: center;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;

}
</style>

