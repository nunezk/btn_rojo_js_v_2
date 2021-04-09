//firestore
const db =firebase.firestore();

//---- login check
const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedinLinks = document.querySelectorAll('.logged-in')

const loginCheck = user => {
    if (user) {
        loggedinLinks.forEach(link => link.style.display = 'block');
        loggedOutLinks.forEach(link => link.style.display = 'none');
    } else {
        loggedinLinks.forEach(link => link.style.display = 'none');
        loggedOutLinks.forEach(link => link.style.display = 'block');
    }
}

//-----registro
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

//--- vatr ---


//-----ingreso
const ingresoForm = document.querySelector('#login-form');
var myModalIn = new bootstrap.Modal(document.getElementById('ingresoModal'), focus)

ingresoForm.addEventListener('submit', e => {
    e.preventDefault();
    const correo = document.querySelector('#login-email').value;
    const contraseña = document.querySelector('#login-password').value;
    
    auth 
    .signInWithEmailAndPassword(correo, contraseña)
    .then(userCredential => {
        
        getDoc(correo);
        //limpiar fomrulario
        ingresoForm.reset();
        //cerrar modal 
        myModalIn.hide()
        //$('#ingresoModal').modal('hide')
        
        //console.log('ingreso correcto ' + cUser)
    })
    

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

//---- function saveTask ----
const saveTask = (email, id_usuario, nombre, telefono) =>
db.collection('users').doc(email).set({
    email,
    id_usuario,
    nombre,
    telefono
    //tipo_usuario
});

//---- function get doc ----
const getDoc = (email) =>
db.collection('users').doc(email).get()
    .then(function(doc){
        if(doc.exists){
            taskForm['f-correo'].value = doc.data().email;
            taskForm['f-id'].value = doc.data().id_usuario;
            taskForm['f-nombre'].value = doc.data().nombre;
            taskForm['f-telefono'].value = doc.data().telefono;
           // console.log('usario ingreso' + taskForm['f-correo'].value);
        }
        else{
            console.log("no existe docuemnto");
        }
    })
    .catch(function(error){
        console.log('error', error);
    })
    //tipo_usuario


// leer datos

/*
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
*/
//opcion dos




//----data form ok si sirve pero cambiar de listener a boton.
/*
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = taskForm['f-correo'];
    const id_usuario = taskForm['f-id'];
    const nombre = taskForm['f-nombre'];
    const telefono = taskForm['f-telefono'];
    //const tipo_usuario = "";   

    await saveTask(email.value, id_usuario.value, nombre.value, telefono.value,);

    //taskForm.reset();
    email.focus();
});
*/
//purebva de el de arriba si quedo
const saveCampo = document.querySelector('#btn-task-form')
saveCampo.addEventListener('click', async e => {
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
    





//----  hide div ----
/* se asigna en auth
function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
*/

//---- buscar ayuda ----
function buscarAyuda(){


}



//---- auth state changes ----//

var msjAuth = document.getElementById("msj");
auth.onAuthStateChanged(user => {
    if (user) {
        //show div
        var x = document.getElementById("myDIV");
            x.style.display = "block";
            loginCheck(user);
        //    console.log('auth: Usuario activo');
            //msj auth
            msjAuth.innerHTML = "<p></p>";

 //           db.collection('users').doc(email).get()
 //   .then(function(doc){
 //       if(doc.exists){
 //           getDoc();

    } else {
        console.log('auth: no hay sesion activa')
        //hide Div
        var x = document.getElementById("myDIV");
            x.style.display = "none";
            loginCheck(user)
           // console.log('auth;: ingresa para solicitar ayuda');
            
           // msj auth 
           msjAuth.innerHTML = "<p>Ingresa a la aplicación</p>";

    }
})