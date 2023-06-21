const store = require('./store');

// 监听store的变化
const unsubscribe = store.subscribe(function(params) {
    console.log('订阅store: ' ,store.getState());
    /* 
        订阅store:  { name: '简自豪', age: 26 }
        订阅store:  { name: '简自豪', age: 22 }
        
        执行unsubscribe()后  只有一条打印结果

        订阅store:  { name: '简自豪', age: 26 }


    */
})

const nameAction = {type: 'change_name', name: '简自豪'};
store.dispatch(nameAction);

// unsubscribe() // 取消订阅  

const ageAction = {type: 'change_age', age: 22};
store.dispatch(ageAction);

