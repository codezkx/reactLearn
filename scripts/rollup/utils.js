import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

const resolve = (filePath) => path.resolve(__dirname, filePath);
// 打包入口文件路径
const pkgPath = resolve('../../packages');
// 打包后的文件路径
const distPath = resolve('../../dist/node_modules');

/**
 * @param pkgName 包名
 * @param isDist 是否打包后路径
 *
 * **/
export function resolvePkgPath(pkgName, isDist) {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}

/**
 * @description 读取哪个目录下的package.json文件
 *
 * @param pkgName 目录名
 *
 **/
export function getPackageJSON(pkgName) {
	// ...包路径
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	// 读取package.json文件
	const str = fs.readFileSync(path, { encoding: 'utf-8' });
	return JSON.parse(str);
}

export function getBaseRollupPlugins({
	alias = { __DEV__: true, preventAssignment: true }, // 开发环境时需要处理的逻辑, 比如: 报错等处理
	typescript = {}
} = {}) {
	return [replace(alias), cjs(), ts(typescript)];
}
