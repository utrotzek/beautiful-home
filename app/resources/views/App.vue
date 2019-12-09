<template>
    <div>
        <Navbar @sidebarToggle="toggleSidebar" />
        <div id="wrapper">
            <Sidebar :is-toggled="sidebarIsToggled" />

            <div
                id="content-wrapper"
                @click="contentClick"
            >
                <div class="container-fluid">
                    <Breadcrumb />
                    <router-view />
                </div>
            </div>
        </div>

        <LogoutModal />
        <ScrollToTop />
    </div>
</template>

<script>
import Breadcrumb from "../js/components/Breadcrumb";
import Navbar from "../js/components/Navbar";
import LogoutModal from "../js/components/LogoutModal";
import Sidebar from "../js/components/Sidebar";
import ScrollToTop from "../js/components/ScrollToTop";

export default {
    name: "App",
    components: {
        Navbar,
        LogoutModal,
        Sidebar,
        ScrollToTop,
        Breadcrumb
    },
    data () {
        return {
            sidebarIsToggled: true
        };
    },
    methods: {
        contentClick() {
            this.sidebarIsToggled = true;
        },
        toggleSidebar() {
            this.sidebarIsToggled = !this.sidebarIsToggled;
        }
    }
};
</script>
