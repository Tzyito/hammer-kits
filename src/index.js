const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs');
const path = require('path');

// 获取可用的项目模板
function getAvailableTemplates() {
    const templatesDir = path.join(__dirname, 'templates');
    if (!fs.existsSync(templatesDir)) {
        return [];
    }

    return fs.readdirSync(templatesDir)
        .filter(file => fs.statSync(path.join(templatesDir, file)).isDirectory())
        .map(dir => ({
            name: dir,
            value: dir,
            description: getTemplateDescription(dir)
        }));
}

// 获取模板描述
function getTemplateDescription(templateName) {
    const descriptionPath = path.join(__dirname, 'templates', templateName, 'description.txt');
    try {
        return fs.existsSync(descriptionPath)
            ? fs.readFileSync(descriptionPath, 'utf-8').trim()
            : `${templateName} 项目模板`;
    } catch (error) {
        return `${templateName} 项目模板`;
    }
}

async function init() {
    // 显示欢迎信息
    console.log(chalk.cyan('\n🚀 欢迎使用 Hammer Starter\n'));

    // 获取可用模板
    const templates = getAvailableTemplates();

    if (templates.length === 0) {
        console.log(chalk.red('错误：未找到任何可用的项目模板！'));
        console.log(chalk.yellow('请确保 src/templates 目录下存在项目模板。'));
        process.exit(1);
    }

    // 项目名称输入
    const { projectName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: '请输入项目名称:',
            validate: input => {
                if (!input) return '项目名称不能为空';
                if (fs.existsSync(input)) return '该目录已存在';
                return true;
            }
        }
    ]);

    // 选择项目模板
    const { template } = await inquirer.prompt([
        {
            type: 'list',
            name: 'template',
            message: '请选择项目模板:',
            choices: templates
        }
    ]);

    // 开始创建项目
    const spinner = ora('正在创建项目...').start();

    try {
        // 创建项目目录
        fs.mkdirSync(projectName);

        // 复制模板内容
        const templatePath = path.join(__dirname, 'templates', template);
        const projectPath = path.join(process.cwd(), projectName);

        await copyTemplate(templatePath, projectPath);

        spinner.succeed(chalk.green('项目创建成功！'));
        console.log(chalk.cyan('\n🎉 开始你的开发之旅吧！\n'));

        // 显示后续步骤
        console.log(chalk.yellow('接下来的步骤：'));
        console.log(chalk.white(`1. cd ${projectName}`));
        console.log(chalk.white('2. npm install'));
    } catch (error) {
        spinner.fail(chalk.red('项目创建失败'));
        console.error(error);
        process.exit(1);
    }
}

// 复制模板文件
async function copyTemplate(templatePath, targetPath) {
    if (!fs.existsSync(templatePath)) {
        throw new Error(`模板 ${templatePath} 不存在`);
    }

    const files = fs.readdirSync(templatePath);

    for (const file of files) {
        // 跳过 node_modules 文件夹
        if (file === 'node_modules') continue;

        const origFilePath = path.join(templatePath, file);
        const targetFilePath = path.join(targetPath, file);

        if (fs.statSync(origFilePath).isDirectory()) {
            fs.mkdirSync(targetFilePath);
            await copyTemplate(origFilePath, targetFilePath);
        } else {
            fs.copyFileSync(origFilePath, targetFilePath);
        }
    }
}

module.exports = {
    init
};