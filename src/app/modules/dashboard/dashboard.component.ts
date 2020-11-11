import {Component, OnInit} from '@angular/core';
import {StatisticsService} from './service/Statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../tabel.scss']
})
export class DashboardComponent implements OnInit {
  statistics: any;
  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.statisticsService.getAllStatistics().subscribe(data => {
      this.statistics = data.body;
    });
  }

}
