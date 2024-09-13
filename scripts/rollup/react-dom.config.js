import generatePackageJson from 'rollup-plugin-generate-package-json';
import alias from '@rollup/plugin-alias';
import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils';

// react-dom目录下 package.json文件转成了对象格式
const { name, module } = getPackageJSON('react-dom');

// react-dom目录 的路径
const pkgPath = resolvePkgPath(name);
// react-dom产物路径(打包后)
const pkgDistPath = resolvePkgPath(name, true);
console.log(pkgDistPath, 'pkgDistPath');
export default [
	// react-dom
	{
		input: `${pkgPath}/${module}`,
		output: [
			{
				file: `${pkgDistPath}/index.js`,
				name: 'index.js',
				format: 'umd'
			},
			// 兼容原版react的导出
			{
				file: `${pkgDistPath}/client.js`,
				name: 'client.js',
				format: 'umd'
			}
		],
		plugins: [
			...getBaseRollupPlugins(),
			alias({
				entries: {
					hostConfig: `${pkgDistPath}/src/hostConfig.ts`
				}
			}),
			// 打包后生成package.json文件
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					peerDependencies: {
						react: version
					},
					// 输出产物文件入口
					main: 'index.js'
				})
			})
		]
	}
];
