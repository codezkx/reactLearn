# React 源码

## 项目构建

### Multi-repo 和 Mono-repo

> Multi-repo 每个库有自己独立的仓库, 逻辑清晰, 相对应的列酮管理会更繁琐
> Mono-repo 可以很方便的协同管理不同独立的库的生命周期, 相对应的, 会有更高的操作复杂度

### Mono-repo技术选型

简单工具

- npm: workspace
- yarn: workspace
- pnpm: workspace

专业工具

- nx
- bit
- turborepo
- rush
- lerna

### pnpm 相对其他包管理工具的优势:

- 依赖安装快
- 更规范(处理幽灵依赖问题: 没有显示声明, 但是被安装的依赖)

### 开发规范

#### 安装eslint

> pnpm add -D -w(根目录安装 Mono-repo规范下使用) @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier (prettier的包是为了防止eslint和prettier规范代码冲突, 相当于合并规范了)

.eslintrc.json文件

```json
{
	"env": {
		"browser": true,
		"es2021": true,
		"node": true,
		"jest": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"plugin:prettier/recommended"
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": ["@typescript-eslint", "prettier"],
	"rules": {
		"prettier/prettier": "error",
		"no-case-declarations": "off",
		"no-constant-condition": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-var-requires": "off",
		"no-unused-vars": "off"
	}
}
```

package.json文件

```json
		"lint": "eslint --ext .ts,.jsx,.tsx(包含的文件) --fix(修复代码) --quiet ./packages(哪个目录下)"

```

#### 代码风格 prettier

- 安装

```json
    pnpm add prettier -D -w
```

新建.prettierrc.json文件

```json
{
	"printWidth": 80,
	"tabWidth": 2,
	"useTabbs": true,
	"singleQuote": true,
	"semi": true,
	"trailingComma": "none",
	"bracketSpacing": true
}
```

#### commot 规范检查

安装husky, 用于拦截commit命令

> pnpm add husky -D -w

初始化husky

> npx husky init

将刚才实现的格式化命令 pnpm lint纳入commit时husky将执行的脚本

> npx husky add .husky/pre-commit "pnpm lint(执行脚本)"

或者直接创建pre-commit文件

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint

```

> TODO: pnpm lint 会对代码全量检查, 当项目复杂后执行速度可能比较慢, 届时可以考虑使用lint-staged, 实现支队暂缓区代码践行检查.

通过commitlint对git提交信息进行检查,首先安装必要的库:

> pnpm add -D -w commitlint @commitlint/cli @commitlint/config-conventional

新建配置文件.commitlintrc.js

```js
module.exports = {
	extends: ['@commitlint/config-conventional']
};
```
