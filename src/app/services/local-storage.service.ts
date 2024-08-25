import { Injectable } from '@angular/core';
import forge from 'node-forge';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private AESkey: string = forge.random.getBytesSync(32);
  private AESiv:  string = forge.random.getBytesSync(32);

  private storeSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.generateKeyAndIV();
  }

  private generateKeyAndIV(): void {
    this.AESkey = forge.random.getBytesSync(32);
    this.AESiv  = forge.random.getBytesSync(32);
  }

  public saveData(key: string, value: string): void {
    localStorage.setItem(key, this.encrypt(value));
    this.storeSubject.next(key);
  }

  public saveDataBasic(key: string, value: string): void {
    localStorage.setItem(key, value);
    this.storeSubject.next(key);
  }

  public getData(key: string): string {
    let data = localStorage.getItem(key)|| "";
    return this.decrypt(data);
  }
  public removeData(key: string): void {
    localStorage.removeItem(key);
    this.storeSubject.next(key);
  }

  public clearData(): void {
    var key: string = "";
    for (var i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i) || "";
      if (key != "login") {
        localStorage.removeItem(key);
      }
    }
  }

  private encrypt(txt: string): string {
    var cipher = forge.cipher.createCipher('AES-CBC', this.AESkey);

    cipher.start({iv: this.AESiv});
    cipher.update(forge.util.createBuffer(txt, "utf8"));
    cipher.finish();

    return cipher.output.getBytes();
  }

  private decrypt(txtToDecrypt: string): string {
    var decipher = forge.cipher.createDecipher("AES-CBC", this.AESkey);

    decipher.start({iv: this.AESiv});
    decipher.update(forge.util.createBuffer(txtToDecrypt));
    decipher.finish();

    return forge.util.encodeUtf8(decipher.output.getBytes());
  }

  public onStore(): Observable<string> {
    return this.storeSubject.asObservable();
  }
}
