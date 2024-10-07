import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnswerDto, CommsDto } from '../Dtos/Dtos';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommunicationsService {
  constructor(
    private httpClient: HttpClient,
    private storage: LocalStorageService
  ) { }

  commsUrl = "http://localhost:8080/communiations"

  commsManager(request: CommsDto){
    if ( this.storage.get("key") != null){
      request.key = this.storage.get("key")!;
    }
    return this.httpClient.post<AnswerDto>(this.commsUrl, request);
  }
}
