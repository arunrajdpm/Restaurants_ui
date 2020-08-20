import angular from 'angular';
import axios from 'axios';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor($scope) {
    this.searchBy = 'aa';
    this.orders = []
    this.scope = $scope;
    var self = this;
    axios.get('http://localhost:8080/').then((response) => {
       self.restaurants = response.data;
       $scope.$apply();
    });

    
 
  }

  updateRes(){
    var self = this
    axios.get('http://localhost:8080/' + this.searchBy).then((response) => {
      self.restaurants = response.data;
      self.scope.$apply() 
    });
 }

 addOrder(item, id) {
   item.resId = id;
   this.orders.push(item);
 }

 getPrice() {
   var result = 0
   console.log(this.orders)
   this.orders.forEach(el => result += +el.price)
   return result;
 }

placeOrder(id) {
   var obj = {
    orderId: 1,
    userId: id,
    listOfFood: this.orders
   }

   axios.post('http://localhost:8080/order' , obj).then((response) => {
    
    
  });
   
}

  

  
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;