# airbnb项目

## 1、项目配置

### creco配置webpack

> 使用creco配置webpack时需要修改package.json中的scripts
>
> ````json
>  "scripts": {
>     "start": "react-scripts start",
>     "build": "react-scripts build",
>     "test": "react-scripts test",
>     "eject": "react-scripts eject"
>   },
> // 修改后（必须使用craco启动项目不然在配置文件中的配置不生效）
>  "scripts": {
>     "start": "craco start",
>     "build": "craco build",
>     "test": "cracos test",
>     "eject": "react-scripts eject"
>   },
> ````
>
> 配置creco.config.js
>
> ````js
> const path = require('path');
> const CracoLessPlugin = require('craco-less');
> 
> const resolve = pathname => path.resolve(__dirname, pathname);
> 
> module.exports = {
> 	// less
>     plugins: [
>         {
>             plugins: CracoLessPlugin,
>         },
>     ],
>     // 配置路径别名
>     webpack: {
>         alias: {
>             "@": resolve("src"),
>             "components": resolve("src/components"),
>             "utils": resolve("src/utils"),
>         },
>     },
> };
> 
> ````
>
> 



































> 