<template>
    <div>
        <!-- Breadcrumbs-->
        <ol class="breadcrumb">
            <li
                    v-for="(breadcrumb, idx) in breadcrumbList"
                    :kex="idx"
                    @click="routeTo(idx)"
                    :class="{
                        'linked': !!breadcrumb.link,
                        'active': idx === (breadcrumbList.length -1)
                    }"
                    class="breadcrumb-item"
            >

                <a v-if="!!breadcrumb.link" href="#">{{ breadcrumb.name }}</a>
                <span v-else>{{ breadcrumb.name }}</span>
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: 'Breadcrumb',
        data () {
            return {
                breadcrumbList: [],
                last: false
            }
        },
        mounted () {
            this.updateList();
            this.last = this.$parent.$children[this.$parent.$children.length - 1] === this;
        },
        watch: { '$route' () { this.updateList() } },
        methods: {
            routeTo (pRouteTo) {
                if (this.breadcrumbList[pRouteTo].link){
                    this.$router.push({path: this.breadcrumbList[pRouteTo].link})
                }
            },
            updateList () {
                this.breadcrumbList = this.$route.meta.breadcrumb
            }
        }

    }
</script>