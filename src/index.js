import inquirer from 'inquirer';
import { Command } from 'commander';
const program = new Command();

import pkg from '../packages/index.js';

program
  .version('0.0.1')
  .description('esfishery test case')

program.command('getAllData').alias('all').description('get all data').action(() => {
  pkg.getAllData().then((res) => {
    console.log(res);
  }).catch(e => console.log(eval))
})
program.command('getOptionArea').alias('loa').description('get option area').action(() => {
  pkg.getOptionArea().then((res) => {
    console.log(res);
  }).catch(e => console.log(e))
})
program.command('getOptionSize').alias('los').description('get option size').action(() => {
  pkg.getOptionSize().then((res) => {
    console.log(res);
  }).catch(e => console.log(e))
})
program.command('getById <_id>').alias('r').description('get data by id').action((_id) => {
  pkg.getById({Id: _id}).then((res) => {
    console.log(res);
  }).catch(e => console.log(e))
})
program.command('getByComodity <_comodity>').alias('rc').description('get data by comodity').action((_comodity) => {
  pkg.getByComodity({comodity: _comodity}).then((res) => {
    console.log(res);
  }).catch(e => console.log(e))
})
program.command('getByArea')
  .option('-p, --province <_province>', 'input parameter area province')
  .option('-c, --city <_city>', 'input parameter area city')
  .alias('ra')
  .description('get data by area')
  .action((opts) => {
    if (Object.keys(opts).length > 0) {
      pkg.getByArea({...opts}).then((res) => {
        console.log(res);
      }).catch(e => console.log(e));
    } else {
      console.error('please input parameter area, for more information use command `-h` or `--help`')
    }
})
const form = [
  {
    type : 'input',
    name : 'komoditas',
    message : 'Komoditas: ',
  },
  {
    type : 'input',
    name : 'area_provinsi',
    message : 'Provinsi: '
  },
  {
    type : 'input',
    name : 'area_kota',
    message : 'Kota: '
  },
  {
    type : 'number',
    name : 'size',
    message : 'Size (number): '
  },
  {
    type : 'number',
    name : 'price',
    message : 'Price (number): '
  },
];
program
  .command('addData')
  .alias('a')
  .description('Add a data')
  .action(() => {
    inquirer.prompt(form).then((answers) => {
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
  .alias('u')
  .description('update a data')
  .action((_id) => {
      pkg.getById({Id: _id}).then(res => {
        if (res.length > 0) {
          const data = res[0];
          const formUpdate = form.map((item) => {
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
program.command('deleteDataById <_id>').alias('d').description('delete data by id').action((_id) => {
  pkg.deleteDataById({Id: _id}).then((res) => {
    console.log(res);
  }).catch(e => console.log(e))
})

if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv);