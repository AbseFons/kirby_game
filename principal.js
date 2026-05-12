var juego = new Phaser.Game(800, 450, Phaser.CANVAS, 'bloque_juego');
var fondoJuego;
var batamon; 
var teclaArriba;
var teclaAbajo;
var teclaDerecha;
var teclaIzquierda;
var musicaFondo; // Variable para el sonido

var estadoPrincipal = {
    preload: function(){
        juego.load.image('fondo', 'img/fondo_kirby.png');
        juego.load.spritesheet('batamon', 'img/kirby.png', 18, 17); 
        
        // 1. Cargamos el sonido de fondo
        juego.load.audio('sonido_fondo', 'media/fondo_sound.mp3');
    },
    
    create: function(){
        // Iniciamos el sistema de físicas de Phaser (necesario para la gravedad y el salto)
        juego.physics.startSystem(Phaser.Physics.ARCADE);

        fondoJuego = juego.add.tileSprite(0, 0, 800, 450, 'fondo');
        fondoJuego.tileScale.setTo(800/1920, 450/1080);
        
        // 2. Agregamos el sonido y lo reproducimos en bucle
        // musicaFondo = juego.add.audio('sonido_fondo');
        // musicaFondo.loopFull(0.5); // El 0.5 es el volumen (50%). Puedes ajustarlo a 1.

        batamon = juego.add.sprite(100, 335, 'batamon'); 
        batamon.scale.setTo(3, 3);
        // Centramos el ancla para que al voltear el sprite (si decides hacerlo después) no se descuadre
        batamon.anchor.setTo(0.5, 0.5); 
        
        // Habilitamos las físicas para nuestro personaje
        juego.physics.arcade.enable(batamon);
        batamon.body.gravity.y = 800; // Gravedad que tira del personaje hacia abajo
        batamon.body.collideWorldBounds = true; // Evita que caiga fuera del canvas
        
        batamon.animations.add('caminar', [0, 1, 2, 3], 10, true);

        teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        teclaIzquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        teclaArriba = juego.input.keyboard.addKey(Phaser.Keyboard.UP);
        teclaAbajo = juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    },
    
    update: function(){
        fondoJuego.tilePosition.x -= 3; 
        
        // Reiniciamos la velocidad horizontal en cada frame para que se detenga al soltar la tecla
        batamon.body.velocity.x = 0; 
        
        var velocidadHorizontal = 250; 
        
        // 3. Lógica de movimiento horizontal y Animación
        if(teclaDerecha.isDown){
            batamon.body.velocity.x = velocidadHorizontal;
            batamon.animations.play('caminar');
            batamon.scale.x = 3; // Mira a la derecha
        } else if(teclaIzquierda.isDown){
            batamon.body.velocity.x = -velocidadHorizontal;
            batamon.animations.play('caminar');
            batamon.scale.x = -3; // Invierte el sprite para mirar a la izquierda
        } else {
            // Si no se presiona ni izquierda ni derecha: detenerse y mostrar el frame 2
            batamon.animations.stop();
            batamon.frame = 2;
        }

        // 4. Lógica del salto (Arriba)
        // Solo salta si la tecla está presionada Y está tocando el suelo (evita saltos infinitos en el aire)
        if(teclaArriba.isDown && batamon.body.onFloor()){
            batamon.body.velocity.y = -400; // Fuerza del salto (negativo es hacia arriba)
        } 
        
        // 5. Lógica de agacharse (Abajo)
        if(teclaAbajo.isDown){
            // Por ahora vacío. Aquí irá la lógica para cambiar el hitbox o el frame al agacharse.
        }
    }
}

juego.state.add('principal', estadoPrincipal);
juego.state.start('principal');