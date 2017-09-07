import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import favicon from 'serve-favicon';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import Schema from './models/Schema';
import Db from './models/Db'
import Jwt from 'jsonwebtoken';
import Bcrypt from 'bcrypt';

const app = express();

var privateRouter = express.Router();

app.use('/private', privateRouter);

//var Upload = multer();

app.set('superSecret', 'K3J9 8LMN 02F3 B3LW');

privateRouter.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  //console.log(req.headers['x-access-token'])
  var token = req.headers['x-access-token'] ? req.headers['x-access-token'] :
              req.params["x-access-token"] ? req.params["x-access-token"] :
              req.query ? req.query["x-access-token"] :
              req.body ? req.body["x-access-token"] : null;
  // decode token
  //console.log(token)
  if (token) {
    // verifies secret and checks exp
    Jwt.verify(token, app.get('superSecret'), (err, decoded) => {
      if (err) {
        return res.json({ Result: false, Err: 'Falló el token de autenticación' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  }else {
    // if there is no token
    // return an error
    return res.status(403).json({Result: 0, Err: 'No se encontró un token de autenticación válido'});
  }
});

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');


app.use('/static', express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/private/graphql', graphqlExpress({ schema: Schema }));
app.use('/private/graphiql', graphiqlExpress({endpointURL: '/private/graphql'}));


//generate password
app.get('/generatepassword/:Password', (req, res) => {
  Bcrypt.genSalt(10, (Err, Salt) => {
    Bcrypt.hash(req.params.Password, Salt, (Err, Hash) => {
      res.json({Password: Hash});
    });
  });
});

//login get
app.get('/login/:UserName/:Password', (req, res, next) => {
  var Data = (req.params);

  Db.models.User.findOne({where: {UserName: Data.UserName}}).then( R => {
    Bcrypt.compare(Data.Password, R.Password, (Err, Res) => {
      if(Res) {
        Jwt.sign({ User: Data.UserName },
          req.app.get('superSecret'),
          {expiresIn: "365d" /*expires in 365 dias*/},
          (Err, Token) => {
            if(!Err) {
              res.json({ Result: 1, Token: Token});
            }else{
              res.json({ Result: 0, Err: `Error generando token: ${Err}`});
            }
          });
      }else{
        res.json({ Result: 0, Err: "Password Erronea" });
      }
    });

  }).catch(Err => {
    res.json({ Result: 0, Err: `Error consultando ususario: ${Err}` });
  });

});

//login post
app.post('/login/', (req, res, next) => {
  var Data = (req.body);

  Db.models.User.findOne({where: {UserName: Data.UserName}}).then( R => {
    Bcrypt.compare(Data.Password, R.Password, (Err, Res) => {
      if(Res) {
        Jwt.sign({ User: Data.UserName },
          req.app.get('superSecret'),
          {expiresIn: "365d" /*expires in 365 dias*/},
          (Err, Token) => {
            if(!Err) {
              res.json({ Result: 1, Token: Token});
            }else{
              res.json({ Result: 0, Err: `Error generando token: ${Err}`});
            }
          });
      }else{
        res.json({ Result: 0, Err: "Password Erronea" });
      }
    });

  }).catch(Err => {
    res.json({ Result: 0, Err: `Error consultando ususario: ${Err}` });
  });

});

app.get('/', (req, res) => {
  res.render('index', {title: 'Express', message: 'Hello Express!'});
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal server erro");
});

app.listen(3002, () => {
  console.log('Express backend runing at http://127.0.0.1:3002');
});
