const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('resolved data')
    }, 1500);
    
});


promise.then((data) => {
    console.log(data);
});