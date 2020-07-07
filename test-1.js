(function(){
    // Save the original console.log() method
    const log = console.log;

    console.log = function() {
        if(arguments[0] instanceof StringBuilder) {
            log.call(console, arguments[0].toString())
        }else{
            log.apply(console, arguments);
        }
    };

    function StringBuilder(baseString){
        this.baseString = baseString || '.'

        this.pad = function(str){
            this.baseString = str + this.baseString + str;

            return this;
        }

        this.prepend = function (str){
            this.baseString = str + this.baseString;

            return this;
        }

        this.append = function (str){
            this.baseString = this.baseString + str;

            return this;
        }

        this.toString = function() {
            return this.baseString
        }
    }

    const string = new StringBuilder('.');

    string
        .append('^')
        .prepend('^')
        .pad('=');

    document.getElementById('log').innerText = string;

    console.log(string);
})()
