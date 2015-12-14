/**
 * The BlogService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{allPosts: allPosts, allPostsByTag: allPostsByTag, allPostsBySearchTerm: allPostsBySearchTerm, featuredPosts: featuredPosts, post: post}}
 * @constructor
 */
function PageService($http, $sce, config) {

    function allPages() {
        return getData('pages');
    }


    function page(id) {
        return getData('pages/' + id);
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
        console.log(result);
        result.title = $sce.trustAsHtml(result.title.rendered);
        result.excerpt = $sce.trustAsHtml(result.excerpt.rendered);
        result.date = Date.parse(result.date);
        result.content = $sce.trustAsHtml(result.content.rendered);
        return result;
    }

    return {
        allPages: allPages,
        page: page
    };
}

angular
    .module('app')
    .factory('PageService', PageService);