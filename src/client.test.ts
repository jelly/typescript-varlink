import { expect, test } from "vitest";
import { Client } from "./client";

test("construct client", () => {
	const address = "unix:/run/systemd/io.systemd.Hostname";
	const client = new Client(address);
	expect(client.address).toBe(address);

  expect(() => new Client('tcp:127.0.0.1:2345')).toThrowError('tcp address not supported');
});

test("introspect io.systemd.Hostname", async () => {
	const address = "unix:/run/systemd/io.systemd.Hostname";
	const client = new Client(address);
  await client.open("io.systemd.Hostname");
});
