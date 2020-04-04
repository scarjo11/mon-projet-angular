import {Subject} from "rxjs/Subject";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {error} from "@angular/compiler/src/util";

@Injectable()
export class AppareilService {

  appareilSubject = new Subject<any[]>();

  private appareils = [];

  constructor(private httpClient: HttpClient) {
  }

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number){
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  switchOnAll() {
    for (let appareil of this.appareils){
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (let appareil of this.appareils){
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne(index: number) {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(index: number) {
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;

    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  saveAppareilToServer(){
    this.httpClient //client Http retoune une Observable
      .put('https://http-client-demo-3ac99.firebaseio.com/appareils.json', this.appareils)
      .subscribe( //Pour réagir à la réponse du serveur
        () => {
          console.log('Enregistrement terminé !');
        },
        () => {
          console.log('Erreur de sauvegarde' + error);
        }
      )
  }

  getAppareilsFromServer() {
    this.httpClient
      .get<any[]>('https://http-client-demo-3ac99.firebaseio.com/appareils.json')
      .subscribe( //Pour réagir à la réponse du serveur
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        () => {
          console.log('Erreur de chargement' + error);
        }
      )
  }
}
