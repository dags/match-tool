__karma__.loaded = function () { };

System.config({
    packages: {
        'base/dist': {            
            defaultExtension: 'js'
        }        
    }   
    
});

Promise.all([
    System.import('/base/dist/app/services/process/process.service.spec')
]).then(function(){__karma__.start();}).catch(console.error.bind(console));