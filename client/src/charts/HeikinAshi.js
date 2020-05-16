import "@grapecity/wijmo.styles/wijmo.css";
//import "bootstrap.css";
//import "./app.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//
import * as wjCore from "@grapecity/wijmo";
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjcChart from "@grapecity/wijmo.chart";
import * as wjChartInteraction from "@grapecity/wijmo.react.chart.interaction";
import * as wjInput from "@grapecity/wijmo.react.input";
import * as wjFinance from "@grapecity/wijmo.react.chart.finance";
import { getData, getSymbols } from "./data";

console.log("hihiii",getData("box"));
class HeikinAshi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            symbols: getSymbols(),
            selectedSymbol: 'box',
            palette: this.getRandomPalette()
        };
    }
    render() {
        return <div className="container-fluid">
            
            <label>Symbol</label>
            <wjInput.ComboBox itemsSource={this.state.symbols} displayMemberPath="name" selectedValuePath="symbol" selectedValue={this.state.selectedSymbol} selectedIndexChanged={this.selectedSymbolChanged.bind(this)}></wjInput.ComboBox>
            
            <wjFinance.FinancialChart itemsSource={this.state.data} bindingX="date" chartType="HeikinAshi" tooltipContent="tooltip" palette={this.state.palette} initialized={this.initializeChart.bind(this)}>
                <wjFinance.FinancialChartSeries binding="high,low,open,close" name={this.state.selectedSymbol}></wjFinance.FinancialChartSeries>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
            </wjFinance.FinancialChart>
            
            <wjFinance.FinancialChart itemsSource={this.state.data} bindingX="date" chartType="HeikinAshi" style={{ height: '200px' }} tooltipContent="" rendered={this.selectorChartRendered.bind(this)} initialized={this.initializeSChart.bind(this)}>
                <wjChart.FlexChartAxis wjProperty="axisY" labels={false}></wjChart.FlexChartAxis>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
                <wjFinance.FinancialChartSeries binding="high,low,open,close"></wjFinance.FinancialChartSeries>
                <wjChartInteraction.FlexChartRangeSelector seamless={true} rangeChanged={this.rangeChanged.bind(this)}></wjChartInteraction.FlexChartRangeSelector>
            </wjFinance.FinancialChart>
        </div>;
    }
    componentDidMount() {
        this.setDataSource();
    }
    initializeChart(flex) {
        this.theChart = flex;
    }
    initializeSChart(flex) {
        this.selectorChart = flex;
    }
    selectedSymbolChanged(e) {
        this.setState({
            selectedSymbol: e.selectedValue
        });
        this.setDataSource();
    }
    selectorChartRendered() {
        let rs = this.selector, rsChart = this.selectorChart;
        // set range
        if (rs) {
            var range = this.findRange(rsChart.axisX.actualMin, rsChart.axisX.actualMax);
            rs.min = range.min;
            rs.max = range.max;
        }
    }
    tooltip(ht) {
        var date = ht.item && ht.item.date ? ht.item.date : null, content = '';
        if (wjCore.isDate(date)) {
            date = wjCore.Globalize.formatDate(date, 'MM/dd/yy');
        }
        if (ht && ht.item) {
            content =
                '<b>' + ht.name + '</b><br/>' +
                    'Date: ' + date + '<br/>' +
                    'Open: ' + wjCore.Globalize.format(ht.item.open, 'n2') + '<br/>' +
                    'High: ' + wjCore.Globalize.format(ht.item.high, 'n2') + '<br/>' +
                    'Low: ' + wjCore.Globalize.format(ht.item.low, 'n2') + '<br/>' +
                    'Close: ' + wjCore.Globalize.format(ht.item.close, 'n2') + '<br/>' +
                    'Volume: ' + wjCore.Globalize.format(ht.item.volume, 'n0');
        }
        return content;
    }
    rangeChanged(selector) {
        if (!this.selector) {
            this.selector = selector;
        }
        // find visible y-range
        let rs = selector, theChart = this.theChart;
        let yRange = this.findYRange(this.state.data, rs.min, rs.max);
        // update main chart's x & y range
        theChart.axisX.min = rs.min;
        theChart.axisX.max = rs.max;
        theChart.axisY.min = yRange.min;
        theChart.axisY.max = yRange.max;
        theChart.invalidate();
    }
    setDataSource() {
        var symbol = this.state.selectedSymbol;
        this.setState({
            data: getData(symbol)
        });
    }
    getRandomPalette() {
        let palettes = Object.getOwnPropertyNames(wjcChart.Palettes)
            .filter(prop => typeof wjcChart.Palettes[prop] === "object" && prop !== 'prototype');
        let rand = Math.floor(Math.random() * palettes.length);
        //
        return wjcChart.Palettes[palettes[rand]];
    }
    //
    // helper method to calculate (upper) percentage of total range
    // the default will show the top 20% of the available range
    findRange(min, max, percent) {
        var pctToShow = wjCore.isNumber(percent) && 0 < percent && percent < 1 ? percent : 0.2, range = {
            min: NaN,
            max: NaN
        };
        if (wjCore.isDate(min) && wjCore.isDate(max)) {
            range.max = max.valueOf();
            range.min = (max.valueOf() - min.valueOf()) * (1 - pctToShow) + min.valueOf();
        }
        else if (wjCore.isNumber(min) && wjCore.isNumber(max)) {
            range.max = max;
            range.min = (max - min) * (1 - pctToShow) + min;
        }
        return range;
    }
    // assumes High, Low, Open, Close, and Volume data
    // also assumes category axis
    findYRange(data, xmin, xmax) {
        var item, i, ymin = null, ymax = null;
        for (i = 0; i < data.length; i++) {
            item = data[i];
            if (xmin > i || i > xmax) {
                continue;
            }
            if (ymax === null || item.high > ymax) {
                ymax = item.high;
            }
            if (ymin === null || item.low < ymin) {
                ymin = item.low;
            }
        }
        return {
            min: ymin,
            max: ymax
        };
    }
}

export default HeikinAshi;