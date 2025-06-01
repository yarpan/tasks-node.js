const fs = require('fs');
const path = require('path');

const folders = [
  'config',
  'controllers',
  'middleware',
  'models',
  'routes',
  'utils'
];

const files = {
  'config/db.js': '',
  'config/jwt.js': '',

  'controllers/auth.controller.js': '',
  'controllers/user.controller.js': '',
  'controllers/post.controller.js': '',

  'middleware/auth.middleware.js': '',
  'middleware/error.middleware.js': '',

  'models/index.js': '',
  'models/user.model.js': '',
  'models/post.model.js': '',

  'routes/auth.routes.js': '',
  'routes/user.routes.js': '',
  'routes/post.routes.js': '',

  'utils/token.js': '',

  '.env': 'PORT=5000\nDB_HOST=localhost\nDB_PORT=5432\nDB_NAME=blogdb\nDB_USER=postgres\nDB_PASS=password\nJWT_SECRET=your_jwt_secret\nJWT_REFRESH_SECRET=your_refresh_secret\nACCESS_TOKEN_EXPIRY=15m\nREFRESH_TOKEN_EXPIRY=7d',

  'app.js': '',
  'server.js': '',
  'README.md': '# Blog Admin API',
  'package.json': JSON.stringify({
    name: "blog-admin-api",
    version: "1.0.0",
    main: "server.js",
    scripts: {
      start: "node server.js",
      dev: "nodemon server.js"
    },
    dependencies: {},
    devDependencies: {}
  }, null, 2)
};

folders.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log(`✅ Created folder: ${dir}`);
  }
});

Object.entries(files).forEach(([filePath, content]) => {
  fs.writeFileSync(path.join(filePath), content);
  console.log(`📝 Created file: ${filePath}`);
});

console.log('✅ Project structure generated.');
