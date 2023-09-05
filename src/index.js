const app = require('./app');

app.listen(app.get('port'), () => {
    console.log("Servirdor en el puerto", app.get("port"));
})