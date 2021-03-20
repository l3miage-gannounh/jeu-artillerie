import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { COORDINATE, Game, Planet, Player, Ship } from '../definitions';
import { PlaymapService } from '../playmap.service';

@Component({
  selector: 'app-playmap',
  templateUrl: './playmap.component.html',
  styleUrls: ['./playmap.component.scss']
})
export class PlaymapComponent implements OnInit {
  readonly trajectoriesObs: Observable<string[]>;
  readonly gameObs: Observable<Game>;

  constructor(private GS: PlaymapService) {
    this.gameObs         = this.GS.gameObs;
    this.trajectoriesObs = this.GS.trajectoriesObs.pipe(
      map( LLC => LLC.map( LC => LC.map(c => c.join()).join(' ') ) )
    );
  }

  ngOnInit(): void {
  }

  changeP(M:SVGMatrix, planet:Planet,cercle:Element){
    this.GS.updatePlanet(planet,{"p":[planet.p[0] + M.e, M.f + planet.p[1]]});
    cercle.setAttribute("transform","");
  }
  changeS(player:Player,M:SVGMatrix, base:Ship,joueur:Element){
    this.GS.updateShip(player, base,{"p":[M.e +base.p[0], M.f+base.p[1]]});
  }
  startG():void{
    this.GS.start();
  }
  stopG():void{
    this.GS.stop();
  }
  loadG():void{
    this.GS.load();
  }
}
