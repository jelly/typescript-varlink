import * as net from "node:net";
import { once } from "node:events";

export class Client {
	address: string;
  client: net.Socket;

  /**
   * @param {string} address - unix socket (unix:/run/foo) or tcp (tcp:127.0.0.1:23450)
   */
	constructor(address: string) {
		this.address = address;
    if (address.startsWith('unix:'))
        this.client = net.createConnection({ path: this.address.replace(/^unix:/, '') });
    else if (address.startsWith('tcp:'))
        throw new Error('tcp address not supported');
    else
        throw new Error(`address ${address} unsupported`);
	}

  async open(interface_name: string) {
      await once(this.client, 'connect');
      this.client.write(`${JSON.stringify({method: "org.varlink.service.GetInterfaceDescription", parameters: { interface: interface_name } })}\0`);

      const [data] = await once(this.client, 'data');
      console.log(data.toString());
  }
}
