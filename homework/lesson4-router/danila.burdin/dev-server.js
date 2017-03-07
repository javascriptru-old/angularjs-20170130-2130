const express	= require('express');
const app		= express();
const fs		= require('fs');
const path		= require('path');

app.set('port', 8080);

app.use('/assets', express.static( 'assets' ));

app.use((req, res) => {
	fs.readFile( path.join( __dirname, 'index.html'), (err, data) => {
		res.end( data )
	})
});

app.listen( app.get('port'), () => {
	console.log('Express server started on http://localhost:%s', app.get('port'));
});
