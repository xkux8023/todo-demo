module.exports = {
  apps : [{
    name      : 'todo-demo',
    script    : 'server.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : 'xkux8023.cn',
      ref  : 'origin/master',
      repo : 'git@github.com:xkux8023/todo-demo.git',
      path : '/var/www/todo-demo',
      'post-deploy' : 'yarn install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
