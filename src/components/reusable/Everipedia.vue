<template>
    <div id="everipediaArticles">
        <section class="header">
            <img src="static/assets/everipedia_logo.svg" alt="Everipedia" width="24"> Everipedia's Trending Articles
        </section>
        <a href="#" class="single-article">
            <h5>Everipedia article title</h5>
            <p>Some short text pulled from the article. Some short text pulled from the article</p>
        </a>
        <a href="#" class="single-article">
            <h5>Everipedia article title</h5>
            <p>Some short text pulled from the article</p>
        </a>
        <a href="#" class="single-article">
            <h5>Everipedia article title</h5>
            <p>Some short text pulled from the article</p>
        </a>
<!--        {{ everipediaArticles }}-->
<!--        {{ article }}-->
<!--        <h5 v-for="article in everipediaArticles">-->
<!--            {{ article }}-->
<!--            <a :href="'https://everipedia.org/wiki/lang_en/' + article.slug">Read more</a>-->
<!--        </h5>-->
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        data: {
            props: {
                // limit: Number,
            },
            articles: Object,
            everipediaArticles: Object
        },
        computed:{
            everipediaArticles: function () {
                // 1. Get articles -> returns json object with slug
                // 2. I want an object with this structure:
                    // {
                        // slug:'slug-name',
                        // language: 'en'
                        // title: 'Slug Title',
                        // blurb: 'This is a short blurb about the article'
                    // }
                // 3. I will need to run the articles object through the request schema API: https://api.everipedia.org/v2/wiki/schema/lang_en/
                // 4. This returns a huge object with all sorts of data
                // 5. I need to assign the parts of this data that I need to the object defined in 2
                // 6. Then I can iterate over the new object in the template and display the data

                // first let's get the articles
                // axios
                //     .get('https://api.everipedia.org/v2/recent-activity/trending?limit=3')
                //     .then(response => {
                //         this.articles = response.data // returns a json object
                //         this.everipediaArticles{response.data.slug = 'poo' }
                //         // console.log(this.articles)
                //     })
                //     .catch(error => {
                //         console.log(error)
                //         this.errored = true
                //     })
                //     .finally(() => this.loading = false)

                // // take articles and build titles in an array
                // // I have to run them through another axios request because the everipedia API is lame
                // for (article in this.articles){
                //     // this.everipediaArticles = buildURL(this.article.slug)
                //     // console.log(article.slug)
                // }
                // console.log('hi')
                // return this.everipediaArticles = 'hi'
            }
        },
        methods:{
            buildURL: function (slug) {
                // axios
                //     .get('https://api.everipedia.org/v2/wiki/schema/lang_en/' + slug )
                //     .then(response => {
                //         this.articles = response.data // returns a json object
                //         console.log(this.articles)
                //     })

                // return articleTitle
            }
        }
    }

</script>

<style lang="scss" rel="stylesheet/scss">

    @import "../../styles/variables";

    #everipediaArticles {
        text-align: left;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        padding: 2rem;
        height:100%;
        background-color: lighten($blue, 46%);
        border-radius: 0 0 $radius-big 0;
        overflow-y: auto;
        overflow-x: hidden;

        .header {
            display: flex;
            flex-direction: row;
            margin-bottom: 1rem;
            align-items: center;
            font-weight: bold;

            img {
                margin-right:8px;
            }
        }

        .single-article {
            display: flex;
            flex-direction: column;
            margin-bottom: 1rem;
            margin-left:32px;

            h5 {
                white-space: nowrap;
                overflow:hidden;
                text-overflow: ellipsis;
                color:$blue;
            }

            p {
                font-weight: normal;
                white-space: nowrap;
                overflow:hidden;
                text-overflow: ellipsis;
                font-size:$font-size-standard;
                margin:0;
            }
        }
    }

</style>