import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrl: './area-chart.component.css'
})
export class AreaChartComponent implements OnChanges {

  @Input() investmentData: number[] = [];
  @Input() contributionsData: number[] = [];
  @Input() labels: string[] = [];

  public chartOptions!: EChartsOption | null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['investmentData'] || changes['contributionsData'] || changes['labels']) {
      this.setChartOptions();
    }
  }

  setChartOptions(): void {

    this.chartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Investment Growth', 'Annual Contributions']
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          }
          //saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.labels
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Investment Growth',
          type: 'line',
          smooth: true,
          stack: 'Total',
          data: this.investmentData,
          areaStyle: {
            color: 'rgba(144, 238, 144, 0.5)' // Light green area
          },
          itemStyle: {
            color: 'rgba(34, 139, 34, 1)' // Dark green line
          },
          lineStyle: {
            color: 'rgba(34, 139, 34, 1)' // Dark green line
          }
        },
        {
          name: 'Annual Contributions',
          type: 'line',
          smooth: true,
          data: this.contributionsData,
          areaStyle: {
            color: 'rgba(173, 216, 230, 1)' // Light blue area
          },
          itemStyle: {
            color: 'rgba(70, 130, 180, 1)' // Dark blue line
          },
          lineStyle: {
            color: 'rgba(70, 130, 180, 1)' // Dark blue line
          }
        }
      ]
    };
  }
}
