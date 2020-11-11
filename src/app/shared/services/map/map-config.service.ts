import { Injectable } from '@angular/core';
declare const google: any;

@Injectable({
  providedIn: 'root'
})

export class MapConfigService {
  drawingPaths: any;
  constructor() { }
  initDrawingManager(map: any) {
    const options = {
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON]
      },
      streetViewControl: false,
      mapTypeControl: false,
      polygonOptions: {
        editable: true,
        draggable: true,
        fillColor: '#0099FF',
        fillOpacity: 0.7,
        strokeColor: '#AA2143',
        strokeWeight: 4,
      }
    };


    const drawingManager = new google.maps.drawing.DrawingManager(options);
    let shapes = [];

    drawingManager.setMap(map);


    // add a listener for the drawing mode change event, delete any existing polygons
    google.maps.event.addListener(drawingManager, "drawingmode_changed", function () {
      if (drawingManager.getDrawingMode() != null) {
        for (let i = 0; i < shapes.length; i++) {
          shapes[i].setMap(null);
        }
        shapes = [];
      }
    });

    google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        this.drawingPaths = event;
        this.getDrawnCoordinates(this.drawingPaths);
      }
    });
  }


  getDrawnCoordinates(event) {
    if (event) {
      const vertices = event.overlay.getPaths().getArray()[0];
      const paths = [];
      vertices.getArray().forEach(function (xy, i) {
        const latLng = [
          xy.lng(),
          xy.lat()
        ];
        paths.push(latLng);
      });
      return paths;
    }
    return [];
  }

  getFinalCoordinates() {
    let currentCoordinates = this.getDrawnCoordinates(this.drawingPaths);
    if (currentCoordinates.length >= 3) {
      currentCoordinates = [...currentCoordinates, currentCoordinates[0]];
    } else {
      currentCoordinates = [];
    }
    return currentCoordinates;
  }


  getExistCoordinates(data) {
    let paths = [];
    paths = data.location.coordinates[0].map(x => {
      return {
        lat: x[1],
        lng: x[0]
      };
    });
    return paths;
  }

}
