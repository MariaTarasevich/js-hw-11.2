class User {
    constructor({id, name, email, address, phone}){
        this.data = {id, name, email, address, phone};
    }

    edit({id, name, email, address, phone}){
        this.data = {id, name, email, address, phone};
    }

    get(){
        return  this.data;
    }
}

class Contacts {
    constructor(){
        this.contactsData = [];
    }

    add({name, email, address, phone}){
        const user = new User({
            id: Date.now(), 
            name, 
            email, 
            address, 
            phone
        })

        this.contactsData.push(user);
    }

    remove(idContact){
      //  this.contactsData = this.contactsData.filter((contact) => contact.data.id != idContact)
        this.contactsData = this.contactsData.filter(({data:{id}}) => id != idContact)
    }

    edit(idContact, newContactData){
        const userFound = this.contactsData.find(({data:{id}}) => id == idContact)
        if(!userFound) return;
        userFound.edit(newContactData);
    }

    get(){
        return this.contactsData;
    }
}




class ContactsApp extends Contacts {
    constructor(){
        super();
        this.inputName;
        this.inputPhone;
        this.inputEmail;
        this.inputAddress;
        this.addButton;
        this.app;
        this.createHTML();
        this.addEvent();
    }

    createHTML(){
        const contactOption = document.createElement('div')
        contactOption.classList.add('.contacts__option')

        this.app = document.createElement('div');
        this.inputName = document.createElement('input');
        this.inputPhone = document.createElement('input');
        this.inputEmail = document.createElement('input');
        this.inputAddress = document.createElement('input');
        this.addButton = document.createElement('button');

        this.inputName.classList.add('contact__name')
        this.inputName.setAttribute('name', 'contactName')
        this.inputPhone.classList.add('contact__phone')
        this.inputEmail.classList.add('contact__email')
        this.inputAddress.classList.add('contact__address')
        this.addButton.classList.add('contact__button__add')

        this.addButton.innerHTML = "Добавить контакт"

        contactOption.appendChild(this.inputName)
        contactOption.appendChild(this.inputPhone)
        contactOption.appendChild(this.inputEmail)
        contactOption.appendChild(this.inputAddress)
        contactOption.appendChild(this.addButton)

        this.app.appendChild(contactOption)

        this.app.classList.add('contacts');
        document.body.appendChild(this.app);
    }

    addEvent(){

        this.addButton.addEventListener('click',()=>{
            this.onAdd({
                name: this.inputName.value,
                email: this.inputEmail.value,
                address: this.inputAddress.value,
                phone: this.inputPhone.value
            })

            this.inputName.value = '';
            this.inputEmail.value = '';
            this.inputAddress.value = '';
            this.inputPhone.value = '';
        })
    }

    onAdd(addObj){
        this.add(addObj);
        this.onShow()
    }

    onShow(){
        const data = this.get();
        let ul = document.querySelector('.contacts__items')
        if(!ul){
            ul = document.createElement('ul');
            ul.classList.add('contacts__items')
        }

        let list = '';

        if(!data) return;
        data.forEach(({data:{name, address, id, phone, email}}) => {
            list += `<li class="contact__item">
                            <p>${name}</p>
                            <p>${phone}</p>
                            <p>${address}</p>
                            <p>${email}</p>
                            <button class="contact__item__delete" id="${id}">Удалить</button>
                            <button class="contact__item__edit" id="${id+'edit'}">Редактировать</button>
                        </li>`;
        })
        ul.innerHTML = list;
        this.app.appendChild(ul);
        this.onAddEventRemoveEdit();
    }

    onAddEventRemoveEdit(){
        const deleteBtn = document.querySelectorAll('.contact__item__delete')

        deleteBtn.forEach((delBtn) => {
            delBtn.addEventListener('click', (event) => {
                this.onDelete(event.target.id)
            })
        })
    }

    onDelete(id){
        this.remove(id);
        this.onShow();
    }

    get(){
        return super.get();
    }

    edit(){
        const editBtn = document.querySelectorAll('.contact__item__edit')

        editBtn.forEach((edBtn) => {
            edBtn.addEventListener('click', (e) => {
                this.onAddEventRemoveEdit(e.target.id)
            })
        })
    }

    onEdit(id){
        this.addEvent(id)
        this.onShow()
    }


}

window.addEventListener('load', () =>{
    const contacts = new ContactsApp()
    console.log(contacts)
})