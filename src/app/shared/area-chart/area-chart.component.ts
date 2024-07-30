import { Component, Input, OnChanges, SimpleChanges, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnChanges, OnInit {

  @Input() investmentData: number[] = [];
  @Input() contributionsData: number[] = [];
  @Input() labels: string[] = [];
  
  public chartOptions!: EChartsOption | null;
  private chartInstance: any;
  @ViewChild('chart', { static: true }) chartElement!: ElementRef;

  private wasDarkMode: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['investmentData'] || changes['contributionsData'] || changes['labels']) {
      this.setChartOptions(this.wasDarkMode);
      this.updateChart();
    }
  }

  ngOnInit(): void {
    this.themeService.isDarkMode$.subscribe(isDarkMode => {
      this.wasDarkMode = isDarkMode;
      this.setChartOptions(isDarkMode);
      this.initChart(isDarkMode);
    });
  }

  setChartOptions(isDarkMode: boolean = false): void {
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
        data: [$localize`Investment Growth`, $localize`Annual Contributions`],
        textStyle: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          }
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
          data: this.labels,
          axisLabel: {
            color: isDarkMode ? '#ffffff' : '#000000'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            color: isDarkMode ? '#ffffff' : '#000000'
          }
        }
      ],
      series: [
        {
          name: $localize`Investment Growth`,
          type: 'line',
          smooth: true,
          stack: 'Total',
          data: this.investmentData,
          areaStyle: {
            color: 'rgba(144, 238, 144, 0.5)'
          },
          itemStyle: {
            color: 'rgba(34, 139, 34, 1)'
          },
          lineStyle: {
            color: 'rgba(34, 139, 34, 1)'
          }
        },
        {
          name: $localize`Annual Contributions`,
          type: 'line',
          smooth: true,
          data: this.contributionsData,
          areaStyle: {
            color: 'rgba(173, 216, 230, 1)'
          },
          itemStyle: {
            color: 'rgba(70, 130, 180, 1)'
          },
          lineStyle: {
            color: 'rgba(70, 130, 180, 1)'
          }
        }
      ]
    };
  }

  initChart(isDarkMode: boolean = false): void {
    this.chartInstance = echarts.init(this.chartElement.nativeElement, isDarkMode ? 'chart-dark' : null);
    this.updateChart();
  }

  updateChart(): void {
    if (this.chartInstance) {
      this.chartInstance.setOption(this.chartOptions);
    }
  }
}
