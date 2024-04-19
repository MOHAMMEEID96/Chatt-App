const chatlist = document.querySelector('.chat-list')
const newchat = document.querySelector('.new-chat')
const newname = document.querySelector('.new-name')
const updatemessage = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms')

newchat.addEventListener('submit',e=>{
    e.preventDefault();
    const message = newchat.message.value.trim()
    CHATROOM.addchat(message)
    .then(()=>{newchat.reset()})
    .catch(err=>console.log(err))
})
newname.addEventListener('submit',e=>{
    e.preventDefault()
    //update name
    const newusername = newname.name.value.trim()
    CHATROOM.updateName(newname);
    //reset the form
    newname.reset()
    //show then hide the update message
    updatemessage.innerText = `your name was updated to ${String(newusername)}` 
    setTimeout(()=>updatemessage.innerText='',3000)
});

// updat rooms
rooms.addEventListener('click',e=>{
    e.preventDefault()
    if (e.target.tagName === 'BUTTON'){
        chatui.clear()
        CHATROOM.updateRoom(e.target.getAttribute('id'))
        CHATROOM.getchats(chat=>chatui.render(chat))
    }
})

const chatui = new chatUi(chatlist) 

const CHATROOM = new chatroom('mohammed','gaming')
CHATROOM.getchats(data=> chatui.render(data))