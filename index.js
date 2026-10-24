// //part 1
// // 1.
// const fs = require('fs');
// const fileData =fs.createReadStream('./big.txt',{
//     encoding:"utf-8",
//     highWaterMark: 1024 
// });
// fileData.on("data",(chunk )=> {
//     console.log("new chunk received");
//     console.log(chunk);
// })
// fileData.on("end" ,() => {
//     console.log("Finished reading file");
// });
// fileData.on("error",(err) => {
//     console.log(err);
// });


//2.


// const fs = require('fs');
// const fileData =fs.createReadStream('./source.txt',{
//     encoding:"utf-8",
// });
// let fileData2 = fs.createWriteStream('./destination.txt',{
//     encoding:"utf-8"
// });
// fileData.on("data",(chunk )=> {
//     console.log("new chunk received");
//     fileData2.write(chunk);
// })
// fileData.on("end" ,() => {
//     console.log("Finished reading file");
//     fileData2.end();
// });
 
//3.

// const fs = require('fs');
// const zlib = require('zlib');
// const{ pipeline } = require('stream');
// const source = fs.createReadStream('./data.txt');
// const destination = fs.createWriteStream('./data.txt.gz');
// const gzip = zlib.createGzip();
// pipeline(source, gzip, destination, (err) => {
//     if (err) {
//         console.error('Error', err); 
//     } else {
//         console.log('File compressed successfully.');
//     }   
// })



