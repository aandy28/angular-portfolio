

function HomeController(BlogService, PageService, MetadataService, $scope, $http) {
    var vm = this;
    //console.log("here");
    vm.featuredPosts = [];
    vm.latestPosts = [];
    vm.allPages = [];

    BlogService.allPosts().then(function(posts) {
        vm.featuredPosts = posts;
        console.log(vm.featuredPosts);
        
    });

    BlogService.allLatest().then(function(latest) {
        vm.latestPosts = latest;
        console.log(vm.latestPosts);
        
    });

    PageService.allPages().then(function(pages){
    	vm.allPages = pages;
        console.log(pages);
    });

    PageService.page(2).then(function(about) {
        vm.about = about;
        //console.log(vm.about);

    });

    PageService.page(83).then(function(cv) {
        vm.cv = cv;
        //console.log(vm.about);

    });

    PageService.page(4).then(function(post) {
        vm.post = post;

    });


    // pass an empty object to use the defaults.
    MetadataService.setMetadata({});

    // form stuff

    // create a blank object to hold our form information
        // $scope will allow this to pass between controller and view
        $scope.formData = {};

        // process the form
        $scope.processForm = function () {
            $http({
                method: 'POST',
                url: 'scripts/sending.php',
                data: $.param($scope.formData),  // pass in data as strings
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
                .success(function (data) {
                    //console.log("done");
                    //console.log(data);
                    //console.log(data.success);

                    if (!data.success) {
                        // if not successful, bind errors to error variables
                        //console.log("errors");
                        //console.log(data.errors);
                        
                        $scope.errorName = data.errors.name;
                        $scope.errorSuperhero = data.errors.superheroAlias;
                        $scope.errorContent = data.errors.content;
                        $scope.message = data.message;

                        //console.log($scope.errorName);
                        //console.log($scope.errorSuperhero);
                        //console.log($scope.errorContent);
                    } 
                    else {
                        // if successful, bind success message to message
                        //console.log(data);
                        
                        $scope.message = data.message;

                        //console.log($scope.message);
                    
                    }

                });

        };

}

angular
    .module('app')
    .controller('HomeController', HomeController);
