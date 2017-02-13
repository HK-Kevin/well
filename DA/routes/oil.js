let express = require('express');
let mongoose = require('mongoose');//引入数据库
let User = require('../model').User;
let Program = require('../model').Program;
//创建一个路由中间件   是一个容器  下面可以放置很多路由规则
let route = express.Router();
route.get('/oil/:_id', function (req, res) {
    let _id = req.params._id;
    let wellName = [];//井名,井数
    let allOil = null;//累产油
    let allWater = null;//累产水
    let oilLay = [];//层位
    let allDay = [];//总共生产时间
    let oilM;//平均月产油
    let waterM;//平均月产水
    let oilDate = [];//年月
    let yearAllOil = [];//年产油
    let yearAllWater = [];//年产水
    let yearWaterCut = [];//年含水
    let yearDate = [];//年生产天数
    let programFile = '';
    let data =[];
    //_id:_id
    Program.findOne({_id:_id}, function (err, result) {

         data = JSON.parse(result['programFile']);
        console.log(result['programFile']);
        //获取所有的井名
        for (let i = 0; i <= data.length - 1; i++) {
            wellName.push(data[i]["井号"]);
            oilLay.push(data[i]["层位"]);
            oilDate.push((data[i]["年月"]).slice(0, 4));
            allDay.push(data[i]["累生产天数"]);
            allOil += Number(data[i]["月产油量"]);
            allWater += Number(data[i]["月产水量"]);
        }
        //去重转数组
        wellName = new Set(wellName);
        wellName = Array.from(wellName);
        oilLay = new Set(oilLay);
        oilLay = Array.from(oilLay);
        oilDate = new Set(oilDate);
        oilDate = Array.from(oilDate);
        var yearData = [];
        oilDate.forEach(function (item) {
            yearData[item] = [];
            yearAllOil[item] = [];
            yearAllWater[item] = [];
            yearWaterCut[item] = [];
            yearDate[item] = [];
            for (var i = 0; i < data.length; i++) {
                var re = eval("/" + item + "/gim");
                if (re.test(data[i]['年月'])) {
                    yearData[item].push(data[i]);
                    yearAllOil[item].push(data[i]['月产油量']);
                    yearAllWater[item].push(data[i]['月产水量']);
                    yearWaterCut[item].push(data[i]['含水']);
                    yearDate[item].push(data[i]['累生产天数']);
                }
            }

        });

        //取最大值
        allDay.sort((a, b)=>a - b);
        allDay = allDay.pop();
        oilM = (allOil / data.length).toFixed(2);
        waterM = (allWater / data.length).toFixed(2);

        let basicData = {
            block: data[1]['区块'],
            allDay,
            allOil,
            allWater,
            oilM,
            waterM,
            waterCut: data[data.length - 2]['含水']
        };
        if (basicData) {
            res.render('oil', {title: 'well', basicData})
        } else {
            basicData = {};
            res.render('oil', {title: 'well', basicData})
        }


    });

});


module.exports = route;