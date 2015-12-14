

function HomeController(BlogService, PageService, MetadataService, $scope, $http) {
    var vm = this;
    console.log("here");
    vm.featuredPosts = [];
    vm.allPages = [];

    BlogService.allPosts().then(function(posts) {
        vm.featuredPosts = posts;
        
    });

    PageService.allPages().then(function(pages){
    	vm.allPages = pages;
        
    });

    PageService.page(2).then(function(about) {
        vm.about = about;
        console.log(vm.about);

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
                    console.log(data);

                    if (!data.success) {
                        // if not successful, bind errors to error variables
                        $scope.errorName = data.errors.name;
                        $scope.errorSuperhero = data.errors.superheroAlias;
                    } 
                    else {
                        // if successful, bind success message to message
                        $scope.message = data.message;
                    
                    }
                });

        };

}

angular
    .module('app')
    .controller('HomeController', HomeController);