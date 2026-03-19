import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({ providedIn: 'root' })
export class CanvasLayerService {
  private map!: L.Map;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private data: any[] = [];

  init(map: L.Map) {
    this.map = map;

    this.canvas = L.DomUtil.create('canvas', 'leaflet-canvas-layer') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;

    const overlayPane = this.map.getPanes().overlayPane;
    overlayPane.appendChild(this.canvas);

    this.resizeCanvas();

    // Re-render on map move
    this.map.on('move zoom resize', () => {
      this.resizeCanvas();
      this.render();
    });
  }

  setData(data: any[]) {
    this.data = data;
  }

  private resizeCanvas() {
    const size = this.map.getSize();

    this.canvas.width = size.x;
    this.canvas.height = size.y;

    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
  }

  render() {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const item of this.data) {
      const point = this.map.latLngToContainerPoint([item.lat, item.lng]);

      this.drawMarker(point.x, point.y, item);
    }
  }

  private drawMarker(x: number, y: number, item: any) {
    const size = 6;

    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, Math.PI * 2);

    // Simple styling
    this.ctx.fillStyle = this.getColor(item.type);
    this.ctx.fill();
  }

  private getColor(type: string): string {
    switch (type) {
      case 'vessel': return 'blue';
      default: return 'red';
    }
  }
}
