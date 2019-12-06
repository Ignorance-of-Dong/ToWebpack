---
title: 👑Mobx.👑
date: '12/06/2019 15:59:07 AM '
tag: ['js', 'mobx']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: null
---
# 👑Mobx👑

> 简单的，可扩展的状态管理器

## 👀如何使用使用👀

    npm install mobx

    npm install mobx-react

## 👒核心API👒

### 😻observable😻

> 使用

    observable(value)
    @observable classProperty = value

**observable的值可以是js的基本类型，引用类型，普通对象，类实例，数组和映射，匹配类型应用转换规则：**

#### 🐢@observable🐢

    import * as React from 'react'
    import {observer, inject} from 'mobx-react'
    import Stores from "./store";
    @inject('Pubcli')
    @observer
    class IntegerStep extends React.Component<any, any> {
        Stores = Stores
        render() {
            console.log(this.props, 'Stores')
            let { changValue, total } = this.props.Pubcli
            return <>
                <div>{total}</div>

                <button onClick={() => {
                    changValue()
                }}>change</button>

            </>
        }
    }
    export default IntegerStep

--------------------

    import { observable, configure, runInAction, action, computed } from "mobx";


    // configure({ enforceActions: 'always' }) // 强制进行action


    class Pubcli {
        @observable price = 1
        changValue = () => {
            this.price = this.price + 1
        }

        @computed get total() {
            return this.price * 10
        }
    }

    export default new Pubcli()

------------------

#### 🐍规则：🐍

- Map: 会返回一个新的Observerable Map

    observable.map(values, options?)

----------------------------------

**创建一个动态键的observerable映射**

**下列observable映射所暴露的方法是依据Es6 Map规范**

> - has(key) : 返回映射是否有提供键对应的项
> - set(key, value) : 把定键的值设置为value，提供的键如果不存在的话，那么他会被添加到映射中
> - delete(key) : 把给定键和它 的值从映射中删除
> - get(key) : 返回给定键的值（或 undefined）
> - keys() : 返回映射中所有存在的所有键的迭代器，插入顺序会被保留
> - value() : 返回映射中所有存在的所有值的迭代器，插入顺序会被保留
> - entries() : 返回一个（保留插入顺序）的数组迭代器，映射中的每个键值都会对应数组中的一项[key, value]
> - clean() : 移除映射中的所有项
> - size : 返回映射中项的数量

--------------------------

- 数组：会返回一个Observerable Array

---------------------------

- 没有原型的对象： 那么对象会被克隆并且所有属性都会被转成可观察的

---------------------------

- 有原型的对象【javascript原始数据类型或者函数】： 返回一个Boxed Observerable

### 🌳如何对observable做出响应🌳

#### 🌲@computed 计算值🌲

> 计算值是根据现有状态或其他计算值所衍生的值，计算是经过高度优化，因此在计算某些值的时候尽可能的使用它

**计算值如何使用observable第一条以举出了例子**

- getter // 用来获取计算出的结果值
-----

    get total() {
        return this.price * this.amount
    },

- setter // 不能直接改变值，但是可以做逆向衍生
-----

    set total(total) {
        this.price = total / this.amount // 从 total 中推导出 price
    }

#### 🍙autorun // 自定义反应🍙

**适用于打印日志，持久化或更新UI代码，当使用autorun时，所提供的函数总时立即被触发，相比之下，computed创建的函数只有当他有自己的观察者才会计算，否则认为他的值是不相关的**

    disposer = autorun(() => {
        console.log(this.price)
    });

#### 🎨when //自定义反应🎨


**when观察值，当值满足条件的时，就会执行执行第二参数，when需要写在constructor内，否者会被当做原生的when去执行**

    constructor () {
        when(
            () => this.total > 20,
            () => this.init()
        )
    }

    @observable price = 1

    @computed get total() {
        return this.price * 10
    }

    init() {
        console.log(this.count++, '否者')
    }

#### 👹reaction // autorun 的变种👹

**接受两个函数参数，第一个函数是根据可观察函数，数据变化后，返回的一个新值，该值作为第二个函数的参数**

    @observable todos = [
        {
            title: "Make coffee",
            done: true,
        },
        {
            title: "Find biscuit",
            done: false
        }
    ]

    reactions = reaction( // 当被观察的值改变时，执行
        () => this.todos.map(todo => todo.title),
        titles => console.log("reaction oy:", titles.join(", "))
    );

    changValue = () => {
        this.todos = [
            ...this.todos,
            {
                title: "Find biscuit",
                done: false
            }
        ]
        this.price = this.price + 1
    }

