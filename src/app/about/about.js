function AboutController($anchorScroll, $stateParams, $state, PageService, MetadataService) {
    var vm = this;

    MetadataService.setMetadata({
        title: 'About This Blog',
        description: 'Some des.'
    });

    PageService.page(2).then(function(post) {
        vm.post = post;

        MetadataService.setMetadata({
            title: post.title,
            description: post.excerpt
        });
    });
}

angular
    .module('app')
    .controller('AboutController', AboutController);