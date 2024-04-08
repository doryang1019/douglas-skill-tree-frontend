<template>
    <h1> Add User Page </h1>
    <div>

        <label>User Name</label>
        <input type="text" id="username" v-model="userName" />
        <br>
        <label>Password</label>
        <input type="password" id="password" v-model="password" />
        <br>
        <label>Program Name</label>
        <select v-model="program">
            <option v-for="(programOption) in programOptions" :key="programOption.id" :stream="programOption.stream"
                :value="programOption.id">{{ programOption.description }}</option>
        </select>
        <br>
        <label> is Admin ? </label>
        <select v-model="isAdmin">
            <option>Yes</option>
            <option>No</option>
        </select>
        <br>
        <button @click="addUser">Add User</button>
        <br>
        <p>{{ this.message }}</p>
    </div>
</template>
<script>
import AdminService from '@/services/AdminService';

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
        addUser(event) {
            event.preventDefault();
            console.log(this.userName);
            const admin = this.isAdmin === "Yes" ? true : false;
            AdminService.addUser(this.userName, this.password, admin, this.program)
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
            // Call the API to fetch program options
            AdminService.getAllPrograms()
                .then(response => {
                    this.programOptions = response.data; // Assign fetched program options to programOptions array
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
<style></style>
