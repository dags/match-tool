System.config({
    packages: {
        'app': {
            format: 'register',
            defaultExtension: 'js'
        }
    },
    map:{
        moment:'vendor/moment/moment.js'
    }
});

System.import('app/bootstrap').then(null, console.error.bind(console));

