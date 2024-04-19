// adding new chats documents    
// setting up a real time listener to get new chats
// updating the username
// updating the room

class chatroom{
    constructor(username ,room){
        this.username = username
        this.room = room
        this.chats = dp.collection('chats')
        this.unsub
    }
    async addchat(message){
        const now = new Date()
        const chat = {
            message,
            username:this.username,
            room:this.room,
            createdAt:firebase.firestore.Timestamp.fromDate(now)
        };
        const response = await this.chats.add(chat)
        return response;
    }
    getchats(callback){
      this.unsub = this.chats
        .where('room','==',this.room)
        .orderBy('createdAt')
        .onSnapshot(snapshot=>{
            snapshot.docChanges().forEach(change =>{
                if(change.type ==='added'){
                    callback(change.doc.data())
                }
            })
        })
    }
    updateName(username){
        this.username = username
        localStorage.setItem('username', username);
    }
    updateRoom(room){
        this.room =room
        console.log('room ubdatesd')
        if(this.unsub){
            this.unsub()
        }
    }
}
