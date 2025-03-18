#!/usr/bin/env node

const { program } = require('commander');
const { init } = require('../src/index');

program
    .name('hammer-kits')
    .description('一个优雅的项目快速启动工具')
    .version('1.0.0');

program
    .command('init')
    .description('创建了一个项目')
    .action(async () => {
        try {
            await init();
        } catch (error) {
            console.error('初始化失败:', error.message);
            process.exit(1);
        }
    });

program.parse(); 