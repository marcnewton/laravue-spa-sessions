module.exports = {

    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://192.168.10.10',
                changeOrigin: true,
                secure: false
            },
            '/app/*': {
                target: 'http://192.168.10.10',
                changeOrigin: true,
                secure: false
            },
            '/socket.io': {
                target: 'http://192.168.10.10'
            }
        }
    },

    filenameHashing: true,
    baseUrl: undefined,
    runtimeCompiler: true,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined,
    outputDir: 'public',
    assetsDir: undefined,
    indexPath: process.env.NODE_ENV ? '../resources/views/app.blade.php' : 'index.html'
}
