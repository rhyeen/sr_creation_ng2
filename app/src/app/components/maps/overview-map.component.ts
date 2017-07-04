import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MapService} from '../../services/map.service';

@Component({
  selector: 'sr-overview-map',
  templateUrl: './overview-map.html',
  styleUrls: ['./overview-map.css']
})
export class OverviewMapComponent implements OnInit {
  private map;
  private map_error;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mapService: MapService
  ) {

  }

  ngOnInit() {
    this.refreshMap();
  }

  /**
   * Will be unset once map is retrieved since the returned obejct doesn't have an 'is_loading' property.
   */
  setLoading() {
    if (!this.map || !('is_loading' in this.map)) {
      this.map = {};
      this.map['is_loading'] = true;
    }
  }

  refreshMap() {
    this.router.events.subscribe(path => {
      this.setLoading();
    });
    this.setLoading();
    this.route.params
      .switchMap((params: Params) => this.mapService.getMap(params['id']))
      .subscribe(
        map => this.setMap(map),
        error => this.map_error = <any>error);
  }

  setMap(map) {
    this.map = map;
  }
}