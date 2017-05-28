angular.module("myModule", ["ng", "ngRoute", "ngAnimate"]).controller("startCtrl", function ($scope, $timeout, $location) {
  $timeout(function () {
    $location.path("/main");
  }, 2500)
}).controller("mainCtrl", function ($scope, $http) {
  var start = 0;
  $http.get("data/dish_listbypage.php?start=0").success(function (data) {
    $scope.dishList = data;
  })
  $scope.add = true;
  $scope.more = function () {//点击加载更多
    start += 5;
    $scope.loading = true;
    $http.get("data/dish_listbypage.php?start=" + start).success(function (data) {
      if (data.length == 0) {
        $scope.add = false;
      } else {
        console.log("还有数据！")
        $scope.dishList = $scope.dishList.concat(data);
      }
      $scope.loading = false;
    })
  }

  $scope.search = true;
  $scope.$watch('kw', function () {//输入框搜索关键字
      if (!$scope.kw) {
        return;
      }
      console.log($scope.kw);
      $http.get("data/dish_listbykw.php?kw=" + $scope.kw).success(function (data) {
        $scope.dishList = data;

        $scope.num = data.length;
        $scope.search = false;
        console.log("返回数据成功");
      })
    }
  )

}).controller("detailCtrl", function ($scope, $http, $routeParams, $location) {
  $http.get("data/dish_listbydid.php?did=" + $routeParams.did).success(function (data) {
    $scope.mydetail = data;
    console.log(data);
  })//完成数据请求
  $scope.again = function () {
    $location.path("/main");
  }//"我再看看"事件跳转完成
  $scope.myorder = function () {
    $location.path("/order/" + $routeParams.did);
  }

}).controller("orderCtrl", function ($scope, $http, $routeParams) {
  $scope.order = {did: $routeParams.did};
  $scope.order.phone=13501234567;
  $scope.allok=false;//未订单前显示
  console.log($scope.order.did);
  $scope.ordered = function () {
    var str = jQuery.param($scope.order);
    $http.post("data/order_add.php", str).success(function (data) {
      //console.log(data);
      console.log(str);
      $scope.allok=true;//确认下单显示
      $scope.okmsg = data;

    })
  }
}).controller("myOrderCtrl", function ($scope,$http) {
  $http.get("data/order_listbyphone.php?phone=13501234567").success(function (data) {
     $scope.myorderdetail=data;
  })

}).config(function ($routeProvider) {
  $routeProvider.when("/start", {
    templateUrl: "tpl/start.html",
    controller: "startCtrl"
  }).when("/main", {
    templateUrl: "tpl/main.html",
    controller: "mainCtrl"
  }).when("/detail/:did", {
    templateUrl: "tpl/detail.html",
    controller: "detailCtrl"
  }).when("/order/:did", {
    templateUrl: "tpl/order.html",
    controller: "orderCtrl"
  }).when("/myOrder", {
    templateUrl: "tpl/myOrder.html",
    controller: "myOrderCtrl"
  }).otherwise({redirectTo: "/start"})
}).run(function ($http) {
  $http.defaults.headers.post = {
    "Content-Type": "application/x-www-form-urlencoded"
  }
})