#### ⌛@observer // mobx-react⌛

**observer函数或装饰器可以将react组件转换成响应式组件，他用mobx.autorun包装了组件的render函数，以确保任何组件渲染的数据变化时都可以强制刷新组件，observer是单独由mobx-react提供的**

    import {observer, inject} from "mobx-react";
    @inject('Pubcli')
    @observer
    class IntegerStep extends React.Component<any, any> {
        render() {
            console.log(this.props, 'Stores')
            let { changValue, total } = this.props.Pubcli
            return <>
                <div>{total}</div>

                <button onClick={() => {
                    changValue()
                }}>change</button>

            </>
        }
    }
    export default IntegerStep

> 无状态函数组件

    import {observer, inject} from "mobx-react";

    const IntegerStep = inject('Pubcli')(observer((props) => {
        let { changValue, total } = props.Pubcli
        console.log(props)
        return <>
            <div>{total}</div>

            <button onClick={() => {
                changValue()
            }}>change</button>

        </>
    }))
    export default IntegerStep

> 如上我们发现了inject这个函数【是将组件连接到提供的store】

- 使用Provider注入stores

**mobx-react提供了Provider组件，它使用了react的上下文（context）机制，可以用来向下传递stores，要连接到这些stores，需要传递一个stores名称给inject，这使得stores可以做为组件得props使用**

上面有完整得例子🔜⤴

> componentWillReact(生命周期钩子函数)

**改变react组件有多种状态，这样我们很难知道，组件是通过什么改变来进行数据渲染，使用一个新得生命周期函数componentWillReact，当组件因为他观察得数据发生改变时，这时候componentWillReact会被触发，从而找到渲染源**


    import {observer, inject} from "mobx-react";
    @inject('Pubcli')
    @observer
    class IntegerStep extends React.Component<any, any> {

        componentWillReact() {
            console.log("I will re-render, since the todo has changed!");
        }
        render() {
            console.log(this.props, 'Stores')
            let { changValue, total } = this.props.Pubcli
            return <>
                <div>{total}</div>

                <button onClick={() => {
                    changValue()
                }}>change</button>

            </>
        }
    }
    export default IntegerStep

> - componentWillReac不接受任何参数
> - componentWillReact初始化渲染前不会触发

###  🔗改变 observables🔗

#### 📙action (动作)📙

**任何应用都是有动作得，动作是用来修改状态得东西**

> action

    import { observable, action } from 'mobx'

    class States {

        @observable timer = null;
        @observable secend = 0;

        @action 
        add = () => {
            this.secend++
        }
    }

    export default new States()

> action.bound

**action装饰器/函数遵循JavaScript中标准得绑定规则，但是action.bound可以用来自动得将动作绑定到目标对象**

    import { observable, action } from 'mobx'

    class States {

        @observable timer = null;
        @observable secend = 0;

        @action.bound 
        add = () => {
            this.secend++
        }
    }

    export default new States()

> **action.bound不要和箭头函数一起使用；箭头函数已经是绑定过并且不能重复绑定**

> runInAction

**runInAction是个简单得工具函数，他接受代码块并且（异步动作）中执行，这对即时创建和执行动作非常有用**

> runInAction(f) 是 action(f) 的语法糖


    @observable showErrType = true
    @observable money = 230

    runInAction(() => {
        this.showErrType = false
        this.money = 8888
    })

> 当然runInAction配合async await 异步调用，会有更好的体验

> flows

**然而更好的方式是使用flow的内置概念，他们使用生成器，他们的工作原理和async await 一样，他的优点是不需要手动用@action来包装异步代码。这样代码更加简洁**

> flow 只能作为函数使用，不能作为装饰器使用

    class Store {
        @observable githubProjects = []
        @observable state = "pending"

        fetchProjects = flow(function * () { // <- 注意*号，这是生成器函数！
            this.githubProjects = []
            this.state = "pending"
            try {
                const projects = yield fetchGithubProjectsSomehow() // 用 yield 代替 await
                const filteredProjects = somePreprocessing(projects)
                // 异步代码块会被自动包装成动作并修改状态
                this.state = "done"
                this.githubProjects = filteredProjects
            } catch (error) {
                this.state = "error"
            }
        })
    }

### 📢工具函数📢

#### 🌀toJS🌀

**递归的将一个observable对象转换为JavaScript原始数据解构**

    var obj = mobx.observable({
        x: 1
    });

    var clone = mobx.toJS(obj);

#### 


