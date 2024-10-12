import { Injectable } from '@angular/core';
import forge from 'node-forge';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /** Key for AES algorithm */
  private AESkey: string = forge.random.getBytesSync(32);
  /** Initial vector for AES algorithm */
  private AESiv:  string = forge.random.getBytesSync(32);

  /** Subject to fire upon storing anything in local storage. */
  private storeSubject: Subject<string> = new Subject<string>();

  /** Initialize AESKey and AESiv */
  constructor() {
    this.generateKeyAndIV();
  }

  /** Set AESKey and AESiv */
  private generateKeyAndIV(): void {
    this.AESkey = forge.random.getBytesSync(32);
    this.AESiv  = forge.random.getBytesSync(32);
  }

  /** 
   * Save data to local storage using a key and encrypted value.
   *  
   * @param {string} key
   * @param {string} value
   * @returns {void}
   */
  public saveData(key: string, value: string): void {
    localStorage.setItem(key, this.encrypt(value));
    this.storeSubject.next(key);
  }

  /** 
   * Save data to local storage using a key and unencrypted value.
   * 
   * @param {string} key
   * @param {string} value
   * @returns {void}
   */
  public saveDataBasic(key: string, value: string): void {
    localStorage.setItem(key, value);
    this.storeSubject.next(key);
  }

  /** 
   * Get value in local storage associated with a given key.
   * 
   * @param {string} key
   * @returns {string}
   */
  public getData(key: string): string {
    let data = localStorage.getItem(key)|| "";
    return this.decrypt(data);
  }

  /**
   * Remove data from storage associated with a given key.
   * 
   * @param {string} key
   * @returns {void}
   */
  public removeData(key: string): void {
    localStorage.removeItem(key);
    this.storeSubject.next(key);
  }

  /** Delete all data in local storage except login status. */
  public clearData(): void {
    var key: string = "";
    for (var i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i) || "";
      if (key != "login") {
        localStorage.removeItem(key);
      }
    }
  }

  /** 
   * Encrypt given string using AES Block Cipher.
   * 
   * @param {string} txt Text to encrypt
   * @returns {string} Encrypted info
   */
  private encrypt(txt: string): string {
    var cipher = forge.cipher.createCipher('AES-CBC', this.AESkey);

    cipher.start({iv: this.AESiv});
    cipher.update(forge.util.createBuffer(txt, "utf8"));
    cipher.finish();

    return cipher.output.getBytes();
  }

  /** 
   * Descrypt given text using AES Block Cipher.
   * 
   * @param {string} txtToDecrypt Text to decrypt
   * @returns {string} Decrypted text
   */
  private decrypt(txtToDecrypt: string): string {
    var decipher = forge.cipher.createDecipher("AES-CBC", this.AESkey);

    decipher.start({iv: this.AESiv});
    decipher.update(forge.util.createBuffer(txtToDecrypt));
    decipher.finish();

    return forge.util.encodeUtf8(decipher.output.getBytes());
  }

  /** Returns the local storage event observable. */
  public onStore(): Observable<string> {
    return this.storeSubject.asObservable();
  }
}
