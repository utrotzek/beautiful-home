<template>
    <div>
        <Navbar></Navbar>

        <div id="wrapper">
            <Sidebar></Sidebar>

            <div id="content-wrapper">
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </div>
        </div>

        <Footer></Footer>
        <LogoutModal></LogoutModal>
        <ScrollToTop></ScrollToTop>
    </div>
</template>

<script>
    import Navbar from '../js/components/Navbar'
    import LogoutModal from '../js/components/LogoutModal'
    import Sidebar from '../js/components/Sidebar'
    import Footer from '../js/components/Footer'
    import ScrollToTop from '../js/components/ScrollToTop'

    export default {
        name: 'app',
        components: {
            Navbar,
            LogoutModal,
            Sidebar,
            Footer,
            ScrollToTop
        }
    }
</script>