Routie({
   'devtools/:id': id => {
       console.log(id);
   },
    network: () => {
       console.log('network');
    }
});