import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, } from '@angular/core'
import {} from '@types/googlemaps'

type LatLng = { lat: number, lng: number }

@Component({
  moduleId: module.id,
  selector: 'sd-user-map',
  templateUrl: 'user-map.component.html',
  styleUrls: [ 'user-map.component.css' ],
})
export class UserMapComponent implements OnInit {
  @Input() title: string
  @Input() lat: number = 0
  @Input() lng: number = 0

  @Output() coords: EventEmitter<LatLng> = new EventEmitter

  constructor (private _ref: ElementRef, private _cd: ChangeDetectorRef) {
  }

  ngOnInit () {
    this._cd.detach()

    const mapConfig = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 4,
    }

    const map = new google.maps.Map(this._ref.nativeElement, mapConfig)

    const marker = new google.maps.Marker({
      position: mapConfig.center,
      map: map,
      draggable: true,
      title: this.title,
    })

    google.maps.event.addListener(marker, 'drag', () => {
      const latlng = marker.getPosition()

      this.coords.emit({ lat: latlng.lat(), lng: latlng.lng() })
    })
  }
}
