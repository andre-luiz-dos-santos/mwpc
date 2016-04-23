declare namespace SocketIO {
	interface Socket {
		on(event: string, listener: Function): Socket;
		on(event: 'type', listener: (text: string, callback: () => void) => void): Socket;
	}
}
