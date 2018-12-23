module.exports = {
    filenameHashing: true,
    baseUrl: undefined,
    runtimeCompiler: true,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined,
    outputDir: 'public',
    assetsDir: undefined,
    indexPath: process.env.NODE_ENV ? '../resources/views/layouts/app.blade.php' : 'index.html'
}
