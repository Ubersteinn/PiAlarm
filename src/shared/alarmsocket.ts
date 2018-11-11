export class AlarmSocket {

    public ws: WebSocket;
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public async send(command: string): Promise<string> {
        return new Promise<string>(async resolve => {
            let resolved = false;
            const socket = await this.connect(this.url);
            socket.onmessage = message => {
                console.log(message.data);
                this.close();
                if (!resolved) {
                    resolved = true;
                    resolve(message.data);
                }
            };
            socket.send(command);
            setTimeout(() => {
                this.close();
                if (!resolved) {
                    console.error('AlarmSocket: timed out');
                    resolved = true;
                    resolve(null);
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
