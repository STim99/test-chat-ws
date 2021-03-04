import WebSocket from 'ws'

const port = 8080
const wss = new WebSocket.Server({ port }, () => console.log(`Server started on port ${port}`))

wss.on('connection', (ws) => {
    ws.on('message', (data) => {        
        console.log(data)

        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data)
            }
        })
    })
})