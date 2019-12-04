import Vue from 'vue'
import message from './message.vue'
let MessageCont = Vue.extend(message)

let indexID= 1

const Message= (content ) =>{
    let  id = 'message_'+indexID++
    
    const MessageInstance=new MessageCont({
        data:{
            data:content
        }
    })

    MessageInstance.id=id
    MessageInstance.vm=MessageInstance.$mount()
    MessageInstance.isShow=true
    MessageInstance.dom=MessageInstance.vm.$el
    document.body.appendChild(MessageInstance.dom)
    MessageInstance.dom.style.zIndex=id+10086
    // console.log('组件的实例',MessageInstance)
    return MessageInstance.vm
}


export default {
    install :Vue=>{
        Vue.prototype.$MyMessage=Message
    }
}