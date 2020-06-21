import { Component, ViewChild, ElementRef } from '@angular/core';
import { ThreeService } from '../services/three.service';

@Component({
  selector: 'page-search',
  templateUrl: 'search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  public constructor(private engServ: ThreeService) { }

  public ngOnInit(): void {
    this.engServ.createScene(this.rendererCanvas);
    this.engServ.animate();
  }
}
