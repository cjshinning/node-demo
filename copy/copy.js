var fs = require('fs');

// 复制文件
// function copyFile(src, dist) {
//     fs.writeFileSync(dist, fs.readFileSync(src));
// }

// copyFile('./a.txt', './aa.txt');

// 复制大型文件
// function copyFile(src, dist) {
//     fs.createReadStream(src).pipe(fs.createWriteStream(dist));
// }

// copyFile('./a.html', './aa.html');

// 复制目录、子目录以及其中的文件
function copyDir(src, dist, callback) {
    fs.access(dist, function(err){
        // 目录不存在时创建目录
        fs.mkdirSync(dist);
    })

    _copy(null, src, dist);

    function _copy(err, src, dist) {
        if(err){
            callback(err);
        }else{
            fs.readdir(src, function(err, paths){
                if(err){
                    callback(err);
                }else{
                    paths.forEach(function(path){
                        var _src = src + '/' + path;
                        var _dist = dist + '/' + path;

                        fs.stat(_src, function(err, stat){
                            if(err){
                                callback(err);
                            }else{
                                if(stat.isFile()){
                                    fs.writeFileSync(_dist, fs.readFileSync(_src));
                                }else if(stat.isDirectory()){
                                    copyDir(_src, _dist, callback);
                                }
                            }
                        })
                    })
                }
            })
        }
    }
}

copyDir('./recharge', './recharge02', function(err){
    if(err){
        console.log(err);
    }
})
