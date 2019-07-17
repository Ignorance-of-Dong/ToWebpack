webpack解析es6语法，配饰

需要的loader : babel-loader @babel/core @babel/cli
配置转换的规则： @babel/preset-env

## 说明：

  ###  @babel/core

> 把 js 代码分析成 ast (抽象语法树, 是源代码的抽象语法结构的树状表现形式)，方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，如箭头函数，rest 参数，函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，再通过语法转换器分析其语法后转为低版本 js。

  ### @babel/preset-env

> @babel/preset-env的作用是告诉babel使用哪种转码规则进行文件处理。事实上，babel有几种规则都可以实现对ES6语法的转码，如babel-preset-es2015、babel-preset-latest、@babel/preset-env，不过官方现已建议采用@babel/preset-env


操作： 
    webpack中配置
    {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: path.resolve(process.cwd(), "node_modules")
    },

    在package.json中配置

    "babel": {
      "presets": [
        "@babel/preset-env"
      ]
    }

---------------------------------

webpack 解析css，scss，

需要的loader：css-loader scss-loader
分离css配置： mini-css-extract-plugin 将css分离出来，打包成单独文件

  ### 操作：

  const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css单独打包出来
  const devMode = process.env.NODE_ENV !== 'production';

  {
    test:/\.(sa|sc|c)ss$/,
    // 使用 'style-loader','css-loader'
    use:[
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: process.env.NODE_ENV === 'development',
        },
      },
      'css-loader',
      'sass-loader',
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
			// 与webpackoptions.output中相同选项类似的选项
			// 两个选项都是可选的
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
		}),
  ]

------------------------------------