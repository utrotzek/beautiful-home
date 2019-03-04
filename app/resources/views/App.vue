<template>
    <div>
        <Navbar @sidebarToggle="toggleSidebar"></Navbar>
        <div id="wrapper">
            <Sidebar :isToggled="sidebarIsToggled"></Sidebar>

            <div id="content-wrapper">
                <div class="container-fluid">
                    <Breadcrumb></Breadcrumb>
                    <router-view></router-view>
                </div>
            </div>
        </div>

        <LogoutModal></LogoutModal>
        <ScrollToTop></ScrollToTop>
    </div>
</template>

<script>
    import Breadcrumb from '../js/components/Breadcrumb'
    import Navbar from '../js/components/Navbar'
    import LogoutModal from '../js/components/LogoutModal'
    import Sidebar from '../js/components/Sidebar'
    import ScrollToTop from '../js/components/ScrollToTop'

    export default {
        name: 'app',
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
            }
        },
        methods: {
            toggleSidebar() {
                this.sidebarIsToggled = !this.sidebarIsToggled;
            }
        }
    }
</script>