import generatePackageJson from 'rollup-plugin-generate-package-json';
import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils';

// react目录下 package.json文件转成了对象格式
const { name, module } = getPackageJSON('react');

// react目录 的路径
const pkgPath = resolvePkgPath(name);
// react产物路径(打包后)
const pkgDistPath = resolvePkgPath(name, true);

export default [
	// react
	{
		input: `${pkgPath}/${module}`,
		output: {
			file: `${pkgDistPath}/index.js`,
			name: 'index.js',
			format: 'umd'
		},
		plugins: getBaseRollupPlugins()
	},
	// jsx-runtime
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			// jsx-runtime
			{
				file: `${pkgDistPath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				formate: 'umd'
			},
			// jsx-dev-runtime
			{
				file: `${pkgDistPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
				formate: 'umd'
			}
		],
		plugins: [
			...getBaseRollupPlugins(),
			// 打包后生成package.json文件
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					// 输出产物文件入口
					main: 'index.js'
				})
			})
		]
	}
];
