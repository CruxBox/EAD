const config = {
    app: {
      port: 8000
    },
    db: {
      host: 'localhost',
      port: 27017,
      name: 'recco'
    },
    rateLimit:{
        windowSize:1,
        maxWindowRequest: 10,
        windowlogInterval: 1,
        active: true
    }
   };
   
   module.exports = config;
