function ReadLog(stream) {
  this._stream = stream;
}

ReadLog.prototype.read = function(options) {
    
  let output = [];
  let stream = this._stream;
    
  let originalStreamWrite = stream.write;
  stream.write = function(string) {
    output.push(string);
  };
    
  return {
    output: output,
    restore: function() {
      stream.write = originalStreamWrite;
    }
  };
};

exports.stdout = new ReadLog(process.stdout);
exports.stderr = new ReadLog(process.stderr);