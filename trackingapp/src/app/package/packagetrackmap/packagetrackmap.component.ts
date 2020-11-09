import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-packagetrackmap',
  templateUrl: './packagetrackmap.component.html',
  styleUrls: ['./packagetrackmap.component.scss'],
})
export class PackagetrackmapComponent implements OnInit {
  @Input() package;

  constructor() {}

  ngOnInit(): void {
    const map = new mapboxgl.Map({
      container: 'map',
      accessToken: environment.mapKey,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.package.longitude, this.package.latitude],
      zoom: 12
    });

    const marker = new mapboxgl.Marker({
      color: '#009FC2',
    })
      .setLngLat([this.package.longitude, this.package.latitude])
      .addTo(map);
  }
}
