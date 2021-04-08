const fs = require("fs-extra");
const path = require("path");
const Parser = require("i18next-scanner").Parser;
const pkg = require("../package.json");
const decomment = require("decomment");
const glob = require("glob");
const lodash = require("lodash");
const xlsx = require("node-xlsx");
const ora = require("ora");
const chalk = require("chalk");

const spinner = ora();

function scan() {
  const i18nParser = new Parser({
    lngs: pkg.locales,
    nsSeparator: false,
    keySeparator: false,
    pluralSeparator: false,
    contextSeparator: false,
  });

  const localeDir = path.join(__dirname, "../locale");
  const xlsxDir = path.join(__dirname, "../locale/xlsx");

  fs.ensureDirSync(xlsxDir); // 确保文件夹存在
  fs.emptyDirSync(xlsxDir); // 清空旧文件

  glob
    .sync(`${path.join(__dirname, "../src")}/**/*.{js,jsx,ts,tsx}`)
    .forEach((file) => {
      const content = fs.readFileSync(file);

      i18nParser.parseFuncFromString(
        decomment.text(content.toString("utf8")), // 去掉文件里的注释
        {
          list: ["__"],
        },
        (key) => {
          if (key) {
            i18nParser.set(key, key);
          }
        }
      );
    });

  const i18nJson = i18nParser.get();
  const destinationFilePath = path.join(xlsxDir, `i18n.xlsx`); // 目标文件路径
  const langConfig = [];

  lodash.each(i18nJson, ({ translation }, key) => {
    const langFile = path.join(localeDir, `${key}.json`);

    const currentLangs = fs.existsSync(langFile)
      ? JSON.parse(fs.readFileSync(langFile))
      : {};
    const newLangs = lodash.pickBy(
      currentLangs,
      (value, key) => key in translation
    );

    lodash.each(translation, (value, key) => {
      if (!(key in newLangs)) {
        newLangs[key] = value;
      }
    });

    fs.outputFile(
      path.join(localeDir, `${key}.json`),
      JSON.stringify(newLangs, "\n", 2)
    );

    langConfig.push({
      lang: key,
      config: newLangs,
    });
  });

  convertJson2Excel(langConfig, destinationFilePath);

  spinner.warn(
    chalk.yellow("你可以将生成的excel文件进行翻译后，放回原处。然后运行：")
  );
}

function reader() {
  const xlsxDir = path.join(__dirname, "../locale/xlsx");
  glob.sync(path.join(xlsxDir, "!(~$)*.xlsx")).forEach(convertExcel2Json);

  spinner.succeed(chalk.green("语言包转换成功！"));
}

function convertJson2Excel(langConfig, destination) {
  const sheets = [
    [`${pkg.name} v${pkg.version}`].concat(langConfig.map(({ lang }) => lang)),
    ["原始文案（禁止修改）"],
    [],
  ];

  lodash.each(langConfig[0].config, (text, key) => {
    sheets.push([key].concat(langConfig.map(({ config }) => config[key])));
  });

  const buffer = xlsx.build([{ name: "i18n_locals", data: sheets }], {
    "!cols": [{ wch: 50 }].concat(
      langConfig.map(() => ({
        wch: 80,
      }))
    ),
  });

  fs.writeFileSync(destination, buffer);

  spinner.succeed(`语言包已输出到 ${chalk.cyan(destination)}`);
}

function requireJson(file) {
  try {
    return require(file);
  } catch (err) {
    return {};
  }
}

function convertExcel2Json(file) {
  const [{ data: sheets }] = xlsx.parse(fs.readFileSync(file));
  const langs = sheets[0].slice(1);
  const localeDir = path.join(__dirname, "../locale");
  langs.forEach((lang, index) => {
    const destination = path.join(localeDir, `${lang}.json`);
    const jsonData = requireJson(destination);

    sheets.slice(2).forEach((item) => {
      if (item.length) {
        jsonData[item[0]] = item[index + 1];
      }
    });

    fs.outputFileSync(destination, JSON.stringify(jsonData, "\n", 2));

    spinner.succeed(
      `输出 ${chalk.bold(chalk.green(lang))} 到 ${chalk.cyan(destination)}`
    );
  });
}

const terminalArg = process.argv[2];

if (terminalArg === "--scan") {
  scan();
} else if (terminalArg === "--read") {
  reader();
}
