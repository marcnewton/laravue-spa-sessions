path = require('path');

target = 'http://192.168.10.10';

module.exports = {

    devServer: {
        disableHostCheck: true,
        proxy: {
            '^/api': {
                target: target,
                changeOrigin: true,
                secure: false,
                ws: true
            },
            '^/app': {
                target: target,
                changeOrigin: true,
                secure: false,
                ws: true
            },
            '^/socket.io': {
                target: target
            }
        }
    },

    baseUrl: undefined,
    outputDir: 'public',
    assetsDir: undefined,
    indexPath: process.env.NODE_ENV === 'production' ? '../resources/views/app.blade.php' : 'index.html',
    runtimeCompiler: true,
    filenameHashing: true,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined,

    chainWebpack: config => {

        config.plugins.delete('copy');

    },

    configureWebpack: {
        resolve: {
            alias: {
                '~' : path.resolve(__dirname,'src')
            }
        }
    },

    pwa: {
        name: 'Laravue SPA',
        msTileColor: '#4DBA87'
    }

}
