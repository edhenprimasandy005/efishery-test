import inquirer from 'inquirer';
import { Command } from 'commander';
const program = new Command();

import pkg from '../wrapper/index.js';
import helper from './utils/helper.js';
import fetch from './fetch.js';
import FormList from './form-inquirer/list.js';

program
  .version('0.0.1')
  .description('esfishery test case')

program.command('getAllData').description('get all data').action(() => {
  pkg.getAllData().then((res) => {
    fetch.fetchData(res).then((datas) => {
      console.log(datas);
    });
  }).catch(e => console.log(w))
})
program.command('getOptionArea').description('get option area').action(() => {
  pkg.getOptionArea().then((res) => {
    fetch.fetchData(res).then((datas) => {
      console.log(datas);
    });
  }).catch(e => console.log(e))
})
program.command('getOptionSize').description('get option size').action(() => {
  pkg.getOptionSize().then((res) => {
    fetch.fetchData(res).then((datas) => {
      console.log(datas);
    });
  }).catch(e => console.log(e))
})
program.command('getById <_id>').description('get data by id').action((_id) => {
  pkg.getById({Id: _id}).then((res) => {
    fetch.fetchData(res).then((datas) => {
      console.log(datas);
    });
  }).catch(e => console.log(e))
})
program.command('getByComodity <_comodity>').description('get data by comodity').action((_comodity) => {
  pkg.getByComodity({comodity: _comodity}).then((res) => {
    fetch.fetchData(res).then((datas) => {
      console.log(datas);
    });
  }).catch(e => console.log(e))
})
program.command('getByArea')
  .option('-p, --province <_province>', 'input parameter area province')
  .option('-c, --city <_city>', 'input parameter area city')
  .description('get data by area')
  .action((opts) => {
    if (Object.keys(opts).length > 0) {
      pkg.getByArea({...opts}).then((res) => {
        fetch.fetchData(res).then((datas) => {
          console.log(datas);
        });
      }).catch(e => console.log(e));
    } else {
      console.error('please input parameter area, for more information use command `-h` or `--help`')
    }
})
program.command('getDataByRange')
  .requiredOption('-gd, --rangeof <_rangeof>', 'input field range `date|size|size`')
  .description('get data by range option `date|size|size`')
  .action((opts) => {
    console.log(opts)
    let form = []
    switch (opts.rangeof) {
      case 'date':
        form = [
          {
            type : 'input',
            name : 'from',
            message : 'Start date (YYYY-MM-DD): ',
            validate: (input) => {
              if (!helper.validateInquirer(input, 'date')) {
                return 'You need to provide a date';
              }
              return true
            }
          },
          {
            type : 'input',
            name : 'to',
            message : 'End date (YYYY-MM-DD): ',
            validate: (input) => {
              if (!helper.validateInquirer(input, 'date')) {
                return 'You need to provide a date';
              }
              return true
            }
          }
        ]
        break;
      case 'size':
        form = [
          {
            type : 'input',
            name : 'from',
            message : 'From: ',
            validate: (input) => {
              if (!helper.validateInquirer(input, 'number')) {
                if (!input) {
                    'Your value can not be empty';
                }
                return 'You need to provide a number';
              }
              return true
            }
          },
          {
            type : 'input',
            name : 'to',
            message : 'To: ',
            validate: (input) => {
              if (!helper.validateInquirer(input, 'number')) {
                return 'You need to provide a number';
              }
              return true
            }
          }
        ]
        break;
      case 'price':
        form = [
          {
            type : 'input',
            name : 'from',
            message : 'From: ',
            validate: (input) => {
              if (!helper.validateInquirer(input, 'number')) {
                if (!input) {
                    'Your value can not be empty';
                }
                return 'You need to provide a number';
              }
              return true
            }
          },
          {
            type : 'input',
            name : 'to',
            message : 'To: ',
            validate: (input) => {
              if (!helper.validateInquirer(input, 'number')) {
                return 'You need to provide a number';
              }
              return true
            }
          }
        ]
        break;
      default:
        break;
    }
    inquirer.prompt(form).then((answers) => {
      pkg.getAllByRange({...answers, rangeof: opts.rangeof}).then((res) => {
        fetch.fetchData(res).then((datas) => {
          console.log(datas);
        });
      }).catch(e => console.log(e));
    });
})

program
  .command('addData')
  .description('Add a data')
  .action(() => {
    inquirer.prompt(FormList).then((answers) => {
      if (isNaN(parseInt(answers.size)) || isNaN(parseInt(answers.price))) {
        console.error('parameter size and price must be number');
        return
      }
      pkg.addData(answers).then((res) => {
        console.log(res);
      }).catch(e => console.log(e));
    });
});
program
  .command('updateData <_id>')
  .description('update a data')
  .action((_id) => {
      pkg.getById({Id: _id}).then(res => {
        if (res.length > 0) {
          const data = res[0];
          const formUpdate = FormList.map((item) => {
            return {
              ...item,
              default: data[item.name],
            }
          })
          inquirer.prompt(formUpdate).then((answers) => {
            console.log(answers);
            if (isNaN(parseInt(answers.size)) || isNaN(parseInt(answers.price))) {
              console.error('parameter size and price must be number');
              return
            }
            const payload ={
              condition: {uuid: data.uuid},
              set: {...answers}
            }
            pkg.updateData(payload).then((res) => {
              console.log(res);
            }).catch(e => console.log(e));
          });
        } else {
          console.warn('data is not found');
        }
      })
});
program.command('deleteDataById <_id>').description('delete data by id').action((_id) => {
  pkg.deleteDataById({Id: _id}).then((res) => {
    console.log(res);
  }).catch(e => console.log(e))
})
program.command('get10Latest').description('get 10 lates data').action(() => {
  pkg.get10Latest().then((res) => {
    fetch.fetchData(res).then((datas) => {
      console.log(datas);
    });
  }).catch(e => console.log(e))
})
// Statistic module
program.command('getMostRecord').description('get most record by comodity').action(() => {
  pkg.getMostRecordByComodity().then((res) => {
    console.log(res);
  }).catch(e => console.log(e))
})
program.command('getMaxPrices').description('get max price by week and comodity').action(() => {
  pkg.getMaxPrice().then((res) => {
    console.log(res);
  }).catch(e => console.log(e))
})

if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv);