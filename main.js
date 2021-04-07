//firestore
const db =firebase.firestore();

//registro
const registroForm = document.querySelector('#registro-form');

var myModalRe = new bootstrap.Modal(document.getElementById('registroModal'), focus)

registroForm.addEventListener('submit', (e) =>  {
e.preventDefault();

const correo = document.querySelector('#signup-email').value;
const contraseña = document.querySelector('#signup-password').value;

//validar value
//console.log(correo, contraseña)
auth 
    .createUserWithEmailAndPassword(correo, contraseña)
    .then(userCredential => {
        //limpiar fomrulario
        registroForm.reset();

        //cerrar modal
        myModalRe.hide()

        console.log('sign up')
    })

});

//ingreso
const ingresoForm = document.querySelector('#login-form');
var myModalIn = new bootstrap.Modal(document.getElementById('ingresoModal'), focus)

ingresoForm.addEventListener('submit', e => {
    e.preventDefault();
    const correo = document.querySelector('#login-email').value;
    const contraseña = document.querySelector('#login-password').value;
    
    auth 
    .signInWithEmailAndPassword(correo, contraseña)
    .then(userCredential => {
        const cUser = correo
        
        //limpiar fomrulario
        ingresoForm.reset();
        //cerrar modal 
        myModalIn.hide()
        //$('#ingresoModal').modal('hide')
        
        console.log('ingreso correcto ' + cUser)
    })
    console.log('error al auntificar usuario');

});

//log out
const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
e.preventDefault();
auth.signOut().then(() => {
    console.log('signout')
})

})





const taskForm = document.getElementById('task-form');

//function
const saveTask = (email, id_usuario, nombre, telefono) =>
db.collection('users').doc(email).set({
    email,
    id_usuario,
    nombre,
    telefono
    //tipo_usuario
});

// leer datos

const getTask = () => db.collection('users').get();

window.addEventListener('DOMContentLoaded', async (e) => {
   
    db.collection("users").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            
            const task = doc.data();
            task.id = doc.id
           // console.log('tarea lisener; ' + task);

            //console.log(`${doc.id} => ${doc.data()}`);
            taskForm.innerHTML += `<div>
            ${doc.data().email}
            </div>`
            
        });
    });
    
    

})

//opcion dos



//data form
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = taskForm['f-correo'];
    const id_usuario = taskForm['f-id'];
    const nombre = taskForm['f-nombre'];
    const telefono = taskForm['f-telefono'];
    //const tipo_usuario = "";   

    await saveTask(email.value, id_usuario.value, nombre.value, telefono.value,);

    taskForm.reset();
    email.focus();
});

//event
//list for auth state changes
auth.onAuthStateChanged(user => {
    if (user) {
       fs.collection('users')
            .get()
            .then((snapshot) => {
               console.log('snap auth '+ snapshot.docs)
              
              // const task = doc.data();
               //task.id = doc.id
               //console.log('tarea lisener; ' + task);
                
              //  console.log(firebase.auth().currentUser);
            }) 
        
        //console.log('Auth curr us ' + cUser);
        //console.log('auth curr usr' + firebase.auth().currentUser)
       // console.log('auth in '+ cUser)
            //console.log('auth cu ' + cUser)
    } else {
        
        console.log('auth: no hay sesion activa')
        
    }
})