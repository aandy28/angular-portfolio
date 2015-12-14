function ContactController($anchorScroll, $stateParams, $state, PageService, MetadataService) {
    var vm = this;

    vm.post = {};

    MetadataService.setMetadata({
        title: 'Got something to ask??',
        description: 'Send me a message.'
    });


    PageService.page(4).then(function(post) {
        vm.post = post;

        MetadataService.setMetadata({
            title: post.title,
            description: post.excerpt
        });
    });

}

angular
    .module('app')
    .controller('ContactController', ContactController);