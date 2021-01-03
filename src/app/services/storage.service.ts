import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	url = '144.2.66.231';
	constructor(private storage: Storage) {
		this.getURLPromise().then(val => this.url = val);
	 }

	public setURL(url: string) {
		if (url === null || url === undefined || url ==='') {
			this.storage.remove('url');
			this.url = '144.2.66.231';
		}else {
			this.storage.set('url', url);
			this.url = url;
		}

	}

	private async getURLPromise(): Promise<string>{
		let url = await this.storage.get('url').then(val => {return val});
		if (url === null) {
			url = '192.168.0.28';
		}
		return url;
	}

	public getURL(): string{
		return this.url;
	}

	public getServicePath() {
		const start = 'http://'
		const port = '8085';
		const path = '/budget/'
		return start + this.url + ':' + port + path;
	}
}
