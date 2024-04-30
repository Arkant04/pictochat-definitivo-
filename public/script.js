const socket = io();
const form = document.getElementById('formulario');
const input = document.getElementById('inputTexto');
const messages = document.getElementById('mensajes');

let isDragging = false;
const elemento = $('section')
  $( function() {
    $( "section" ).draggable({
      start: function() {
        isDragging = true;
      },
      drag: function() {
        console.log("arrastrando")

      },
      stop: function() {
        console.log("me has soltado")
        isDragging = false;
      }
    });
  } );

function toggleChat(){
  const lista = document.querySelector("ul")
  const form = document.querySelector("form")
  lista.hidden = !lista.hidden;
  if(form.style.display === "none"){
    form.style.display = "flex";
  } else {
    form.style.display = "none"
  }
}
 
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
    if(mouseIsPressed && !isDragging) {
        const datos = {
            x: mouseX,
            y: mouseY
        }
        //socket.emit("paint", datos)
      fill(0);
      //ellipse(mouseX, mouseY, 20)
      line(mouseX, mouseY, pmouseX, pmouseY)
    }
}


form.addEventListener('submit', (e) => {
e.preventDefault();
if (input.value) {
socket.emit('chat message', input.value);
input.value = '';
}
});

//Evento inicio chat
socket.on('init chat', (mensajes)=> {
  console.log(mensajes)
  mensajes.forEach(mensajesOBJ => {
    const li = document.createElement("li")
    li.innerHTML = mensajesOBJ.mensaje
    if(mensajesOBJ.mensaje.startWith('https://'))
      console.log("es un mensaje")
    messages.appendChild(li)
  })
})

socket.on('chat message', (msg) => {
const item = document.createElement('li');
item.textContent = msg;
messages.appendChild(item);
window.scrollTo(0, document.body.scrollHeight);
});

socket.on('paint', (datos) => {
ellipse(datos.x, datos.y, 20)
});

