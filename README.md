# ToWebpack
this is a react webpack

## 支持语法

  react语法

  es6以及更高级语法

## 更新

- 添加支持ts语法的配置    2019-7-25-16:40

## ！！！！

- 通过externals将比较大的包引入可以减少打包体积，但是需要在index.html中使用cdn的方式引入

- https://www.bootcdn.cn/

## 关于ts解析import导入模块是报错

- 这是一个历史性问题，因为之前对于es module的实现没有一个事实标准，然后babel的实现和ts的不一样，一般情况下，如果你写的库是为nodejs 准备的，那么就开启这个，如果是webpack打包的也可以开启它，没有很好方式能解决这个问题，所以写ts的习惯是，import * as xxx from xxx 这样的方式来导模块。
