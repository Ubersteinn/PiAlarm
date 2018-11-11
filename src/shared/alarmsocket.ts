export class AlarmSocket {

    public ws: WebSocket;
    private url = 'ws://192.168.50.101:4200';

    constructor() {}

    public async send(): Promise<void> {
        return new Promise<void>(async resolve => {
            let resolved = false;
            const socket = await this.connect(this.url);
            socket.onmessage = message => {
                console.log(message.data);
                this.close();
                if (!resolved) {
                    resolved = true;
                    resolve();
                }
            };
            socket.send('Toggle the alarm!');
            setTimeout(() => {
                this.close();
                if (!resolved) {
                    console.error('AlarmSocket: timed out');
                    resolved = true;
                    resolve();
                }
            }, 1000);
        });
    }

    private async connect(url: string): Promise<WebSocket> {
        if (!this.ws) {
            this.ws = await this.create(url);
        }
        return this.ws;
    }

    private close() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    private create(url: string): Promise<WebSocket> {
        return new Promise<WebSocket>(resolve => {
            this.ws = new WebSocket(url, 'echo-protocol');
            this.ws.onopen = ev => {
                resolve(this.ws);
            };
        });
    }
}
