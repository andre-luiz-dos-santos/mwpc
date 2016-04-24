declare namespace SocketIO {
	interface Socket {
		on(event: 'type', listener: (text: string, callback: () => void) => void): Socket;
	}
}
