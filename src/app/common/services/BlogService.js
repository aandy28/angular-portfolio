/**
 * The BlogService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{allPosts: allPosts, allPostsByTag: allPostsByTag, allPostsBySearchTerm: allPostsBySearchTerm, featuredPosts: featuredPosts, post: post}}
 * @constructor
 */
function BlogService($http, $sce, config) {

    function allPosts() {
        return getData('posts?filter[category_name]=post');
    }

    function allPostsByTag(tag) {
        return getData('posts?filter[category_name]=post&filter[tag]=' + tag);
    }

    function allLatest() {
        return getData('posts?filter[category_name]=curPost');
    }

    function allPostsBySearchTerm(searchTerm) {
        return getData('posts?filter[category_name]=post&filter[s]=' + searchTerm);
    }

    function featuredPosts() {
        return getData('posts?filter[category_name]=post%2Bfeatured');
    }

    function post(id) {
        return getData('posts/' + id);
    }

    function getData(url) {
        return $http
            .get(config.API_URL + url, { cache: true })
            .then(function(response) {
                if (response.data instanceof Array) {
                    var items = response.data.map(function(item) {
                        return decorateResult(item);
                    });
                    return items;
                } else {
                    return decorateResult(response.data);
                }
            });
    }

    /**
     * Decorate a post to make it play nice with AngularJS
     * @param result
     * @returns {*}
     */
    function decorateResult(result) {
        //console.log(result);
        result.title = $sce.trustAsHtml(result.title.rendered);
        result.excerpt = $sce.trustAsHtml(result.excerpt.rendered);
        result.date = Date.parse(result.date);
        //console.log(result);
        result.content = $sce.trustAsHtml(result.content.rendered);
        return result;
    }

    return {
        allPosts: allPosts,
        allPostsByTag: allPostsByTag,
        allLatest: allLatest,
        allPostsBySearchTerm: allPostsBySearchTerm,
        featuredPosts: featuredPosts,
        post: post
    };
}

angular
    .module('app')
    .factory('BlogService', BlogService);