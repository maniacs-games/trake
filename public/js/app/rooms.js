/**
 * Created by manland on 24/03/15.
 */

import {connect as io} from 'socket.io-client';

export class Rooms {
    constructor(htmlContainer) {
        let socket = io();
        socket.on('connect', () => {
            socket.on('rooms', (rooms) => {
                htmlContainer.innerHTML = '';
                rooms.forEach((room) => {
                    let li = document.createElement('li');
                    let linkRoom = document.createElement('a');
                    linkRoom.setAttribute('href', '/game.html#' + room.name);

                    let roomName = document.createElement('span');
                    roomName.setAttribute('class', 'room-name');
                    roomName.innerText = room.name;

                    let roomPlayerNb = document.createElement('span');
                    roomPlayerNb.setAttribute('class', 'room-playerNb');
                    roomPlayerNb.innerText = room.nbPlayersInGame;

                    let roomPlayerTotal = document.createElement('span');
                    roomPlayerTotal.setAttribute('class', 'room-playerTotal');
                    roomPlayerTotal.innerText = room.nbPlayers;

                    linkRoom.appendChild(roomName);
                    roomPlayerNb.appendChild(roomPlayerTotal);
                    linkRoom.appendChild(roomPlayerNb);
                    li.appendChild(linkRoom);
                    htmlContainer.appendChild(li);
                });
            });
            socket.emit('getRooms');
        });
    }
}