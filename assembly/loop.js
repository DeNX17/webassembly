const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });

var importObject = {
    wasi_snapshot_preview1: {
        args_sizes_get: () => { },
        args_get: () => { },
        proc_exit: () => { },

    },
    env: {
        abortStackOverflow: () => { throw new Error('overflow'); },
        table: new WebAssembly.Table({ initial: 0, maximum: 0, element: 'anyfunc' }),
        tableBase: 0,
        memory: memory,
        memoryBase: 1024,
        STACKTOP: 0,
        STACK_MAX: memory.buffer.byteLength,
        main: () => { }
    }
};

WebAssembly.instantiateStreaming(fetch('loop.wasm'), importObject)
    .then(obj => {
        const t0 = performance.now();
        console.log(obj.instance.exports.loop())
        const t1 = performance.now();
        console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
    });


// function loop() {
//     const length = 10000
//     let sum = 0
//     for (let i = 1; i <= length; i++) {
//         sum += i
//     }

//     return sum
// }



// const t0 = performance.now();
// console.log(loop())
// const t1 = performance.now();
// console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);

