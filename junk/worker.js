

importScripts("libs/elm-runtime.js");


//setup process
self.addEventListener('message',
        function(e) {
                console.log( e.data );
                
                x = Elm.worker();
                }
        , false);
                
//horizon change


//percentile change
