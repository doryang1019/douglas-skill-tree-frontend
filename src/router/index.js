import { createWebHistory, createRouter } from "vue-router";

import UserLogin from "../components/UserLogin.vue"
import AdminHP from "@/components/AdminHomepage.vue"
import AdminAdd from "@/components/AdminAddCourse.vue"
import AdminUpdate from "@/components/AdminUpdateCourse.vue"
import AdminDelete from "@/components/AdminDeleteCourse.vue"
import AdminFindCSS from "@/components/AdminFindCourseStudStat.vue"

const routes =[
    {
        path:"/",
        alias:"/login",
        name:"userLogin",
        component: UserLogin
    },
    {
        path:"/admin",
        alias:"/adminHP",
        name:"adminHomePage",
        component: AdminHP
    },
    {
        path:"/admin/add",
        name:"addCourse",
        component: AdminAdd
    },
    {
        path:"/admin/update",
        name:"updateCourse",
        component: AdminUpdate
    },
    {
        path:"/admin/delete",
        name:"deleteCourse",
        component: AdminDelete
    },
    {
        path:"/admin/findCSS",
        name:"findCourseOfStudent",
        component: AdminFindCSS
    },

]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router;
